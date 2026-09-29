"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        if (loading) return;

        setLoading(true);

        try {
            await signOut({
                callbackUrl: "/login",
                redirect: true,
            });
        } catch (error) {
            console.error("[LOGOUT] Failed:", error);
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="rounded-lg border border-red-200 px-4 py-2
                 text-sm font-medium text-red-600
                 hover:bg-red-50 disabled:opacity-50"
        >
            {loading ? "Đang đăng xuất..." : "Đăng xuất"}
        </button>
    );
}