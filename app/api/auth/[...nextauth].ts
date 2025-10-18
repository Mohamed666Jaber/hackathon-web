import NextAuth from "next-auth"
import FortyTwoProvider from "next-auth/providers/42-school"
export const authOptions = {
  providers: [
    FortyTwoProvider({
        clientId: process.env.FORTY_TWO_CLIENT_ID || "",
        clientSecret: process.env.FORTY_TWO_CLIENT_SECRET || "",
        authorization: "https://api.intra.42.fr/oauth/authorize",
        accessTokenUrl: "https://api.intra.42.fr/oauth/token"
  })
  ],
}
export default NextAuth(authOptions)