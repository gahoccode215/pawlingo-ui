
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { sendRequest } from "./utils/api"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Mật khẩu", type: "password" },
            },
            authorize: async (credentials) => {
                const res = await sendRequest<ILoginResponse>({
                    url: "http://localhost:8080/api/v1/auth/login",
                    method: "POST",
                    body: {
                        email: credentials?.email,
                        password: credentials?.password
                    },
                });
                if (res && res.data) {
                    return res.data as any;
                } else {
                    return null
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.AUTH_SECRET,
    // pages: {
    //     signIn: '/login',
    // },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === 'signIn' && account?.provider === "google") {
                const res = await sendRequest<ILoginResponse>({
                    url: "http://localhost:8080/api/v1/auth/google",
                    method: "POST",
                    body: {
                        idToken: account.id_token,
                    },
                });
                if (res.data) {
                    token.accessToken = res.data.accessToken;
                    token.refreshToken = res.data.refreshToken;
                    token.user = res.data.user;
                }
            }
            if (trigger === 'signIn' && account?.provider === "credentials") {
                //@ts-ignore
                token.accessToken = user.accessToken;
                //@ts-ignore
                token.refreshToken = user.refreshToken;
                //@ts-ignore
                token.user = user.user;
            }
            return token;
        },
        session({ session, token, user }) {
            if (token.user) {
                //@ts-ignore
                session.accessToken = token.accessToken;
                //@ts-ignore
                session.refreshToken = token.refreshToken;
                session.user = token.user;
            }
            return session;
        }
    }
})

