import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button, Card, Container, Input, Typography } from "ui";
import * as z from "zod";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const Login = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <Container>
      <Typography>Login</Typography>
      <Card>
        <form
          onSubmit={handleSubmit(({ username, password }) =>
            signIn("credentials", {
              username,
              password,
              callbackUrl: `${
                process.env.NEXTAUTH_URL ?? "http://localhost:3000"
              }/unread`,
            })
          )}
        >
          <Input
            placeholder={"Username"}
            type={"text"}
            register={register}
            id={"username"}
          />
          <Input
            placeholder={"Password"}
            type={"password"}
            register={register}
            id={"password"}
          />
          <Button fullWidth={true} size={"large"} type={"submit"}>
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
