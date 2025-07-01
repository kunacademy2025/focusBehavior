import { loginSchema } from "@/components/shared/auth/login/login.schema";
import { NEXTAUTH_SECRET } from "@/config";
import { loginUser } from "@/services/api/collections/user/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req: unknown): Promise<never | null> {
        if (credentials == null) return null;
        let response = null;

        const { email, password } = await loginSchema.parseAsync(credentials);

        try {
          response = await loginUser(email, password);

          if (!response?.success) {
            throw new Error("User not found.");
          }

          return response?.data;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  secret: "n9UtjDjCdFuiC4QPtYIR0foak6g38bwppl4FevACf/Y=",
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 1 * 60 * 60,
  },
  jwt: {
    secret: "n9UtjDjCdFuiC4QPtYIR0foak6g38bwppl4FevACf/Y=",
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
