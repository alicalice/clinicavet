"use client";

import { useRouter } from "next/navigation";
import { DeleteButtonProps } from "../interface/DeleteButton";
import { api } from "../resources/api";
import Button from "../ui/button";
import Modal from "../ui/modal";
import { useState } from "react";

export default function ClinicaDelete({ id }: DeleteButtonProps) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await fetch(`${api}/clinicas/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Clínica excluída com sucesso!");
                setIsOpen(false);
                router.refresh();
            } else {
                alert("Erro ao excluir clínica.");
            }
        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Erro de conexão com o servidor.");
        }
    };

    return (
        <>
            <Button
                variant="danger"
                onClick={() => setIsOpen(true)}
                className="px-3 py-1 text-sm"
            >
                Excluir
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Excluir clínica"
            >
                <div className="space-y-5">
                    <p className="text-muted">
                        Tem certeza que deseja excluir esta clínica?
                    </p>

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="danger"
                            onClick={handleDelete}
                        >
                            Excluir
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}