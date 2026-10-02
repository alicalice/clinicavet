"use client";

import DeleteButton from "../ui/DeleteButton";


interface ClinicaDeleteProps {
    id: number;
}

export default function ClinicaDelete({ id }: ClinicaDeleteProps) {
    return (
        <DeleteButton
            id={id}
            resource="clinicas"
            itemName="clínica"
        />
    );
}