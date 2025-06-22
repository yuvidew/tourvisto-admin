"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import Spinner from "@/components/Spinner"
import Image from "next/image"
import { selectWithSearchFieldType } from "@/types/type"

/**
 * SelectWithSearchField component allows users to select an option from a searchable dropdown list.
 *
 * @param {string} label - Label used in messages like "No {label} found".
 * @param {string} placeholder - Placeholder text for the input field.
 * @param {string} selectValue - Currently selected value.
 * @param {(val: string) => void} onSelectValue - Callback function when a value is selected.
 * @param {Array<{ label: string; value: string; img?: string }>} frameworks - List of options to choose from.
 * @param {boolean} loading - Flag to indicate loading state while fetching options.
 */

export const SelectWithSearchField = (
    {
        label,
        placeholder,
        selectValue,
        onSelectValue,
        frameworks,
        loading
    }: selectWithSearchFieldType
) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(selectValue)
    const [search, setSearch] = useState("")
    const dropdownRef = useRef<HTMLDivElement>(null)

    const filteredFrameworks = frameworks.filter((framework) =>
        framework.label.toLowerCase().includes(search.toLowerCase())
    )

    const handleOutsideClick = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        if (open) document.addEventListener("mousedown", handleOutsideClick)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [open])

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full border text-[#7F7E83] rounded-[8px] px-3 py-2 flex cursor-pointer justify-between items-center text-[16px] font-normal bg-white dark:bg-zinc-900"
            >
                {value
                    ? (
                        <div className=" flex items-center gap-2 capitalize">
                            {frameworks.find((f) => f.value === value)?.img as string && (
                                <Image
                                    src={frameworks.find((f) => f.value === value)?.img as string}
                                    alt={frameworks.find((f) => f.value === value)?.value as string}
                                    width={200}
                                    height={200}
                                    className="size-5 border rounded-full object-cover"
                                />
                            )}
                            {frameworks.find((f) => f.value === value)?.value}
                        </div>
                    )
                    : placeholder}
                <ChevronDown className="h-4 w-4 opacity-50" />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-900 border rounded-md shadow-md p-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2  -translate-y-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-8 border-b border-gray-300 p-2 mb-2 text-sm outline-none bg-transparent"
                        />
                    </div>

                    <div className="max-h-48 overflow-y-auto text-sm">
                        {loading &&( 
                            <div className=" flex items-center justify-center py-3">
                            <Spinner color="white" />
                            </div>
                        )}
                        {filteredFrameworks.length === 0 ? (
                            <div className="text-center py-2 text-muted-foreground">
                                No {label} found.
                            </div>
                        ) : (
                            filteredFrameworks.map((framework) => (
                                <div
                                    key={framework.value}
                                    onClick={() => {
                                        setValue(framework.value === value ? "" : framework.value)
                                        onSelectValue(framework.value === value ? "" : framework.value)
                                        setOpen(false)
                                        setSearch("")
                                    }}
                                    className="cursor-pointer px-2 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded flex justify-between items-center"
                                >
                                    {framework.label}
                                    {framework.value === value && (
                                        <Check className="h-4 w-4 opacity-100" />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
