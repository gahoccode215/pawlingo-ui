
"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserProfile = {
    id: string;
    email: string;
    goal: string | null;
    authProvider: string;
    createdAt: string;
};

type ProfileResponse = {
    success: boolean;
    data: UserProfile | null;
    error: {
        code: string;
        message: string;
    } | null;
};

const LOGIN_URL =
    "/login?callbackUrl=%2Fmy-profile";

export default function ProfilePage() {
    const router = useRouter();

    const [profile, setProfile] =
        useState<UserProfile | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(
        null
    );

    useEffect(() => {
        let cancelled = false;

        async function loadProfile() {
            try {
                setLoading(true);
                setError(null);

                // Quan trọng:
                // Gọi endpoint session của Auth.js trước.
                // Nếu access token sắp hết hạn, Auth.js
                // sẽ refresh và có cơ hội cập nhật cookie.
                const session = await getSession();

                if (cancelled) return;

                if (!session) {
                    router.replace(LOGIN_URL);
                    return;
                }

                if (
                    session.error === "RefreshTokenError" ||
                    !session.accessToken
                ) {
                    router.replace(
                        `${LOGIN_URL}&reason=session_expired`
                    );
                    return;
                }

                // Sau khi session được làm mới,
                // mới gọi API Profile.
                const response = await fetch("/api/profile", {
                    method: "GET",
                    cache: "no-store",
                });

                if (cancelled) return;

                if (response.status === 401) {
                    setError(
                        "Backend từ chối phiên đăng nhập. " +
                        "Hãy kiểm tra log refresh token."
                    );
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        `Profile request failed: ${response.status}`
                    );
                }

                const result: ProfileResponse =
                    await response.json();

                if (!result.success || !result.data) {
                    throw new Error(
                        result.error?.message ??
                        "Không thể tải hồ sơ."
                    );
                }

                if (!cancelled) {
                    setProfile(result.data);
                }
            } catch (error) {
                console.error(
                    "[PROFILE] Load failed:",
                    error
                );

                if (!cancelled) {
                    setError(
                        "Không thể tải thông tin người dùng."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void loadProfile();

        return () => {
            cancelled = true;
        };
    }, [router]);

    if (loading) {
        return (
            <main className="mx-auto max-w-2xl p-8">
                <p>Đang tải thông tin người dùng...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-2xl p-8">
                <h1 className="text-3xl font-semibold">
                    My Profile
                </h1>

                <p
                    role="alert"
                    className="mt-4 text-red-600"
                >
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-lg border px-4 py-2"
                >
                    Thử lại
                </button>
            </main>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <main className="mx-auto max-w-2xl p-8">
            <h1 className="text-3xl font-semibold">
                My Profile
            </h1>

            <div
                role="status"
                className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
            >
                Đăng nhập thành công!
                Spring Boot đã xác thực access token.
            </div>

            <div className="mt-6 space-y-4 rounded-xl border p-6">
                <div>
                    <p className="text-sm text-gray-500">
                        User ID
                    </p>
                    <p className="break-all">
                        {profile.id}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Email
                    </p>
                    <p>{profile.email}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Learning Goal
                    </p>
                    <p>
                        {profile.goal ?? "Chưa thiết lập"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Authentication Provider
                    </p>
                    <p>{profile.authProvider}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Created At
                    </p>
                    <p>
                        {new Date(
                            profile.createdAt
                        ).toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                        })}
                    </p>
                </div>
            </div>
        </main>
    );
}
