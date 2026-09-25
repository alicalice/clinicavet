'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditButtonPet } from "../interface/EditButton";

export default function PetEdit({id,nome,especie,raca,idade}:EditButtonPet){
    const router = useRouter();
    const [isOpen,setIsOpen] = useState(false);
    
        const [data,setData] = useState({
            nome:nome,
            especie:especie,
            raca:raca,
            idade:idade,
        })
    
        const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
            const fieldName = e.currentTarget.name;
            const fieldValue = e.currentTarget.value;
    
            setData((prev)=>({
                ...prev,
                [fieldName]:fieldValue,
            }));
        }
    
        const handleSubmit = async (e:React.SubmitEvent) =>{
            e.preventDefault();
    
            try {
            const  res = await fetch(`http://localhost:8080/api/clientes/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(data),
            });
    
            if(res.ok){
                router.refresh();
                alert("Pet editado com sucesso!");
                setIsOpen(false);
            } else {
                alert("Erro ao editar pet.")
            } 
        }catch(error){
            console.error("Erro de conexão:",error)
            alert("Não foi possível conectar ao serivor.")
        }
        }
    
        
    
        return(
            <div>
                <div className="my-4">
                    <button onClick={()=> setIsOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium">
                        Editar Cliente
                    </button>
                </div>
                {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative text-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
                                <button onClick={()=>setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl font-bold">
                                    ✕ Fechar
                                </button>
                            </div>
    
    
                            {/*formulario*/}
                            <form onSubmit={handleSubmit} 
                            className="p-4 border rounded-md shadow-sm max-w-md mt-6">
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Nome do Cliente:</label>
                                    <input
                                    type="text"
                                    name="nome"
                                    value={data.nome}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-2 text-black"
                                    placeholder="Ex: Pudim"
                                    />
                                </div>
    
                                <div>
                                    <label className="block text-sm font-medium mb-1">Especie do Cliente:</label>
                                    <input
                                    type="text"
                                    name="especie"
                                    value={data.especie}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-2 text-black"
                                    placeholder="Coelho"
                                    />
                                </div>
    
                                <div>
                                    <label className="block text-sm font-medium mb-1">Raça do Cliente</label>
                                    <input
                                    type="text"
                                    name="raca"
                                    value={data.raca}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-2 text-black"
                                    placeholder="Ex: Albino"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Idade do Cliente</label>
                                    <input
                                    type="number"
                                    name="idade"
                                    value={data.idade}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-2 text-black"
                                    placeholder="Ex: 15"
                                    />
                                </div>
    
                                
                                <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
                                >Salvar</button>
                            </form>
    
                        </div>
                    </div>
                )}
    
    
    
    
    
            
        </div>
        )
}