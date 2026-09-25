import Link from "next/link";

export default function Navbar(){

    return(
        <nav className="bg-blue-600 p-4 flex gap-4 text-white">
            <Link href="../">Clinicas</Link>
            <Link href="../tutores/">Tutores</Link>
            <Link href="../pacientes">Pacientes</Link>
        </nav>
    )
    
}