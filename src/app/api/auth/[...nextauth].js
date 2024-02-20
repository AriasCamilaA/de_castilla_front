const NextAuth = require("next-auth");
const Providers = require("next-auth/providers");

module.exports = NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const res = await fetch("http://localhost:8000/castilla/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();

        if (res.ok) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: "secret-token",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});
