'use client'

import { ReactNode, useEffect } from "react"

interface Props {
    children: ReactNode
    closeModal: () => void
}

export default function Modals({ children, closeModal }: Readonly<Props>) {

    const teste = document.querySelector('#modal')

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        return () => document.body.classList.remove('overflow-hidden')
    }, [])

    return (
        <div onMouseDown={closeModal} onLoad={(e) => e.currentTarget.classList.remove('opacity-0')} className="overflow-y-auto fixed z-10000000 inset-0 bg-gray-600/80 md:backdrop-blur transition-all duration-500 opacity-0">
            <div onLoad={(e) => e.currentTarget.classList.remove('-translate-y-10', 'opacity-0')} className="py-10 -translate-y-10 opacity-0 transition-all duration-500">
                {children}
            </div>
        </div>
    )
}