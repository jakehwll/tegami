import { useState } from "react"
import { Button } from "ui/Button"
import Container from "ui/Container"
import Typography from "ui/Typography"
import { trpc } from "api/trpc"

const Register = () => {
  const register = trpc.auth.register.useMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return <>
    <Container>
      <Typography>Register</Typography>
      <div>
        <input placeholder={"Username"} type={'text'} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
        <input placeholder={"Password"} type={'password'} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <Button onClick={() => register.mutate({
        username,
        password
      })}>
        Register
      </Button>
    </Container>
  </>
}

export default Register