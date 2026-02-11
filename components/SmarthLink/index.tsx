'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function SmartLink({ href, children }: { href: string, children: React.ReactNode }) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    // router.refresh() força o Next.js a buscar dados novos do servidor 
    // para a rota atual e para a próxima
    router.refresh()
  }

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  )
}