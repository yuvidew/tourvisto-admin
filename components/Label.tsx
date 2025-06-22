import { cn } from "@/lib/utils";
import React from "react";

/**
 * Label component for form elements.
 * 
 * It wraps the native `<label>` element and applies Tailwind utility classes for styling,
 * including handling of disabled states via `peer-disabled` and `group-data-[disabled]`.
 *
 * @param {React.LabelHTMLAttributes<HTMLLabelElement>} props - Props passed to the label element.
 * @param {string} [props.className] - Optional class name for custom styling.
 *
 * @returns {JSX.Element} A styled label component.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <input id="email" type="email" className="peer" />
 * ```
 */

export const Label = ({
    className,
    ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
        <label
            className={cn(
                "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
};
