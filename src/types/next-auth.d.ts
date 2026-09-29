import NextAuth from "next-auth";
import { JWT } from "next-auth";


declare module "next-auth/jwt" {

    interface JWT {
        accessToken: string;
        refreshToken: string;
        user: IUser;
    }


}

declare module "next-auth" {

    interface Session {
        accessToken: string;
        refreshToken: string;
        user: IUser & DefaultSession["user"];
    }

}

