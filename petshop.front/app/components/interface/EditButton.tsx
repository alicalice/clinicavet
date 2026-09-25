export interface EditButtonTutor{
    id:number
    nome:string
    cpf:string
    telefone:string
    clinicaId?: number | string
}

export interface EditButtonClin{
    id:number
    nome:string
    telefone:string
    endereco:string
}

export interface EditButtonPet{
    id:number
    nome:string
    especie:string
    raca:string
    idade:number
    tutorId?:number | string
}