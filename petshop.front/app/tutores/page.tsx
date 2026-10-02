import TutorDelete from "../components/buttons/TutorDelete";
import TutorEdit from "../components/buttons/TutorEdit";
import TutorForm from "../components/forms/TutorForm";
import { api } from "../components/resources/api";

export default async function Tutores() {
    const [resTutores, resPacientes] = await Promise.all([
        fetch(`${api}/tutores`, {
            cache: "no-store",
        }),
        fetch(`${api}/pacientes`, {
            cache: "no-store",
        }),
    ]);

    const tutores = await resTutores.json();

    const dataPacientes = await resPacientes.json();

    const pacientes = Array.isArray(dataPacientes)
        ? dataPacientes
        : Array.isArray(dataPacientes.content)
            ? dataPacientes.content
            : [];

    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Tutores cadastrados
                        </h1>

                        <p className="mt-1 text-muted">
                            Gerencie os tutores cadastrados no sistema.
                        </p>
                    </div>

                    <TutorForm />
                </div>

                <div className="grid gap-4">
                    {tutores.map((tutor: any) => {
                        const petsDoTutor = pacientes.filter((pet: any) => {
                            const petTutorId =
                                pet.tutorId ?? pet.tutor?.id;

                            return (
                                Number(petTutorId) ===
                                Number(tutor.id)
                            );
                        });

                        return (
                            <div
                                key={tutor.id}
                                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                            >
                                <div className="mb-5">
                                    <h2 className="text-xl font-semibold">
                                        {tutor.nome}
                                    </h2>

                                    <div className="mt-3 space-y-1 text-sm text-muted">
                                        <p>
                                            <strong className="text-foreground">
                                                ID:
                                            </strong>{" "}
                                            {tutor.id}
                                        </p>

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

                                        <p>
                                            <strong className="text-foreground">
                                                Clínica:
                                            </strong>{" "}
                                            {tutor.clinica?.nome ||
                                                "Sem clínica vinculada."}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-5 border-t border-border pt-4">
                                    <h3 className="font-medium text-foreground">
                                        Pets
                                    </h3>

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

                                <div className="flex flex-wrap items-center gap-3">
                                    <TutorEdit
                                        id={tutor.id}
                                        nome={tutor.nome}
                                        cpf={tutor.cpf}
                                        telefone={tutor.telefone}
                                        clinicaId={tutor.clinica?.id}
                                    />

                                    <TutorDelete id={tutor.id} />
                                </div>
                            </div>
                        );
                    })}

                    {tutores.length === 0 && (
                        <div className="rounded-xl border border-border bg-card p-6 text-muted">
                            Nenhum tutor cadastrado ainda.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}