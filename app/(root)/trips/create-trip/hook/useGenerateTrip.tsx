import { baseUrl } from "@/lib/utils";
import { formDatatype } from "@/types/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook to handle AI-based trip generation and persistence.
 *
 * @returns {{
 *   onGenerateTrip: (formData: formDatatype) => Promise<void | null>,
 *   loading: boolean,
 *   error: string | null
 * }}
 */


export const useGenerateTrip = () : {
    onGenerateTrip : (formData: formDatatype) => Promise<null | void>,
    loading : boolean , 
    error : string | null
} => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const onGenerateTrip = async (formData: formDatatype) => {
        setLoading(true);
        try {
            const user =
                typeof window !== "undefined"
                    ? JSON.parse(localStorage.getItem("tourvisto-admin-users") || "null")
                    : null;
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("tourvisto-token")
                    : null;

            if (!user || !token) {
                toast.error("User not authenticated");
                setError("Missing user or token");
                return null;
            }

            const response = await axios.post("/api/generate-trip", formData);

            if (response.status !== 200) {
                toast.error("Failed to generate the trip");
                setError("Failed to generate the trip");
                return null;
            }

            const result = response.data.result;

            const image = response.data.images;

            const response1 = await axios.post(baseUrl.create_trip,
                {
                    ...formData,
                    result,
                    images: image.map((img: string) => img).join(","),
                    userId: user.id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response1.status !== 201) {
                toast.error("Failed to save the trip");
                setError("Failed to save the trip");
                return null;
            }


            toast.success("Trip generated successfully!");
            router.replace(`/trips/${response1.data.tripId}`);
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while generating the trip");
            setError("Unexpected error");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { onGenerateTrip, loading, error };
};
