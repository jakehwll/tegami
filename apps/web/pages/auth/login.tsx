import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Alert, Button, Card, Container, Input, Typography } from "ui";
import * as z from "zod";

const LoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();
  const { error } = router.query;

  return (
    <Container>
      <Typography>Login</Typography>
      {error === "CredentialsSignin" && (
        <Alert>The username or password you have entered is invalid.</Alert>
      )}
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
            errors={errors}
            id={"username"}
          />
          <Input
            placeholder={"Password"}
            type={"password"}
            register={register}
            errors={errors}
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
