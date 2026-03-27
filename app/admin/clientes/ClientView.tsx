'use client'

import Link from "next/link"
import Image from "next/image"
import { Client } from "@/types/client.types"

export default function ClientView({ clients }: { clients: Client[] }) {
    return (
        <>
            <ul className="box flex flex-col justify-center sm:grid sm:grid-cols-3 gap-4 sm:gap-8 pb-20">
                {clients.filter(c => !c.deleted_at).sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
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
            <div className="text-center text-2xl text-gray-600">Apagados</div>
            <ul className="box flex flex-col justify-center sm:grid sm:grid-cols-3 gap-4 sm:gap-8 pb-4">
                {clients.filter(c => c.deleted_at).sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
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
        </>
    )
}