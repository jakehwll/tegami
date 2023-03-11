import { verify } from "argon2"
import { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import database from "./utils/database"

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
        })

        if (
          account &&
          (await verify(account.password, credentials?.password ?? ""))
        ) {
          const user: User = {
            id: account.id ?? "asdf",
          }
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user)
        token.user = {
          id: typeof user.id === "string" ? parseInt(user.id) : user.id,
        }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.user.id,
      }
      return session
    },
  },
}
