// components/Navbar.tsx
import Link from "next/link"
import { auth, signOut } from "@/auth"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex justify-between p-4 bg-zinc-900 text-white">
      <div className="flex gap-4">
        <Link href="/home">Home</Link>
        <Link href="/produtos">Produtos</Link>
        {session?.user && <Link href="/admin">Painel Admin</Link>}
      </div>

      <div>
        {session ? (
          <div className="flex gap-4 items-center">
            <span>Olá, {session.user?.name || 'sem nome'}</span>
            <form action={async () => { "use server"; await signOut() }}>
              <button className="text-red-400">Sair</button>
            </form>
          </div>
        ) : (
          <Link href="/login" className="bg-blue-600 px-4 py-1 rounded">
            Logar
          </Link>
        )}
      </div>
    </nav>
  )
}