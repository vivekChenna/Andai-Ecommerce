import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { GraphQLClient } from "graphql-request";


const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
  {
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
    },
  }
);

const authOptions = {
  providers: [
    // ✅ Google Authentication Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        return {
          id: profile?.sub,
          name: profile?.name,
          firstname: profile?.given_name, // Firstname from Google
          lastname: profile?.family_name, // Lastname from Google
          email: profile?.email,
          image: profile?.picture, // Profile picture from Google
        };
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: { params: { scope: "profile email openid" } },
      issuer: "https://www.linkedin.com/oauth",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        console.log("profile", profile);

        return {
          id: profile?.sub,
          name: profile?.name,
          firstname: profile?.given_name,
          lastname: profile?.family_name,
          email: profile?.email,
          image: profile?.picture,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "linkedin") {
        console.log("i came here once");

        console.log("user", user);

        const { email, name, image } = user;

        const query = `query GetUserDetails($email : String!){
        user(where : { email : {_eq : $email} }){
        id
        email
        profile_picture
        }
        }`;
        const existingUser = await graphQLClient.request(query, {
          email,
        });

        console.log("existing user", existingUser);

        if (existingUser?.user?.length === 0) {
          const addUserMutation = `mutation AddUser($email : String! , $name : String! , $profile_picture : String){
            insert_user_one(object : { email : $email , name : $name , profile_picture : $profile_picture }){
            id
            email
            profile_picture
            }
            }`;

          const newUser = await graphQLClient.request(addUserMutation, {
            email,
            name,
            profile_picture: image,
          });

          user.id = newUser?.insert_user_one?.id;
          user.email = newUser?.insert_user_one?.email;
          user.profile_picture = newUser?.insert_user_one?.profile_picture;
        } else {
          user.id = existingUser?.user[0]?.id;
          user.email = existingUser?.user[0]?.email;
          user.profile_picture = existingUser?.user[0]?.profile_picture;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.profile_picture = user.profile_picture;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.profile_picture = token.profile_picture;
      return session;
    },
  },

  pages: { signIn: "/auth/login", error: "/auth/login" },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
