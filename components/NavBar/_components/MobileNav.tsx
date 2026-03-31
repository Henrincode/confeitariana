'use client'

import Link from "next/link"

interface Params {
    pathname: string
    closeModal: () => void
}

export default function MobileNav({ pathname, closeModal }: Params) {
    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="
            flex flex-col gap-8
            w-full lg:w-auto p-8 rounded-2xl text-white bg-gray-800
            [&_p]:text-4xl
            
            [&_.area]:flex
            [&_.area]:flex-row
            [&_.area]:gap-2
            
            [&_.area-border]:w-1.5
            [&_.area-border]:rounded-full
            [&_.area-border]:bg-pink-500
            
            [&_ul]:flex
            [&_ul]:flex-col
            [&_ul]:gap-1

            [&_li]:text-2xl
            [&_li]:ml-4
            [&_li]:hover:text-pink-500
            
            [&_.divider]:w-full
            [&_.divider]:h-1
            [&_.divider]:rounded-full
            [&_.divider]:bg-gray-700

            [&_.sub]:mt-2
            [&_.sub]:ml-4
            [&_.sub]:text-sm
            [&_.sub]:font-semibold
            [&_.sub]:cursor-auto
            [&_.sub]:text-gray-500
        ">
            <div className="area">
                <div className="area-border"></div>
                <ul>
                    <p>Clientes</p>
                    <li>
                        <Link
                            onClick={() => pathname === '/admin/clientes' && closeModal()}
                            href={'/admin/clientes'}>
                            Ver todos
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => pathname === '/admin/clientes/cadastrar' && closeModal()}
                            href={'/admin/clientes/cadastrar'}>
                            Cadastrar novo
                        </Link>
                    </li>
                </ul>
            </div>

            {/* divider */}
            {/* <div className="divider"></div> */}

            
        </div>
    )
}