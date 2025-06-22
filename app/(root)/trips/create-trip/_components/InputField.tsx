import { Label } from '@/components/Label'
import { Input } from '@/components/ui/input'
import { InputFieldProps } from '@/types/type'
import React from 'react'

/**
 * InputField component for rendering a labeled number input field.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {string | number} props.value - Current value of the input field.
 * @param {(value: string) => void} props.onChange - Callback when input value changes.
 *
 * @returns {JSX.Element} A styled number input field with label.
 */

export const InputField = ({
    label,
    placeholder,
    value,
    onChange
} : InputFieldProps) => {
    return (
        <div className=' flex flex-col gap-[8px]'>
            <Label htmlFor={label} className=' text-[#7F7E83] text-[14px] font-normal'>
                {label}
            </Label>
            <Input 
                type='number'
                placeholder={placeholder} 
                value={value} 
                className='rounded-[8px]'
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
