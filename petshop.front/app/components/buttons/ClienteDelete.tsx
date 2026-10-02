"use client";

import DeleteButton from "../ui/DeleteButton";

interface ClienteDeleteProps {
    id: number;
}

export default function ClienteDelete({ id }: ClienteDeleteProps) {
    return (
        <DeleteButton
            id={id}
            resource="pacientes"
            itemName="paciente"
        />
    );
}