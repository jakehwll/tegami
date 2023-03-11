import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
    }
  }
  interface User {
    id: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number
    }
  }
}
