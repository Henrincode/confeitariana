'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function Go({ href, children, id, className }: { href: string, children: React.ReactNode, id?: string, className?: string }) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    // router.refresh() força o Next.js a buscar dados novos do servidor 
    // para a rota atual e para a próxima
    router.refresh()
  }

  return (
    <Link id={id} href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}