import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "api/trpc";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Card, Container, Input, Typography } from "ui";
import * as z from "zod";

const RegisterSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

const Register = () => {
  const router = useRouter();
  const registerMutation = trpc.auth.register.useMutation();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  return (
    <Container>
      <Typography>Register</Typography>
      <Card>
        <form
          onSubmit={handleSubmit(
            async ({ username, password, confirmPassword }) => {
              if (password !== confirmPassword) return;
              const result = await registerMutation.mutateAsync({
                username,
                password,
              });
              if (result.status === 201) router.push("/auth/login");
            }
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
          <Input
            placeholder={"Confirm Password"}
            type={"password"}
            register={register}
            id={"confirmPassword"}
          />
          <Button size={"large"} type={"submit"}>
            Register
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
