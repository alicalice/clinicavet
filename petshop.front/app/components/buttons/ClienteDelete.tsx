'use client'

import { useRouter } from "next/navigation";
import { DeleteButtonProps } from "../interface/DeleteButton";
import { api } from "../resources/api";




export default function ClienteDelete({id}:DeleteButtonProps){
    const router = useRouter();

    const handleDelete = async ()=>{
        const confirmar = confirm("Tem certeza que deseja excluir o cliente?")
        if(!confirmar) return;

        try{
            const res = await fetch(`${api}/clientes/${id}`,{
                method:"DELETE",
                cache:"no-store"
            });

            if(res.ok){
                alert("Cliente excluído com sucesso!")
                router.refresh();
            } else {
                alert("Erro ao excluir cliente.")
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