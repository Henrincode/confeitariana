import Link from "next/link";

interface Props {
    className?: string
}

export default function NavBar({className}: Props) {
    return (
        <div className={`${className} p-2 border-b-2 border-amber-300 bg-amber-200`}>
            <div className="box flex flex-row justify-between items-center">
                <Link href="/" id="nav-logo" className="flex flex-row items-center gap-2 group">
                    <img src="/cookie-01.png" alt="" className="w-8" />
                    <p className="hidden sm:block font-bold text-3xl text-pink-400 group-hover:text-pink-500">Confeitariana</p>
                </Link>
                <ul className="flex flex-row gap-2 font text-amber-800 [&_.link]:hover:text-amber-500">
                    <li><Link className="link" href="/admin/clientes">Clientes</Link></li>
                    <li className="w-1 rounded-full bg-amber-50"></li>
                    <li><Link className="link" href="/admin/clientes/cadastrar">Cadastrar</Link></li>
                </ul>
            </div>
        </div>
    )
}