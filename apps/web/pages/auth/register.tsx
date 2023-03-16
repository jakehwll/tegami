import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "api/trpc";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Card, Container, Input, Typography } from "ui";
import * as z from "zod";

const RegisterSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const router = useRouter();
  const registerMutation = trpc.auth.register.useMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  return (
    <Container>
      <Typography>Register</Typography>
      <Card>
        <form
          onSubmit={handleSubmit(async ({ username, password }) => {
            const result = await registerMutation.mutateAsync({
              username,
              password,
            });
            if (result.status === 201) router.push("/auth/login");
          })}
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
          <Input
            placeholder={"Confirm Password"}
            type={"password"}
            register={register}
            errors={errors}
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
