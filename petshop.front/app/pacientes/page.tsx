import ClienteDelete from "../components/buttons/ClienteDelete";
import PetEdit from "../components/buttons/ClienteEdit";
import TutorEdit from "../components/buttons/TutorEdit";
import PetForm from "../components/forms/ClienteForm";


export default async function Clientes(){


const res = await fetch("http://localhost:8080/api/pacientes")
const data = await res.json();
const clientes = Array.isArray(data) ?data : (data.content || [])
  return(
    <main className="p-10 min-h-screen bg-gray-100 text-gray-900">
      
      <h2 className="text-3xl font-bold mb-6">Cliente Cadastrados</h2>

      <PetForm />

      <div className="grid gap-4 max-w-2xl">
        {clientes.map((cliente:any)=>(
          <div key={cliente.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{cliente.nome}</h2>
            <p><strong>ID: </strong>{cliente.id}</p>
            <p><strong>Especie: </strong>{cliente.especie}</p>
            <p><strong>Raca: </strong>{cliente.raca}</p>
            <p><strong>Idade: </strong>{cliente.idade}</p>
            <p><strong>Tutor: </strong>{cliente.tutor?.nome || "Sem Tutor Vinculado."} </p>
            <PetEdit 
            id={cliente.id}
            nome={cliente.nome}
            especie={cliente.especie}
            raca={cliente.raca}
            idade={cliente.idade}
            tutorId={cliente.tutor?.id}
            
            />
            <ClienteDelete id={cliente.id}/>
          </div>

          
        ))}

        {clientes.length === 0 && (
          <p>Nenhum cliente cadastrado ainda.</p>
        )}
      </div>
    </main>
  )
}