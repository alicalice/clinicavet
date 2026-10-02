import ClinicaForm from "./components/forms/ClinicaForm";
import ClinicaEdit from "./components/buttons/ClinicaEdit";
import ClinicaDelete from "./components/buttons/ClinicaDelete";
import Link from "next/link";
import { api } from "./components/resources/api";

export default async function Home() {
    const res = await fetch(`${api}/clinicas`, {
        cache: "no-store",
    });

    const clinicas = await res.json();

    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Clínicas cadastradas
                        </h1>

                        <p className="mt-1 text-muted">
                            Gerencie as clínicas cadastradas no sistema.
                        </p>
                    </div>

                    <ClinicaForm />
                </div>

                <div className="grid gap-4">
                    {clinicas.map((clinica: any) => (
                        <div
                            key={clinica.id}
                            className="rounded-xl border border-border bg-surface p-6 shadow-sm"
                        >
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold">
                                    {clinica.nome}
                                </h2>

                                <div className="mt-3 space-y-1 text-sm text-muted">
                                    <p>
                                        <strong className="text-foreground">
                                            ID:
                                        </strong>{" "}
                                        {clinica.id}
                                    </p>

                                    <p>
                                        <strong className="text-foreground">
                                            Telefone:
                                        </strong>{" "}
                                        {clinica.telefone}
                                    </p>

                                    <p>
                                        <strong className="text-foreground">
                                            Endereço:
                                        </strong>{" "}
                                        {clinica.endereco}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    href={`/clinicas/${clinica.id}`}
                                    className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary"
                                >
                                    Ver tutores
                                </Link>

                                <ClinicaEdit
                                    id={clinica.id}
                                    nome={clinica.nome}
                                    telefone={clinica.telefone}
                                    endereco={clinica.endereco}
                                />

                                <ClinicaDelete id={clinica.id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}