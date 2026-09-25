export default async function ClinicaDetalhesPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Aguarda a leitura do ID da URL
  const { id } = await params;

  // 2. Busca os dados da Clínica e os Tutores em paralelo ou sequencial
  const resClinica = await fetch(`http://localhost:8080/api/clinicas/${id}`, { cache: 'no-store' });
  const clinica = await resClinica.json();

  const resTutores = await fetch(`http://localhost:8080/api/tutores/clinica/${id}`, { cache: 'no-store' });
  const tutores = await resTutores.json();

  return (
    <main className="p-8">
      {/* Dados da clínica no topo */}
      <div className="mb-6 p-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">{clinica.nome}</h1>
        <p className="text-gray-600">{clinica.endereco} | {clinica.telefone}</p>
      </div>

      {/* Lista apenas dos tutores dessa clínica */}
      <h2 className="text-xl font-semibold mb-4">Tutores Vinculados</h2>
      
      {tutores.length === 0 ? (
        <p className="text-gray-500">Nenhum tutor cadastrado nesta clínica.</p>
      ) : (
        <div className="grid gap-4">
          {tutores.map((tutor: any) => (
            <div key={tutor.id} className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="font-bold">{tutor.nome}</p>
              <p className="text-sm text-gray-600">CPF: {tutor.cpf} | Tel: {tutor.telefone}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}