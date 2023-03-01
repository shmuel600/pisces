import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log(process.env.GOOGLE_ID);
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    theme: {
        colorScheme: "light",
    },
    // callbacks: {
    //     async jwt({ token }) {
    //         token.userRole = "settings";
    //         return token;
    //     },
    // },
})