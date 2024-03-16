import { connect } from "@/Database/Mongo.config";
import NextAuth, { AuthOptions, ISODateString, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User as UserModel } from "@/Models/UserSchema";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  role?: string | null;
  avtar?: string | null;
};

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          type: "email",
          placeholder: "Please Enter Email",
          label: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        connect();
        const user = await UserModel.findOne({ email: credentials?.email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        connect();
        const findUser = await UserModel.findOne({ email: user.email });
        if (findUser) {
          return true;
        }
        await UserModel.create({
          name: user.name,
          email: user.email,
          role: "User",
        });
        return true;
      } catch (error) {
        console.log("Something went wrong", error);
        return false;
      }
    },
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        user.role = user?.role == null ? "User" : user?.role;
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
};

export default NextAuth(authOptions);
