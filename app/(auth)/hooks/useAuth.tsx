import { AuthFromType, SignInResponse, SignUpResponse } from "@/types/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom React hook for handling user authentication logic, including sign-in and sign-up.
 *
 * @returns {{
 *   onSignUp: (form: AuthFromType, url: string) => Promise<void>; // Handles user registration
 *   onSignIn: (form: AuthFromType, url: string) => Promise<void>; // Handles user login
 *   loading: boolean;                                             // Indicates if a request is in progress
 * }}
 */

export const useAuth = (): {
    onSignUp: (form: AuthFromType, url: string) => Promise<void>;
    onSignIn: (form: AuthFromType, url: string) => Promise<void>;
    loading : boolean
} => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    /**
     * Handles user registration by posting signup form data to the given URL.
     *
     * @param {AuthFromType} form - The sign-up form data (e.g. name, email, password).
     * @param {string} url - The API endpoint URL for registration.
     */

    const onSignUp = async (form: AuthFromType, url: string) => {
        setLoading(true);
        try {
            const response = await axios.post<SignUpResponse>(url, form);

            if (response.status === 200) {
                toast.success(response.data.message);
                router.push("/sign-in");
            } else {
                toast.error(response.data.message);
                return;
            }
        } catch (error) {
            console.error("❌ Error during edited user :", error);
            toast.error("An error occurred during sign up");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles user login by posting sign-in form data to the given URL.
     *
     * @param {AuthFromType} form - The sign-in form data (email and password).
     * @param {string} url - The API endpoint URL for login.
     */

    const onSignIn = async (form: AuthFromType, url: string) => {
        setLoading(true);
        try {
            const response = await axios.post<SignInResponse>(url, form);

            if (response.status !== 200) {
                toast.error(response.data.message);
                return;
            }
            toast.success(response.data.message);
            console.log(response.data.user);

            localStorage.setItem("tourvisto-token", response.data.token);
            localStorage.setItem(
                "tourvisto-admin-users",
                JSON.stringify(response.data.user)
            );

            router.push("/");
        } catch (error) {
            console.error("❌ Error during edited user :", error);
            toast.error("An error occurred during sign up");
        } finally {
            setLoading(false);
        }
    };
    return { onSignIn, onSignUp, loading };
};
