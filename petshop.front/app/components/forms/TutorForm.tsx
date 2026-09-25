'use client'

import { useEffect, useState } from "react";

export default function TutorForm(){

    const [clinicas,setClinicas] = useState([]);

    const [isOpen,setIsOpen] = useState(false);

    const [data,setData] = useState({
        nome:"",
        cpf:"",
        telefone:"",
        clinicaId:""
    })

    useEffect(()=>{
        if(isOpen){
            fetch('http://localhost:8080/api/clinicas')
            .then(res => res.json())
            .then(dados => setClinicas(dados))
            .catch(err => console.error("erro ao buscar clinicas",err))
        }
    },[isOpen])

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

        const salvarTutor = {
            nome: data.nome,
            cpf:data.cpf,
            telefone:data.telefone,
            clinica: {
                id:Number(data.clinicaId)
            }
        };

        try {
        const  res = await fetch('http://localhost:8080/api/tutores',{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(salvarTutor),
        });

        if(res.ok){
            alert("Tutor cadastrado com sucesso!");
            setIsOpen(false);
            setData({
                nome:"",
                cpf:"",
                telefone:"",
                clinicaId:''
            })
        } else {
            alert("Erro ao cadastrar tutor. Verifique se os dados estão corretos.")
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
                    Cadastrar Cliente
                </button>
            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative text-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold mb-4">Cadastrar Novo Tutor</h2>
                            <button onClick={()=>setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 text-xl font-bold">
                                ✕ Fechar
                            </button>
                        </div>


                        {/*formulario*/}
                        <form onSubmit={handleSubmit} 
                        className="p-4 border rounded-md shadow-sm max-w-md mt-6">
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Nome do Tutor:</label>
                                <input
                                type="text"
                                name="nome"
                                value={data.nome}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md p-2 text-black"
                                placeholder="Ex: Julia Amorim"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">CPF do tutor:</label>
                                <input
                                type="text"
                                name="cpf"
                                value={data.cpf}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md p-2 text-black"
                                placeholder="Ex: 999.999.999-67"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Telefone do Tutor</label>
                                <input
                                type="text"
                                name="telefone"
                                value={data.telefone}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md p-2 text-black"
                                placeholder="Ex: (87) 9 9999-9999"
                                />
                            </div>

                            <select 
                            name="clinicaId"
                            value={data.clinicaId}
                            onChange={handleChange as any}
                            required
                            className="w-full border rounded-md p-2 text-black">
                                <option value="" disabled>Selecione uma Clinica...</option>
                                {clinicas.map((clinica:any)=>(
                                    <option key={clinica.id}
                                    value={clinica.id}>{clinica.nome} - {clinica.endereco}</option>
                                ))}
                            </select>

                            
                            <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
                            >Salvar Tutor</button>
                        </form>

                    </div>
                </div>
            )}





        
    </div>
    )
}