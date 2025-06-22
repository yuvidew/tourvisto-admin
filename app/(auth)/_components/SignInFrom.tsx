"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/Label"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/app/(auth)/hooks/useAuth"
import { baseUrl } from "@/lib/utils"
import Spinner from "@/components/Spinner"


export const SignInForm = () => {
    const [isHide, setIsHide] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const { loading, onSignIn } = useAuth();
    const [form, setForm] = useState({
        username : "", 
        email: "",
        password: "",
        role: 1
    })

    

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-2 text-left">
                <h1 className="text-2xl font-bold">Welcome 👋</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to Login In tourvisto
                </p>
            </div>
            <div className="grid gap-6">
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
                        {isHide ? <EyeOff onClick={() => setIsHide(false)} className=" size-5 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2" /> :
                            <Eye onClick={() => setIsHide(true)} className=" size-5 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2" />
                        }
                    </div>
                </div>
                <Button 
                    disabled = {!form.email.trim() && !form.password.trim()} 
                    className="w-full"
                    onClick={() => onSignIn(form, baseUrl.signIn_api)}
                    
                >
                    {loading ? <Spinner size="sm" color="white" /> : "Login "}
                </Button>
                {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full">
                    <Image
                        src={"/assets/icons/google.png"}
                        alt='google'
                        width={200}
                        height={200}
                        className='size-3.5 mt-0.5 object-contain'
                    />
                    Login with Google
                </Button> */}
            </div>
            <div className="text-left text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
