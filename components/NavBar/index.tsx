'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    className?: string
}

export default function NavBar({ className }: Props) {
    const router = useRouter()

    return (
        <div className={`${className} z-100 p-2 border-b-2 border-amber-300 bg-amber-300/50 backdrop-blur`}>
            <div className="box flex flex-row justify-between items-center">
                <Link onClick={() => router.refresh()} href="/" id="nav-logo" className="flex flex-row items-center gap-2 group">
                    <img src="/cookie-01.png" alt="" className="w-8" />
                    <p className="hidden sm:block font-bold text-3xl text-pink-400 group-hover:text-pink-500">Confeitariana</p>
                </Link>
                <ul className="flex flex-row gap-2 font text-amber-800 [&_.link]:hover:text-amber-500">
                    <li><Link onClick={() => router.refresh()} className="link" href="/admin/clientes">Clientes</Link></li>
                    <li className="w-1 rounded-full bg-amber-50"></li>
                    <li><Link onClick={() => router.refresh()} className="link" href="/admin/clientes/cadastrar">Cadastrar cliente</Link></li>
                    <li className="w-1 rounded-full bg-amber-50"></li>
                    <li><Link onClick={() => router.refresh()} className="link" href="/admin/cadastrar/geral">Cadastrar geral</Link></li>
                </ul>
            </div>
        </div>
    )
}