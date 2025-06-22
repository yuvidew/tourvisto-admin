"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { PopoverProps } from "@/types/type"
import { ChevronDown } from "lucide-react"

/**
 * `PopoverComp` renders a custom dropdown-like popover that toggles when the trigger is clicked.
 *
 * @param {React.ReactNode} trigger - The element that toggles the popover.
 * @param {React.ReactNode} children - The content inside the popover.
 * @param {string} className - Optional custom className for the popover.
 * @param {"top" | "bottom" | "left" | "right"} position - The position of the popover relative to the trigger.
 *
 * @example
 * ```tsx
 * <PopoverComp
 *   trigger={<span>Select Option</span>}
 *   position="bottom"
 * >
 *   <div>Popover content</div>
 * </PopoverComp>
 * ```
 */

export const PopoverComp =({
    trigger,
    children,
    className,
    position = "bottom",
}: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    // Close popover when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block" ref={popoverRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="focus:outline-none w-full py-[12px] cursor-pointer px-[14px] flex items-center justify-between border-[1px] h-[45px] rounded-[8px] border-[#EBEEED]"
            >
                {trigger}
                <ChevronDown className=" size-5 text-[#7F7E83]" />
            </button>

            {isOpen && (
                <div
                    className={cn(
                        "absolute z-50 w-full rounded-md border bg-white p-4 shadow-md animate-fade-in",
                        position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
                        position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
                        position === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
                        position === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
                        className
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    )
}
