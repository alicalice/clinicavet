'use client'

import { useEffect, useState } from "react";
import { api } from "../resources/api";
import Modal from "../ui/modal";

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
            fetch(`${api}/clinicas`)
            .then(res => res.json())
            .then(dados => setClinicas(dados))
            .catch(err => console.error("erro ao buscar clinicas",err))
        }
    },[isOpen])

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

        const salvarTutor = {
            nome: data.nome,
            cpf:data.cpf,
            telefone:data.telefone,
            clinica: {
                id:Number(data.clinicaId)
            }
        };

        try {
        const  res = await fetch(`${api}/tutores`,{
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
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-md bg-primary px-4 py-2 font-medium text-foreground transition-colors hover:bg-primary-hover"
                >
                    Cadastrar Tutor
                </button>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Cadastrar novo tutor"
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nome do Tutor
                        </label>
                        <input
                            type="text"
                            name="nome"
                            value={data.nome}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: Julia Amorim"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            CPF do Tutor
                        </label>
                        <input
                            type="text"
                            name="cpf"
                            value={data.cpf}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: 999.999.999-67"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Telefone do Tutor
                        </label>
                        <input
                            type="text"
                            name="telefone"
                            value={data.telefone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            placeholder="Ex: (87) 9 9999-9999"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Clínica
                        </label>
                        <select
                            name="clinicaId"
                            value={data.clinicaId}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                        >
                            <option value="" disabled>
                                Selecione uma clínica...
                            </option>

                            {clinicas.map((clinica: any) => (
                                <option
                                    key={clinica.id}
                                    value={clinica.id}
                                >
                                    {clinica.nome} - {clinica.endereco}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary px-4 py-2 font-medium text-foreground transition-colors hover:bg-primary-hover"
                    >
                        Salvar Tutor
                    </button>
                </form>
            </Modal>
        </div>
    )
}