import { createFileRoute } from '@tanstack/react-router'
import { Login } from '@/modules/auth/login.component'

export const Route = createFileRoute('/auth/login')({
  component: LoginComp,
})

function LoginComp() {
  return <Login />
}
