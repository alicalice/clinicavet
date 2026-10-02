"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditButtonTutor } from "../interface/EditButton";
import { api } from "../resources/api";
import Button from "../ui/button";
import Modal from "../ui/modal";

export default function TutorEdit({
    id,
    nome,
    cpf,
    telefone,
    clinicaId,
}: EditButtonTutor) {
    const router = useRouter();

    const [clinicas, setClinicas] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState({
        nome,
        cpf,
        telefone,
        clinicaId,
    });

    useEffect(() => {
        if (isOpen) {
            fetch(`${api}/clinicas`)
                .then((res) => res.json())
                .then((dados) => setClinicas(dados))
                .catch((err) =>
                    console.error("Erro ao buscar clínicas:", err)
                );
        }
    }, [isOpen]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const fieldName = e.currentTarget.name;
        const fieldValue = e.currentTarget.value;

        setData((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const attTutor = {
            nome: data.nome,
            cpf: data.cpf,
            telefone: data.telefone,
            clinica: data.clinicaId
                ? { id: Number(data.clinicaId) }
                : null,
        };

        try {
            const res = await fetch(`${api}/tutores/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(attTutor),
            });

            if (res.ok) {
                router.refresh();
                alert("Tutor editado com sucesso!");
                setIsOpen(false);
            } else {
                alert("Erro ao editar tutor.");
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <div>
            <div className="my-4">
                <Button
                    variant="secondary"
                    onClick={() => setIsOpen(true)}
                >
                    Editar Tutor
                </Button>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Editar tutor"
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nome do Tutor
                        </label>

                        <input
                            type="text"
                            name="nome"
                            value={data.nome}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: Julia Amorim"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            CPF do Tutor
                        </label>

                        <input
                            type="text"
                            name="cpf"
                            value={data.cpf}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: 999.999.999-67"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Telefone do Tutor
                        </label>

                        <input
                            type="text"
                            name="telefone"
                            value={data.telefone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: (87) 9 9999-9999"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Clínica
                        </label>

                        <select
                            name="clinicaId"
                            value={data.clinicaId ?? ""}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                        >
                            <option value="" disabled>
                                Selecione uma clínica...
                            </option>

                            {clinicas.map((clinica: any) => (
                                <option
                                    key={clinica.id}
                                    value={clinica.id}
                                >
                                    {clinica.nome} - {clinica.endereco}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Salvar
                    </Button>
                </form>
            </Modal>
        </div>
    );
}