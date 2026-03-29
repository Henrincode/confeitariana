'use client'

import { logout } from "@/server/actions/auth";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

interface Props {
    className?: string
    session?: Session | null
}

export default function NavBarView({ className, session }: Props) {

    const [modal, setModal] = useState(false)

    document.body.classList.add('overflow-hidden')

    return (
        <>
            {/* Modal */}
            {modal && (
                <div className="z-200 overflow-auto flex flex-col justify-center items-center fixed w-dvw h-dvh p-4 bg-gray-600/80">
                    <div className="">
                        <div className="w-200 h-20 bg-gray-400"></div>
                        <div className="w-200 h-200 bg-gray-50"></div>
                        <div className="w-200 h-20 bg-gray-800"></div>
                    </div>
                </div>
            )}

            <div className={`${className} z-100 p-2 border-b-2 border-amber-300 bg-amber-300/50 backdrop-blur`}>
                <div className="box flex flex-row justify-between items-center gap-2">
                    <Link href="/" id="nav-logo" className="flex-1 flex flex-row items-center gap-2 group">
                        <img src="/cookie-01.png" alt="" className="w-8 brightness-95 saturate-140" />
                        <p className="flex-1 font-bold text-3xl text-center md:text-left text-pink-500 group-hover:text-pink-400 transition-all">Confeitariana</p>
                    </Link>

                    {/* mostra se estiver logad */}
                    {session && (

                        <>
                            {/* desktop */}
                            <ul className="hidden md:flex flex-row gap-2 font text-amber-800 [&_.link]:hover:text-amber-500">
                                <li><Link className="link" href="/admin/clientes">Clientes</Link></li>
                                <li className="w-1 rounded-full bg-amber-400"></li>
                                <li><Link className="link" href="/admin/clientes/cadastrar">Cadastrar cliente</Link></li>
                                <li className="w-1 rounded-full bg-amber-400"></li>
                                <li>
                                    <div className="flex flex-row gap-2 items-cente">
                                        <span>Olá, {session.user.name || 'sem nome'}</span>
                                        <form action={logout}>
                                            <button className="text-red-400 hover:text-red-600 cursor-pointer">Sair</button>
                                        </form>
                                    </div>
                                </li>
                            </ul>

                            {/* mobile */}
                            <button className="md:hidden p-2 rounded text-amber-200 bg-amber-600"><FaBars /></button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}