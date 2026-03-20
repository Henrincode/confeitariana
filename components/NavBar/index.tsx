// components/Navbar.tsx
import { auth } from "@/auth"
import NavBarView from "./ClientView";

interface Props {
  className?: string
}

export default async function NavBar({ className }: Props) {

  const session = await auth()

  return (
    <NavBarView className={className}/>
  )
}