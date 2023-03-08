import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "ui/Button"
import Container from "ui/Container"
import Typography from "ui/Typography"
import { trpc } from "../../utils/trpc"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return <>
    <Container>
      <Typography>Login</Typography>
      <div>
        <input placeholder={"Username"} type={'text'} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
        <input placeholder={"Password"} type={'password'} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <Button onClick={() => signIn('credentials', { username, password })}>
        Login
      </Button>
    </Container>
  </>
}

export default Login