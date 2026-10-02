import ClienteDelete from "../components/buttons/ClienteDelete";
import PetEdit from "../components/buttons/ClienteEdit";
import PetForm from "../components/forms/ClienteForm";
import { api } from "../components/resources/api";

export default async function Clientes() {
    const res = await fetch(`${api}/pacientes`, {
        cache: "no-store",
    });

    const data = await res.json();

    const clientes = Array.isArray(data)
        ? data
        : (data.content || []);

    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Pacientes cadastrados
                        </h1>

                        <p className="mt-1 text-muted">
                            Gerencie os pacientes cadastrados no sistema.
                        </p>
                    </div>

                    <PetForm />
                </div>

                <div className="grid gap-4">
                    {clientes.map((cliente: any) => (
                        <div
                            key={cliente.id}
                            className="rounded-xl border border-border bg-card p-6 shadow-sm"
                        >
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold">
                                    {cliente.nome}
                                </h2>

                                <div className="mt-3 space-y-1 text-sm text-muted">
                                    <p>
                                        <strong className="text-foreground">
                                            ID:
                                        </strong>{" "}
                                        {cliente.id}
                                    </p>

                                    <p>
                                        <strong className="text-foreground">
                                            Espécie:
                                        </strong>{" "}
                                        {cliente.especie}
                                    </p>

                                    <p>
                                        <strong className="text-foreground">
                                            Raça:
                                        </strong>{" "}
                                        {cliente.raca}
                                    </p>

                                    <p>
                                        <strong className="text-foreground">
                                            Idade:
                                        </strong>{" "}
                                        {cliente.idade}
                                    </p>

                                    <p>
                                        <strong className="text-foreground">
                                            Tutor:
                                        </strong>{" "}
                                        {cliente.tutor?.nome ||
                                            "Sem tutor vinculado."}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <PetEdit
                                    id={cliente.id}
                                    nome={cliente.nome}
                                    especie={cliente.especie}
                                    raca={cliente.raca}
                                    idade={cliente.idade}
                                    tutorId={cliente.tutor?.id}
                                />

                                <ClienteDelete id={cliente.id} />
                            </div>
                        </div>
                    ))}

                    {clientes.length === 0 && (
                        <div className="rounded-xl border border-border bg-card p-6 text-muted">
                            Nenhum paciente cadastrado ainda.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}