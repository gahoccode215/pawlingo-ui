import Link from "next/link";


export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>GUEST LAYOUT - HEADER</h1>

            <Link href="/register">
                Register
            </Link>

            <Link href="/login">
                login
            </Link>

            <hr />

            {children}

            <hr />

            <h1>GUEST LAYOUT - FOOTER</h1>
        </div>
    );
}