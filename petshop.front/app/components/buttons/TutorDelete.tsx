'use client'

import { useRouter } from "next/navigation";
import { DeleteButtonProps } from "../interface/DeleteButton";
import { api } from "../resources/api";




export default function TutorDelete({id}:DeleteButtonProps){
    const router = useRouter();

    const handleDelete = async ()=>{
        const confirmar = confirm("Tem certeza que deseja excluir o tutor?")
        if(!confirmar) return;

        try{
            const res = await fetch(`${api}/tutores/${id}`,{
                method:"DELETE",
            });

            if(res.ok){
                alert("Tutor excluído com sucesso!")
                router.refresh();
            } else {
                alert("Erro ao excluir tutor. Verifique se ele possui pacientes vinculados.")
            }
        } catch(error) {
            console.error("Erro ao deletar:",error);
            alert("Erro de conexão com o servidor.");
        }
    } 

    return(
        <button
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition"
        onClick={handleDelete}
        >Excluir</button>
    )
}