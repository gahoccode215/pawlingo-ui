"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth/AuthContext";
import { getAuthErrorMessage } from "@/lib/auth/errors";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

interface GoogleCredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export default function GoogleSignInButton() {
  const router = useRouter();
  const { loginWithGoogleIdToken } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredential = useCallback(
    async (response: GoogleCredentialResponse) => {
      setError(null);
      try {
        await loginWithGoogleIdToken(response.credential);
        router.push("/learn");
      } catch (err) {
        setError(
          err instanceof ApiError
            ? getAuthErrorMessage(err.code)
            : getAuthErrorMessage("INTERNAL_ERROR"),
        );
      }
    },
    [loginWithGoogleIdToken, router],
  );

  useEffect(() => {
    if (!isScriptReady || !GOOGLE_CLIENT_ID || !buttonRef.current || !window.google) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredential,
    });
    window.google.accounts.id.renderButton(buttonRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      width: 320,
    });
  }, [isScriptReady, handleCredential]);

  // No client ID configured (e.g. local dev before the backend team hands
  // one over) — hide the button rather than rendering a broken one.
  if (!GOOGLE_CLIENT_ID) return null;

  return (
    <div>
      <Script
        src="https://accounts.google.com/gsi/client?hl=vi"
        strategy="afterInteractive"
        onReady={() => setIsScriptReady(true)}
      />
      <div ref={buttonRef} className="flex justify-center" />
      {error && <p className="mt-3 text-center text-xs text-red-600">{error}</p>}
    </div>
  );
}
