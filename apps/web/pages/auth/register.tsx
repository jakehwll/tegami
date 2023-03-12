import { trpc } from "api/trpc";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Card, Container, Input, Typography } from "ui";

const Register = () => {
  const router = useRouter();
  const register = trpc.auth.register.useMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Container>
      <Typography>Register</Typography>
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
        <Input
          placeholder={"Confirm Password"}
          type={"password"}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Button
          size={"large"}
          onClick={async () => {
            if (password !== confirmPassword) return;
            const result = await register.mutateAsync({
              username,
              password,
            });
            if (result.status === 201) router.push("/auth/login");
          }}
        >
          Register
        </Button>
      </Card>
    </Container>
  );
};

export default Register;
