import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button, Card, Container, Input, Typography } from "ui";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Container>
        <Typography>Login</Typography>
        <Card>
          <Input
            placeholder={"Username"}
            type={"text"}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            placeholder={"Password"}
            type={"password"}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            fullWidth={true}
            size={"large"}
            onClick={() =>
              signIn("credentials", {
                username,
                password,
                callbackUrl: `${
                  process.env.NEXTAUTH_URL ?? "http://localhost:3000"
                }/unread`,
              })
            }
          >
            Login
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Login;
