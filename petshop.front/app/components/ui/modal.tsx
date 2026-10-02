"use client";

import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            return;
        }

        if (shouldRender) {
            setIsClosing(true);

            const timeout = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [isOpen, shouldRender]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
                isClosing
                    ? "modal-backdrop-out"
                    : "modal-backdrop-in"
            }`}
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className={`w-full max-w-md rounded-xl bg-surface p-6 shadow-lg ${
                    isClosing
                        ? "modal-panel-out"
                        : "modal-panel-in"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2
                        id="modal-title"
                        className="text-xl font-semibold text-foreground"
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar modal"
                        className="text-muted transition-colors hover:text-foreground"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}