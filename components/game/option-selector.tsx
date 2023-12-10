"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type OptionSelectorProps = {
    placeholder: string,
    options: string[],
    defaultValue: string,
    onValueChange: (value: string) => void
}

export function OptionSelector({ placeholder, options, defaultValue, onValueChange }: OptionSelectorProps) {
    return (
        <Select onValueChange={onValueChange} defaultValue={defaultValue}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                    {options.map(option => (
                        <div key={option}>
                            <SelectItem value={option}>{option}</SelectItem>
                        </div>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
