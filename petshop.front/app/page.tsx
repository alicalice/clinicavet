import TutorDelete from "./components/buttons/TutorDelete";
import TutorForm from "./components/forms/TutorForm";

export default async function Home(){

  async function resposta() {
    
  
}

const res = await fetch("http://localhost:8080/api/tutores")
const tutores = await res.json();
  return(
    <main className="p-10 min-h-screen bg-gray-100 text-gray-900">
      <h2 className="text-3xl font-bold mb-6">Lista de Tutores</h2>

      <TutorForm />

      <div className="grid gap-4 max-w-2xl">
        {tutores.map((tutor:any)=>(
          <div key={tutor.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{tutor.nome}</h2>
            <p><strong>ID:</strong>{tutor.id}</p>
            <p><strong>CPF:</strong>{tutor.cpf}</p>
            <p><strong>Telefone</strong>{tutor.telefone}</p>
            <TutorDelete id={tutor.id}/>
          </div>

          
        ))}

        {tutores.length === 0 && (
          <p>Nenhum tutor cadastrado ainda.</p>
        )}
      </div>
    </main>
  )
}