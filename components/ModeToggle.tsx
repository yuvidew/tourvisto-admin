"use client";

import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes';


/**
 * A toggle button to switch between light and dark themes.
 * 
 * This component uses `next-themes` for handling theme changes
 * and shows a sun/moon icon based on the current theme.
 *
 * @example
 * ```tsx
 * <ModeToggle />
 * ```
 *
 * @returns {JSX.Element} A toggle button with animated icons.
 */

export const ModeToggle = () => {
    const { theme, setTheme } = useTheme()
    return (
        <Button variant={"outline"} size={"icon"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    )
}
