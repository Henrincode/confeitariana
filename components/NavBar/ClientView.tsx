'use client'

import { logout } from "@/server/actions/auth";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import MobileNav from "./_components/MobileNav";
import { usePathname } from "next/navigation";

interface Props {
    className?: string
    session?: Session | null
}

export default function NavBarView({ className, session }: Props) {

    const pathname = usePathname()

    const [modal, setModal] = useState(false)

    function closeModal() {
        setModal(false)
    }

    useEffect(() => {
        if (modal) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
        return () => document.body.classList.remove('overflow-hidden')
    }, [modal])

    useEffect(() => {
        closeModal()
    }, [pathname])

    return (
        <>
            {/* Modal */}
            {modal && (
                <div onMouseDown={() => setModal(false)} className="z-200 flex flex-col justify-top items-center fixed w-full h-dvh bg-gray-600/80 md:backdrop-blur-xl">
                    <div className="overflow-auto flex flex-col items-center w-full p-2">
                        {/* component */}
                        <div onMouseDown={(e) => e.stopPropagation()} className="w-full">
                            <MobileNav pathname={pathname} closeModal={closeModal} />
                        </div>
                    </div>
                </div>
            )}

            <div className={`${className} z-100 p-2 border-b-2 border-amber-300 bg-amber-300/50 backdrop-blur`}>
                <div className="box flex flex-row justify-between items-center gap-2">
                    <Link href="/" id="nav-logo" className="flex flex-row items-center gap-2 group">
                        <img src="/cookie-01.png" alt="" className="w-8 brightness-95 saturate-140" />
                        <p className="flex-1 font-bold text-3xl text-center md:text-left text-pink-500 group-hover:text-pink-400 transition-all">Confeitariana</p>
                    </Link>

                    <div className="flex-1"></div>

                    {/* mostra se estiver logad */}
                    {session && (

                        <>
                            {/* desktop */}
                            <ul className="
                                hidden md:flex flex-row gap-2
                                text-amber-800
                                [&_.link]:text-white
                                [&_.link]:hover:text-amber-800
                                [&_.link]:whitespace-nowrap
                            ">
                                <li className="relative cursor-pointer group">
                                    Clientes
                                    <div className="
                                    absolute left-1/2 -translate-x-1/2
                                    hidden group-hover:block
                                    ">
                                        <div className="p-2 mt-1 rounded-lg bg-amber-500 shadow-md shadow-black/30">
                                            <Link className="block link" href="/admin/clientes">Clientes</Link>
                                            <Link className="block link" href="/admin/clientes/cadastrar">Cadastrar cliente</Link>
                                        </div>
                                    </div>
                                </li>
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
                            <button onClick={() => setModal(true)} className="md:hidden p-2 rounded text-amber-200 bg-amber-600"><FaBars /></button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}