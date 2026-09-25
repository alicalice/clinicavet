'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PetForm(){

    const router = useRouter();

    const [isOpen,setIsOpen] = useState(false);

    const [tutores,setTutores] = useState([]);
    
        const [data,setData] = useState({
            nome:"",
            especie:"",
            raca:"",
            idade:"",
            tutorId:""
        })

        useEffect(() => {
        if (isOpen) {
            
            fetch('http://localhost:8080/api/tutores')
                .then(res => res.json())
                .then(dados => setTutores(dados))
                .catch(err => console.error("Erro ao buscar tutores:", err));
        }
    }, [isOpen]);
    
        const handleChange =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
            const fieldName = e.currentTarget.name;
            const fieldValue = e.currentTarget.value;
    
            setData((prev)=>({
                ...prev,
                [fieldName]:fieldValue,
            }));
        }
    
        const handleSubmit = async (e:React.SubmitEvent) =>{
            e.preventDefault();

            const salvarCliente = {
            nome: data.nome,
            especie:data.especie,
            raca:data.raca,
            idade:Number(data.idade),
            tutor:{
                id: Number(data.tutorId)
            }
        };
    
            try {
            const  res = await fetch(`http://localhost:8080/api/pacientes`,{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(salvarCliente),
            });
    
            if(res.ok){
                alert("Paciente cadastrado com sucesso!");
                router.refresh();
                setIsOpen(false);
                setData({
                nome:"",
                especie:"",
                raca:"",
                idade:"",
                tutorId:""
            })
            } else {
                alert("Erro ao cadastrar cliente.")
            } 
        }catch(error){
            console.error("Erro de conexão:",error)
            alert("Não foi possível conectar ao servidor.")
        }
        }
    
        
    
        return(
            <div>
                <div className="my-4">
                    <button onClick={()=> setIsOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium">
                        Cadastrar Cliente
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

                                <select 
                                name="tutorId"
                                value={data.tutorId}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md p-2 text-black">
                                    <option value="" disabled>Selecione um tutor...</option>
                                    {tutores.map((tutor:any)=>(
                                        <option key={tutor.id}
                                        value={tutor.id}>{tutor.nome} - {tutor.cpf}</option>
                                    ))}
                            </select>
    
                                
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