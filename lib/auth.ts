import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin";


export const authOptions = {  
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      issuer: "https://www.linkedin.com/oauth",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      authorization: {
        params: {
          scope: "openid profile email w_member_social",
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
      },
    }),

  ],
  callbacks: {
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        session.data = user
        return session
      }
    }
}
