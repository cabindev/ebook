import Button from "./Button";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "~/libs";

interface SubmitProps {
    children: ReactNode;
    className?: string;
}

export default function Submit({ children, className }: SubmitProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            className={cn("w-full disabled:cursor-progress", className)}
        >
            {children}
        </Button>
    );
}
