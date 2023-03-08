import { verify } from "argon2";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import database from "../../../utils/database";

export const authOptions = {
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
            username: credentials?.username
          }
        })

        if ( account && await verify(account.password, credentials?.password ?? '') ) {
          const user: User = {
            id: account.id.toString(),
          };
          return user;
        } else {
          return null
        }
      }
    }),
  ],
};

export default NextAuth(authOptions);
