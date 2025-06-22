"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useState, useRef, useEffect, JSX } from "react";
import { Button } from "./ui/button";
import { useDeleteTripApi } from "@/hooks/useDeleteTripApi";
import Spinner from "./Spinner";
import { DropdownProps } from "@/types/type";

/**
 * DropdownOption component renders a dropdown menu with edit and delete options.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - The trigger element for the dropdown (e.g., icon or button)
 * @param {number} props.id - The ID of the trip to edit or delete
 * @returns {JSX.Element} The dropdown option component
 */

export const DropdownOption = ({ children, id }: DropdownProps) : JSX.Element => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { onDeleteTrip, loading } = useDeleteTripApi()


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                }}
                className="inline-flex items-center justify-between bg-transparent cursor-pointer"
            >
                {children}
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md border bg-white shadow-lg">
                    <div className="py-1">
                        <Button
                            variant={"ghost"}
                            className=" w-full flex items-center justify-start gap-[8px]"
                            onClick={(e) => {
                                e.stopPropagation()
                                // onDeleteTrip(id)
                            }}
                        >
                            <>
                                <Edit2 className=" text-neutral-900" />
                                Edit trip
                            </>
                        </Button>
                        <Button
                            variant={"ghost"}
                            className=" w-full flex items-center justify-start gap-[8px]"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDeleteTrip(id)
                            }}
                        >
                            {!loading ?
                                <>
                                    <Trash2 className="text-red-500" />
                                    Delete
                                </> :
                                <>
                                    <Spinner color="primary" size="sm" />
                                </>}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
