'use client'

import { useState } from "react";
import { api } from "../resources/api";
import Modal from "../ui/modal";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

export default function ClinicaForm(){
    const [isOpen,setIsOpen] = useState(false);

    const router = useRouter();
    
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
            const  res = await fetch(`${api}/clinicas`,{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(data),
            });
    
            if(res.ok){
                alert("Clinica cadastrada com sucesso!");
                router.refresh()
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
                        <div>
                            <Button
                                onClick={() => setIsOpen(true)}
                            >
                                Cadastrar Clínica
                            </Button>
                        </div>

                        <Modal
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            title="Cadastrar nova clínica"
                        >
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Nome da Clínica
                                    </label>

                                    <input
                                        type="text"
                                        name="nome"
                                        value={data.nome}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                                        placeholder="Clínica Au Que Mia"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Telefone da Clínica
                                    </label>

                                    <input
                                        type="text"
                                        name="telefone"
                                        value={data.telefone}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                                        placeholder="Ex: (87) 9 7878-6676"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Endereço da Clínica
                                    </label>

                                    <input
                                        type="text"
                                        name="endereco"
                                        value={data.endereco}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-md border border-border bg-surface p-2 text-foreground outline-none transition focus:border-primary"
                                        placeholder="Ex: Rua dos Anjos, 67"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Salvar
                                </Button>
                            </form>
                        </Modal>
                    </div>

                )}
    
    
    
    
    
    