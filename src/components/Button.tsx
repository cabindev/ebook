import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "~/libs";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: "normal" | "outline";
    children: ReactNode;
}

export default function Button({
    children,
    className,
    variants = "normal",
    ...rest
}: ButtonProps) {
    const variantsObj = {
        normal: "bg-black text-white",
        outline: "border bg-transparent text-black",
    };

    return (
        <button
            className={cn(
                "rounded-md px-4 py-2 font-medium",
                variantsObj[variants],
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
