'use client'

import { useState } from "react";
import { api } from "../resources/api";
import Modal from "../ui/modal";

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
            const  res = await fetch(`${api}/clinicas`,{
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
                            <button
                                onClick={() => setIsOpen(true)}
                                className="rounded-md bg-primary px-4 py-2 font-medium text-foreground transition-colors hover:bg-primary-hover"
                            >
                                Cadastrar Clínica
                            </button>
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

                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-primary px-4 py-2 font-medium text-foreground transition-colors hover:bg-primary-hover"
                                >
                                    Salvar Clínica
                                </button>
                            </form>
                        </Modal>
                    </div>

                )}
    
    
    
    
    
    