import database from "./utils/database";
import { verify } from "argon2";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, User } from "next-auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const account = await database.account.findFirst({
          where: {
            username: credentials?.username,
          },
        });

        if (
          account &&
          (await verify(account.password, credentials?.password ?? ""))
        ) {
          const user: User = {
            id: account.id.toString(),
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
