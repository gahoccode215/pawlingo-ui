import { backendFetch } from "@/lib/api/backend";

export default async function ProfilePage() {
    const response = await backendFetch("/api/v1/auth/me");

    if (!response.ok) {
        return (
            <div>
                <h1>Profile</h1>
                <p>Không thể lấy thông tin người dùng.</p>
            </div>
        );
    }

    const result = await response.json();

    return (
        <div>
            <h1>Profile</h1>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
    );
}
