"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditButtonPet } from "../interface/EditButton";
import { api } from "../resources/api";
import Button from "../ui/button";
import Modal from "../ui/modal";

export default function PetEdit({
    id,
    nome,
    especie,
    raca,
    idade,
    tutorId,
}: EditButtonPet) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [tutores, setTutores] = useState([]);

    const [data, setData] = useState({
        nome,
        especie,
        raca,
        idade,
        tutorId,
    });

    useEffect(() => {
        if (isOpen) {
            setData({
                nome,
                especie,
                raca,
                idade,
                tutorId,
            });

            fetch(`${api}/tutores`)
                .then((res) => res.json())
                .then((dados) => setTutores(dados))
                .catch((err) =>
                    console.error("Erro ao buscar tutores:", err)
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

        const attCliente = {
            nome: data.nome,
            especie: data.especie,
            raca: data.raca,
            idade: Number(data.idade),
            tutor: data.tutorId
                ? { id: Number(data.tutorId) }
                : null,
        };

        try {
            const res = await fetch(`${api}/pacientes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(attCliente),
            });

            if (res.ok) {
                router.refresh();
                alert("Paciente editado com sucesso!");
                setIsOpen(false);
            } else {
                alert("Erro ao editar paciente.");
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
                    Editar Paciente
                </Button>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Editar paciente"
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nome
                        </label>

                        <input
                            type="text"
                            name="nome"
                            value={data.nome}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: Pudim"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Espécie
                        </label>

                        <input
                            type="text"
                            name="especie"
                            value={data.especie}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: Coelho"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Raça
                        </label>

                        <input
                            type="text"
                            name="raca"
                            value={data.raca}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: Albino"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Idade
                        </label>

                        <input
                            type="number"
                            name="idade"
                            value={data.idade}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: 15"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Tutor
                        </label>

                        <select
                            name="tutorId"
                            value={data.tutorId ?? ""}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                        >
                            <option value="" disabled>
                                Selecione um tutor...
                            </option>

                            {tutores.map((tutor: any) => (
                                <option
                                    key={tutor.id}
                                    value={tutor.id}
                                >
                                    {tutor.nome} - {tutor.cpf}
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