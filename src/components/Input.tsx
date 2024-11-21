import { cn } from "~/libs";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...rest }: InputProps) {
    return (
        <input
            className={cn(
                "w-full rounded-md border px-4 py-2 outline-none",
                className,
            )}
            {...rest}
        />
    );
}
