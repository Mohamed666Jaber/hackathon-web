import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "42school",
      name: "42 School",
      type: "oauth",
      clientId: process.env.NEXT_PUBLIC_42_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_42_CLIENT_SECRET,
      authorization: {
        url: "https://api.intra.42.fr/oauth/authorize",
        params: {
          scope: "public",
        },
      },
      token: "https://api.intra.42.fr/oauth/token",
      userinfo: "https://api.intra.42.fr/v2/me",
      profile(profile: any) {
        return {
          id: profile.id.toString(),
          name: profile.usual_full_name || profile.first_name,
          email: profile.email,
          image: profile.image?.link,
          login: profile.login,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token
        token.login = profile?.login
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.login = token.login
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
