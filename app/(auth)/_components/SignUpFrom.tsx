"use client"
import { baseUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/Label"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/app/(auth)/hooks/useAuth"
import Spinner from "@/components/Spinner"


export const SignUpForm = () => {
    const [isHide, setIsHide] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const { loading, onSignUp } = useAuth();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    })


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-2 text-left">
                <h1 className="text-2xl font-bold">Create new account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to Create new account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="username"
                        value={form.username}
                        onChange={(e) => setForm((prev) => ({
                            ...prev,
                            username: e.target.value
                        }))}
                        required
                    />

                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={form.email}
                        onChange={(e) => {
                            const emailValue = e.target.value;

                            setForm((prev) => ({
                                ...prev,
                                email: emailValue,
                            }));

                            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
                            setIsValid(isValidEmail || emailValue.length === 0);
                        }}
                        required
                    />

                    {!isValid && <p className=" text-red-500 text-sm ">Please enter a valid email address. example xyz@gmail.com</p>}
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <div className=" relative">
                        <Input
                            id="password"
                            type={isHide ? "password" : "text"}
                            value={form.password}
                            onChange={(e) => setForm((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))}
                            
                            required
                        />
                        {isHide ? <EyeOff onClick={() => setIsHide(false)} className=" size-4 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2" /> :
                            <Eye onClick={() => setIsHide(true)} className=" size-4 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2" />
                        }
                    </div>
                </div>
                <Button
                    disabled={!form.email.trim() && !form.password.trim()}
                    className="w-full"
                    onClick={() => onSignUp(form, baseUrl.signUp_api)}
                >
                    {loading ? <Spinner size="sm" color="white" /> : "Sign up"}
                </Button>
            </div>
            <div className="text-left text-sm">
                Already have an account {" "}
                {/* Don&apos;t have an account?{" "} */}
                <Link href="/sign-in" className="underline underline-offset-4">
                    Sign in
                </Link>
            </div>
        </div>
    )
}
