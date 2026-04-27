import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      id: "guest",
      name: "Guest",
      credentials: {},
      async authorize() {
        return {
          id: "guest",
          email: "guest@test.com",
          type: "guest",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token }) {
      token.id = "guest";
      token.type = "guest";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.type = token.type as "guest";
      }
      return session;
    },
  },
});
