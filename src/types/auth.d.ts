// src/types/auth.d.ts

export { };

declare global {
    interface IUser {
        id: string;
        fullName: string;
        email: string;
        role: string;
        createdAt: string;
    }

    interface ILoginResponse {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        user: IUser;
    }

    interface ILoginRequest {
        email: string;
        password: string;
    }
}