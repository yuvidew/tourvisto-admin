"use client"

import { useEffect, useRef, useState } from "react"
import { SearchIcon } from "lucide-react"
import { CommandDialogProps, CommandItemType } from "@/types/type"

/**
 * A keyboard-accessible command palette dialog.
 *
 * Opens with `Ctrl + K` (or `Cmd + K`) and supports searching through a list of commands.
 *
 * @param {CommandDialogProps} props - The props for the CommandDialog component.
 * @param {string} [props.title="Command Palette"] - Title of the dialog.
 * @param {string} [props.description="Search for a command to run..."] - Description shown under the title.
 * @param {CommandItemType[]} props.items - List of commands with labels, optional shortcuts, and callbacks.
 * @param {string} [props.placeholder="Type a command..."] - Placeholder text in the search input.
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button at the bottom.
 *
 * @returns {JSX.Element} The CommandDialog component.
 */

export function CommandDialog({
    title = "Command Palette",
    description = "Search for a command to run...",
    items,
    placeholder = "Type a command...",
    showCloseButton = true,
}: CommandDialogProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [filteredItems, setFilteredItems] = useState<CommandItemType[]>([])
    const dialogRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
            if (e.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    useEffect(() => {
        const match = items.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        )
        setFilteredItems(match)
    }, [search, items])

    const handleOutsideClick = (e: MouseEvent) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        if (open) document.addEventListener("mousedown", handleOutsideClick)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [open])

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div
                        ref={dialogRef}
                        className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-md shadow-lg overflow-hidden"
                    >
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 border-b">
                            <SearchIcon className="size-4 shrink-0 opacity-50" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={placeholder}
                                className="w-full bg-transparent outline-none py-2 text-sm"
                            />
                        </div>

                        <div className="max-h-60 overflow-y-auto py-2">
                            {filteredItems.length === 0 ? (
                                <p className="text-center text-sm text-muted-foreground py-4">No results.</p>
                            ) : (
                                filteredItems.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            item.onSelect?.()
                                            setOpen(false)
                                        }}
                                        className="cursor-pointer px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm flex justify-between"
                                    >
                                        {item.label}
                                        {item.shortcut && (
                                            <span className="text-xs text-muted-foreground">{item.shortcut}</span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {showCloseButton && (
                            <div className="flex justify-end p-2 border-t">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
