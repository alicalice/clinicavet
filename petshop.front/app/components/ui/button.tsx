import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md";
}

export default function Button({
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    const baseStyles =
        "rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
    };

    const variantStyles = {
        primary:
            "bg-primary text-foreground hover:bg-primary-hover",

        secondary:
            "border border-border bg-transparent text-foreground hover:bg-primary",

        danger:
            "bg-danger text-danger-text hover:bg-danger-hover",

        ghost:
            "bg-transparent text-muted hover:bg-primary",
};

    return (
        <button
            type={type}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
            {...props}
        />
    );
}