import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_AUTHENTICATE_USER } from 'graphql/mutations/auth';
import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email or username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const { login } = await gqlClient.request(
            GQL_MUTATION_AUTHENTICATE_USER,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );
          const { jwt, user } = login;
          const { id, email, username } = user;

          if (!jwt || !id || !username || !email) {
            return null;
          }

          return {
            jwt,
            id,
            name: username,
            email,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      const isSignIn = !!user;
      const actualDate = Math.floor(Date.now() / 1000); // actual date on seconds
      const tokenExpiration = Math.floor(7 * 24 * 60 * 60); // 7 days

      if (isSignIn) {
        if (!user || !user.jwt || !user.name || !user.email) {
          return Promise.resolve({});
        }
        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.expiration = Math.floor(actualDate + tokenExpiration);
      } else {
        if (!token?.expiration) return Promise.resolve({});

        if (actualDate > token.expiration) return Promise.resolve({});
        console.log('usuario logado', token);
      }

      return Promise.resolve(token);
    },
    async session({ token, session }) {
      if (
        !token?.jwt ||
        !token?.id ||
        !token?.name ||
        !token.email ||
        !token?.expiration
      ) {
        return null;
      }
      session.accessToken = token.jwt as string;
      session.user = {
        id: token.id as string,
        name: token.name,
        email: token.email,
      };
      return { ...session };
    },
  },
});
