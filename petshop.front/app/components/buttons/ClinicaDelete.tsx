'use client'

import { useRouter } from "next/navigation";
import { DeleteButtonProps } from "../interface/DeleteButton";

export default function ClinicaDelete({id}:DeleteButtonProps){
    const router = useRouter();
    
        const handleDelete = async ()=>{
            const confirmar = confirm("Tem certeza que deseja excluir a clinica?")
            if(!confirmar) return;
    
            try{
                const res = await fetch(`http://localhost:8080/api/clinicas/${id}`,{
                    method:"DELETE",
                });
    
                if(res.ok){
                    alert("Clinica excluída com sucesso!")
                    router.refresh();
                } else {
                    alert("Erro ao excluir clinica.")
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