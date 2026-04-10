'use client'

import { ReactNode, useEffect, useRef } from "react"

interface Props {
    children: ReactNode
    closeModal: () => void
}

export default function Modals({ children, closeModal }: Readonly<Props>) {

    const bgRef = useRef<HTMLInputElement>(null)
    const modalRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        setTimeout(() => {
            if (bgRef.current && modalRef.current) {
                bgRef.current.classList.remove("opacity-0")
                modalRef.current.classList.remove("-translate-y-10", "opacity-0")
            }
        }, 10)
        return () => document.body.classList.remove('overflow-hidden')
    }, [])

    function close() {
        if (bgRef.current && modalRef.current) {
            bgRef.current.classList.add("opacity-0")
            modalRef.current.classList.add("-translate-y-10", "opacity-0")
        }
        setTimeout(() => {
            closeModal()
        }, 400);
    }

    return (
        <div ref={bgRef} onMouseDown={close} className="
            overflow-y-auto
            fixed inset-0 z-10000000
            flex flex-col justify-center items-center
            transition-all duration-500 opacity-0
            bg-gray-600/80 md:backdrop-blur
        ">
            <div ref={modalRef} className="drop-shadow-xl drop-shadow-black/30 py-4 -translate-y-10 opacity-0 transition-all duration-500">
                {children}
            </div>
        </div>
    )
}