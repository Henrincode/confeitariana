"use client"
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ScrollRestorer() {
    const pathname = usePathname()

    useEffect(() => {
        // Esse é o código que o 'scroll={true}' deveria fazer sempre, 
        // mas que o Layout às vezes bloqueia.
        window.scrollTo({
            top: 0,
            left: 0,
            // behavior: 'smooth'
        })
    }, [pathname])
    // ou [pathname, searchParams]

    return null
}