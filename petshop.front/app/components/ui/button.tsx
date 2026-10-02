import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
}

export default function Button({
    variant = "primary",
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    const baseStyles =
        "rounded-md px-4 py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

    const variantStyles = {
        primary:
            "bg-primary text-foreground hover:bg-primary-hover",

        secondary:
            "border border-border bg-surface text-foreground hover:bg-primary",

        danger:
            "bg-danger text-danger-text hover:bg-danger-hover",

        ghost:
            "bg-transparent text-muted hover:bg-primary",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        />
    );
}