'use client'

import Link from "next/link"
import Image from "next/image"
import { Client } from "@/types/client.types"
import { useEffect, useState } from "react"

export default function ClientView({ clients }: { clients: Client[] }) {

    const [mostrarOcultos, setMostrarOcultos] = useState('Mostrar')
    const [search, setSearch] = useState('')

    function trocar() {
        if (mostrarOcultos === 'Mostrar') {
            setMostrarOcultos('Ocultar')
        } else {
            setMostrarOcultos('Mostrar')
        }
    }

    return (
        <>
            <div className="box flex flex-col items-center mb-4">
                <input
                    onInput={(e) => setSearch(e.currentTarget.value)} value={search}
                    type="text" placeholder="🔍 Buscar"
                    className="
                    w-full max-w-100
                    py-2 px-4
                    border border-gray-400 rounded-full outline-none
                    text-2xl text-gray-700
                    bg-amber-50
                "/>
            </div>
            <div onClick={trocar} className="mx-auto mb-4 w-fit cursor-pointer select-none">{mostrarOcultos} clientes apagados</div>
            <ul className="box flex flex-col justify-center sm:grid sm:grid-cols-3 gap-4 sm:gap-8 pb-20">
                {clients.filter(c => !c.deleted_at).filter(c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
                    <li key={i} className="col-span-1 transition-all **:transition-all">
                        <Link href={`/admin/cliente/${c.id_client}`} className="flex flex-row items-center cursor-pointer select-none group">
                            <Image
                                src={c.image_url || `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${c.id_client}`}
                                alt='avatar'
                                width={150}
                                height={150}
                                className="z-1 w-20 sm:w-30 border-8 border-white group-hover:border-pink-300 rounded-full aspect-square bg-white object-cover"
                            />
                            <div className="sm:flex-1 sm:flex sm:flex-row sm:items-center sm:min-h-16 px-2 py-1 pl-8 -ml-5 sm:text-xl rounded-r-2xl text-gray-700 bg-white group-hover:bg-pink-300">
                                {c.name}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* {mostrarOcultos !== 'Mostrar' && ( */}
            <div className={`grid transition-all duration-500 ${mostrarOcultos === 'Mostrar' ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
                <div className="overflow-hidden">
                    <div className="text-center text-2xl text-gray-600">Apagados</div>
                    <ul className="box flex flex-col justify-center sm:grid sm:grid-cols-3 gap-4 sm:gap-8 pb-4">
                        {clients.filter(c => c.deleted_at).filter(c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
                            <li key={i} className="col-span-1 opacity-70 hover:opacity-100 transition-all **:transition-all">
                                <Link href={`/admin/cliente/${c.id_client}`} className="flex flex-row items-center cursor-pointer select-none group">
                                    <Image
                                        src={c.image_url || `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${c.id_client}`}
                                        alt='avatar'
                                        width={150}
                                        height={150}
                                        className="z-1 w-20 sm:w-30 border-8 border-white group-hover:border-pink-300 rounded-full aspect-square bg-white object-cover"
                                    />
                                    <div className="sm:flex-1 sm:flex sm:flex-row sm:items-center sm:min-h-16 px-2 py-1 pl-8 -ml-5 sm:text-xl rounded-r-2xl text-gray-700 bg-white group-hover:bg-pink-300">
                                        {c.name}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* )} */}
        </>
    )
}