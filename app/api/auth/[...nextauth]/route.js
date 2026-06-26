

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import connect from "@/db/connectdb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({

  providers: [

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),

     Credentials({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: {},
      email:{},
      password: {}
    },

    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      await connect()

  const user = await User.findOne({
    email: credentials.email
  })

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password
  )

  if (!isPasswordValid) {
    return null
  }

  console.log("AUTHORIZE USER:", {
  id: user._id.toString(),
  name: user.name,
  email: user.email
});

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email
  }
    }
  })

  ],

  callbacks: {

     async jwt({ token, user }) {

        console.log("JWT USER:", user);
  console.log("JWT TOKEN BEFORE:", token);


    if (user) {
      token.id = user.id
      token.retailerId = user.retailerId ?? null
    }

      console.log("JWT TOKEN AFTER:", token);

    return token
  },

  async session({ session, token }) {
      console.log("SESSION TOKEN:", token);


    session.user.id = token.id
    session.user.retailerId = token.retailerId ?? null

      console.log("FINAL SESSION:", session);
    return session
  },


    async signIn({ user, account }) {

      try {
        await connect();

        const existingUser =
          await User.findOne({
            email: user.email,
          });

        if (!existingUser) {

           const newUser = await User.create({
               name: user.name,
               email: user.email,
             });
         
        }
        
        return true;

      } catch (error) {

        console.error("ERROR OCCURRED:", error)

        return false
      }
    }

  }

})

export { handler as GET, handler as POST }