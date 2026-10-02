'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../resources/api";
import Modal from "../ui/modal";
import Button from "../ui/button";

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
            
            fetch(`${api}/tutores`)
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
            const  res = await fetch(`${api}/pacientes`,{
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
                        <Button
                            onClick={() => setIsOpen(true)}
                        >
                            Cadastrar Paciente
                        </Button>
                    </div>

                    <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Cadastrar novo paciente"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Nome do Paciente
                                </label>

                                <input
                                    type="text"
                                    name="nome"
                                    value={data.nome}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                                    placeholder="Ex: Pudim"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Espécie
                                </label>

                                <input
                                    type="text"
                                    name="especie"
                                    value={data.especie}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                                    placeholder="Coelho"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Raça
                                </label>

                                <input
                                    type="text"
                                    name="raca"
                                    value={data.raca}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                                    placeholder="Ex: Albino"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Idade
                                </label>

                                <input
                                    type="number"
                                    name="idade"
                                    value={data.idade}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                                    placeholder="Ex: 15"
                                />
                            </div>

                            <select
                                name="tutorId"
                                value={data.tutorId}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                            >
                                <option value="" disabled>
                                    Selecione um tutor...
                                </option>

                                {tutores.map((tutor: any) => (
                                    <option
                                        key={tutor.id}
                                        value={tutor.id}
                                    >
                                        {tutor.nome} - {tutor.cpf}
                                    </option>
                                ))}
                            </select>

                            <Button
                                type="submit"
                                className="w-full"
                            >
                                Salvar
                            </Button>
                        </form>
                    </Modal>
                </div>
        )
}