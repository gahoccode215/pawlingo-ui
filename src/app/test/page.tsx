"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function TestPage() {
    const { data: session, status } = useSession();

    console.log("Check session >> ", session);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        NextAuth Testing
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Kiểm tra Google OAuth và Session
                    </p>
                </div>

                {/* Session Status */}
                <div className="rounded-lg bg-gray-100 p-4">
                    <p className="text-sm font-medium text-gray-600">
                        Authentication Status
                    </p>

                    <p className="mt-2 font-semibold text-gray-900">
                        {status === "loading"
                            ? "⏳ Đang kiểm tra..."
                            : status === "authenticated"
                                ? "✅ Đã đăng nhập"
                                : "❌ Chưa đăng nhập"}
                    </p>
                </div>

                {/* Session Information */}
                {session && (
                    <div className="space-y-2 rounded-lg border border-gray-200 p-4">
                        <h2 className="font-semibold text-gray-900">
                            Session Information
                        </h2>

                        <p className="text-sm text-gray-600">
                            <strong>Name:</strong> {session.user?.name ?? "N/A"}
                        </p>

                        <p className="text-sm text-gray-600">
                            <strong>Email:</strong> {session.user?.email ?? "N/A"}
                        </p>

                        <p className="text-sm text-gray-600">
                            <strong>Expires:</strong> {session.expires}
                        </p>
                    </div>
                )}

                {/* Google Login */}
                <button
                    onClick={() => signIn("google")}
                    disabled={status === "loading"}
                    className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {status === "loading"
                        ? "Đang tải..."
                        : status === "authenticated"
                            ? "Đăng nhập lại bằng Google"
                            : "Continue with Google"}
                </button>

                {/* Raw Session */}
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                        Raw Session Data
                    </p>

                    <pre className="max-h-60 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-green-400">
                        {JSON.stringify(session, null, 2) ?? "null"}
                    </pre>
                </div>
                <div>
                    <p onClick={() => {
                        signOut();
                    }}>Logout</p>
                </div>
                <div>
                    <p onClick={() => {
                        signIn();
                    }}>Login</p>
                </div>
            </div>
        </main>
    );
}