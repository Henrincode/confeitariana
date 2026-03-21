'use client'

import { logout } from "@/server/actions/auth";
import Link from "next/link";

interface Props {
    className?: string
    session?: any
}

export default function NavBarView({ className, session }: Props) {

    return (
        <div className={`${className} z-100 p-2 border-b-2 border-amber-300 bg-amber-300/50 backdrop-blur`}>
            <div className="box flex flex-row justify-between items-center">
                <Link href="/" id="nav-logo" className="flex flex-row items-center gap-2 group">
                    <img src="/cookie-01.png" alt="" className="w-8" />
                    <p className="hidden sm:block font-bold text-3xl text-pink-400 group-hover:text-pink-500">Confeitariana</p>
                </Link>
                {session && (
                    <ul className="flex flex-row gap-2 font text-amber-800 [&_.link]:hover:text-amber-500">
                        <li><Link className="link" href="/admin/clientes">Clientes</Link></li>
                        <li className="w-1 rounded-full bg-amber-50"></li>
                        <li><Link className="link" href="/admin/clientes/cadastrar">Cadastrar cliente</Link></li>
                        <li className="w-1 rounded-full bg-amber-50"></li>
                        <li>
                            <div className="flex gap-4 items-center">
                                <span>Olá, {session.user?.name || 'sem nome'}</span>
                                <form action={logout}>
                                    <button className="text-red-400 hover:text-red-600 cursor-pointer">Sair</button>
                                </form>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}