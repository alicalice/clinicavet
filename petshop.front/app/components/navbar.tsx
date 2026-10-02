import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b border-border bg-primary text-foreground shadow-sm">
            <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
                <Link
                    href="/"
                    className="font-semibold transition-colors hover:text-muted"
                >
                    Clínicas
                </Link>

                <Link
                    href="/tutores"
                    className="font-semibold transition-colors hover:text-muted"
                >
                    Tutores
                </Link>

                <Link
                    href="/pacientes"
                    className="font-semibold transition-colors hover:text-muted"
                >
                    Pacientes
                </Link>
            </div>
        </nav>
    );
}