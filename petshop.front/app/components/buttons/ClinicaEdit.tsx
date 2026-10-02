"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditButtonClin } from "../interface/EditButton";
import { api } from "../resources/api";
import Button from "../ui/button";
import Modal from "../ui/modal";

export default function ClinicaEdit({
    id,
    nome,
    telefone,
    endereco,
}: EditButtonClin) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState({
        nome,
        telefone,
        endereco,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
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

        try {
            const res = await fetch(`${api}/clinicas/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.refresh();
                alert("Clínica editada com sucesso!");
                setIsOpen(false);
            } else {
                alert("Erro ao editar clínica.");
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <div>
            <div>
                <Button
                    variant="secondary"
                    onClick={() => setIsOpen(true)}
                >
                    Editar Clínica
                </Button>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Editar clínica"
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nome da Clínica
                        </label>

                        <input
                            type="text"
                            name="nome"
                            value={data.nome}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Clínica Au Que Mia"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Telefone da Clínica
                        </label>

                        <input
                            type="text"
                            name="telefone"
                            value={data.telefone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: (87) 9 7878-6676"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Endereço da Clínica
                        </label>

                        <input
                            type="text"
                            name="endereco"
                            value={data.endereco}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: Rua dos Anjos, 67"
                        />
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