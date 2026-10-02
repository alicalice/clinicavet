import { api } from "@/app/components/resources/api";

export default async function ClinicaDetalhesPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const resClinica = await fetch(`${api}/clinicas/${id}`, {
        cache: "no-store",
    });

    const clinica = await resClinica.json();

    const resTutores = await fetch(`${api}/tutores/clinica/${id}`, {
        cache: "no-store",
    });

    const tutores = await resTutores.json();

    const resPacientes = await fetch(`${api}/pacientes`, {
        cache: "no-store",
    });

    const pacientes = await resPacientes.json();

    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground">
            <div className="mx-auto max-w-5xl">
                {/* Informações da clínica */}
                <section className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h1 className="text-3xl font-bold">
                        {clinica.nome}
                    </h1>

                    <div className="mt-3 space-y-1 text-sm text-muted">
                        <p>
                            <strong className="text-foreground">
                                Endereço:
                            </strong>{" "}
                            {clinica.endereco}
                        </p>

                        <p>
                            <strong className="text-foreground">
                                Telefone:
                            </strong>{" "}
                            {clinica.telefone}
                        </p>
                    </div>
                </section>

                {/* Tutores da clínica */}
                <section>
                    <div className="mb-5">
                        <h2 className="text-2xl font-semibold">
                            Tutores vinculados
                        </h2>

                        <p className="mt-1 text-muted">
                            Tutores cadastrados nesta clínica.
                        </p>
                    </div>

                    {tutores.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card p-6 text-muted">
                            Nenhum tutor cadastrado nesta clínica.
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {tutores.map((tutor: any) => {
                                const petsDoTutor = pacientes.filter(
                                    (pet: any) => pet.tutorId === tutor.id
                                );

                                return (
                                    <div
                                        key={tutor.id}
                                        className="rounded-xl border border-border bg-card p-6 shadow-sm"
                                    >
                                        <h3 className="text-xl font-semibold">
                                            {tutor.nome}
                                        </h3>

                                        <div className="mt-3 space-y-1 text-sm text-muted">
                                            <p>
                                                <strong className="text-foreground">
                                                    CPF:
                                                </strong>{" "}
                                                {tutor.cpf}
                                            </p>

                                            <p>
                                                <strong className="text-foreground">
                                                    Telefone:
                                                </strong>{" "}
                                                {tutor.telefone}
                                            </p>
                                        </div>

                                        {/* Pets do tutor */}
                                        <div className="mt-5 border-t border-border pt-4">
                                            <h4 className="font-medium text-foreground">
                                                Pets
                                            </h4>

                                            {petsDoTutor.length === 0 ? (
                                                <p className="mt-1 text-sm text-muted">
                                                    Nenhum pet vinculado.
                                                </p>
                                            ) : (
                                                <div className="mt-2 space-y-2">
                                                    {petsDoTutor.map(
                                                        (pet: any) => (
                                                            <div
                                                                key={pet.id}
                                                                className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
                                                            >
                                                                <p className="font-medium text-foreground">
                                                                    {pet.nome}
                                                                </p>

                                                                <p className="text-muted">
                                                                    {pet.especie}{" "}
                                                                    •{" "}
                                                                    {pet.raca}{" "}
                                                                    •{" "}
                                                                    {pet.idade}{" "}
                                                                    anos
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}