"use client";

import DeleteButton from "../ui/DeleteButton";

interface TutorDeleteProps {
    id: number;
}

export default function TutorDelete({ id }: TutorDeleteProps) {
    return (
        <DeleteButton
            id={id}
            resource="tutores"
            itemName="tutor"
            errorMessage="Erro ao excluir tutor. Verifique se ele possui pacientes vinculados."
        />
    );
}