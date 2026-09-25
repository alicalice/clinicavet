
import ClinicaForm from "./components/forms/ClinicaForm";
import ClinicaEdit from "./components/buttons/ClinicaEdit";
import ClinicaDelete from "./components/buttons/ClinicaDelete";
import Link from "next/link";

export default async function Home(){
    const res = await fetch('http://localhost:8080/api/clinicas');
    const clinicas = await res.json();

    return(

        <main className="p-10 min-h-screen bg-gray-100 text-gray-900"> 
        
            <div>

            <h2 className="text-3xl font-bold mb-6">Clinicas Cadastradas</h2>

            <ClinicaForm />

            <div className="grid gap-4 max-w-2xl">
                {clinicas.map((clinica:any)=>(
                    <div key={clinica.id} className="p-4 border rounded-lg shadow-sm bg-white">
                                <h2 className="text-xl font-semibold">{clinica.nome}</h2>
                                <p><strong>ID:</strong>{clinica.id}</p>
                                <p><strong>Telefone:</strong>{clinica.telefone}</p>
                                <p><strong>Endereço:</strong>{clinica.endereco}</p>

                                <Link href={`/clinicas/${clinica.id}`}
                                className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 text-sm font-medium"
                                >Ver tutores</Link>
                                <ClinicaEdit 
                                id={clinica.id}
                                nome={clinica.nome}
                                telefone={clinica.telefone}
                                endereco={clinica.endereco}
                                />
                                <ClinicaDelete id={clinica.id}/>
                              </div>
                ))}
            </div>

            </div>
        </main>
    )
}