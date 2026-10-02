"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteButtonProps } from "../interface/DeleteButton";
import Button from "../ui/button";
import Modal from "../ui/modal";
import { api } from "../resources/api";

export default function DeleteButton({
    id,
    resource,
    itemName,
    errorMessage,
}: DeleteButtonProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await fetch(`${api}/${resource}/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert(`${itemName} excluído com sucesso!`);
                setIsOpen(false);
                router.refresh();
            } else {
                alert(
                    errorMessage ?? `Erro ao excluir ${itemName}.`
                );
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
                title={`Excluir ${itemName}`}
            >
                <div className="space-y-5">
                    <p className="text-muted">
                        Tem certeza que deseja excluir este {itemName}?
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
                            size="sm"
                            onClick={() => setIsOpen(true)}
                        >
                            Excluir
                        </Button>
                </div>
                </div>
            </Modal>
        </>
    );
}