'use client'

import { useState } from "react";

export default function ClinicaForm(){
    const [isOpen,setIsOpen] = useState(false);
    
        const [data,setData] = useState({
            nome:"",
            telefone:"",
            endereco:"",
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
            const  res = await fetch('http://localhost:8080/api/clinicas',{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(data),
            });
    
            if(res.ok){
                alert("Clinica cadastrada com sucesso!");
                setIsOpen(false);
                setData({
                    nome:"",
                    telefone:"",
                    endereco:"",
                })
            } else {
                alert("Erro ao cadastrar clinica. Verifique se os dados estão corretos.")
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
                        Cadastrar Clinica
                    </button>
                </div>
                {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative text-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold mb-4">Cadastrar Nova Clinica</h2>
                                <button onClick={()=>setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl font-bold">
                                    ✕ Fechar
                                </button>
                            </div>
    
    
                            {/*formulario*/}
                            <form onSubmit={handleSubmit} 
                            className="p-4 border rounded-md shadow-sm max-w-md mt-6">
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Nome da Clinica:</label>
                                    <input
                                    type="text"
                                    name="nome"
                                    value={data.nome}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-2 text-black"
                                    placeholder="Clinica Au Que Mia"
                                    />
                                </div>
    
                                <div>
                                    <label className="block text-sm font-medium mb-1">Telefone da Clinica:</label>
                                    <input
                                    type="text"
                                    name="telefone"
                                    value={data.telefone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-2 text-black"
                                    placeholder="Ex: (87) 9 7878-6676"
                                    />
                                </div>
    
                                <div>
                                    <label className="block text-sm font-medium mb-1">Endereço da Clinica:</label>
                                    <input
                                    type="text"
                                    name="endereco"
                                    value={data.endereco}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-2 text-black"
                                    placeholder="Ex: Rua dos Anjos, 67"
                                    />
                                </div>
    
                                
                                <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
                                >Salvar Clinica</button>
                            </form>
    
                        </div>
                    </div>
                )}
    
    
    
    
    
            
        </div>
        )
}