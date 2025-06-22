"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { LogOut, CircleUserRound } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const navLinks = [
    {
        icon: "/assets/icons/home.svg",
        iconWhite: "/assets/icons/home-white.svg",
        text: "Dashboard",
        url: "/",
    },
    {
        icon: "/assets/icons/users.svg",
        iconWhite: "/assets/icons/users-white.svg",
        text: "all users",
        url: "/users",
    },
    {
        icon: "/assets/icons/itinerary.svg",
        iconWhite: "/assets/icons/itinerary-white.svg",
        text: "AI Trips",
        url: "/trips",
        nestedUrls: ["/trips/create-trip", "/trips/[id]"],
    },
];

export const SideBar = () => {
    const path = usePathname();
    const router = useRouter();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);


    useEffect(() => {
        setMounted(true);

        const token = localStorage.getItem("tourvisto-token");
        if (!token) {
            router.replace("/sign-in");
            return;
        }

        const storedUser = localStorage.getItem("tourvisto-admin-users");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        }
    }, []);

    const onLogout = () => {
        localStorage.removeItem("tourvisto-admin-users");
        localStorage.removeItem("tourvisto-token");
        router.replace("/sign-in");
    };

    if (!mounted) return null;

    const isActive = (url: string, nestedUrls?: string[]): boolean => {
        if (url === path) return true;

        if (nestedUrls) {
            return nestedUrls.some((nested) => {
                if (nested === "/trips/[id]") {
                    return /^\/trips\/[^/]+$/.test(path);
                }
                return path === nested;
            });
        }

        return false;
    };

    return (
        <div className="w-[240px] h-screen py-[20px] flex flex-col justify-between gap-[8px] px-[15px]">
            <div className="flex flex-col gap-[8px]">
                {/* Logo */}
                <div className="flex items-center gap-[6px] py-6">
                    <Image
                        src={"/assets/icons/logo.svg"}
                        alt="logo"
                        width={2000}
                        height={2000}
                        className="size-7"
                    />
                    <h1 className="text-[24px] font-bold text-[#1F1F36] dark:text-white">
                        Tourvisto
                    </h1>
                </div>

                <div className="border-[0.5px] border-t m-auto w-[90%] border-[#ECF2EF]" />

                {/* Nav links */}
                <div className="flex flex-col gap-[16px] mt-3">
                    {navLinks.map(({ icon, iconWhite, text, url, nestedUrls }, i) => {
                        const active = isActive(url, nestedUrls);

                        return (
                            <Button
                                key={i}
                                variant={active ? "primary" : "ghost"}
                                className="flex justify-start gap-[14px] h-[40px]"
                                onClick={() => router.replace(url)}
                            >
                                <Image
                                    src={theme === "light" && !active ? icon : iconWhite}
                                    alt={text}
                                    width={300}
                                    height={300}
                                    className="size-4 text-white"
                                />
                                <h2 className="text-[16px] font-semibold capitalize">{text}</h2>
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* User + Theme */}
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <h2 className="font-medium capitalize">{theme}</h2>
                </div>

                {user && (
                    <div className="flex items-center gap-2">
                        <CircleUserRound className="size-8" />
                        <div className="flex flex-col gap-[0.5px] w-full">
                            <h2 className="font-normal text-md">{user.name}</h2>
                            <p className="text-xs truncate w-20">{user.email}</p>
                        </div>
                        <LogOut
                            className="text-red-500 cursor-pointer"
                            onClick={onLogout}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
