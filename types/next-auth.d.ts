import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      login?: string
    } & DefaultSession["user"]
    accessToken?: string
  }

  interface User {
    login?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    login?: string
    accessToken?: string
  }
}
