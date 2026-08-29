"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth/AuthContext";
import { getAuthErrorMessage } from "@/lib/auth/errors";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// Google Identity Services is a page-global singleton — calling initialize()
// again on every mount (e.g. navigating /login -> /register, each rendering
// a fresh GoogleSignInButton) triggers its "called multiple times" console
// warning. We initialize it exactly once per page load and instead route
// the credential callback through a module-level dispatcher that always
// points at whichever GoogleSignInButton instance is currently mounted, so
// error handling still lands on the right page after navigating.
let isGoogleInitialized = false;
let handleCurrentCredential: ((response: GoogleCredentialResponse) => void) | null = null;

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
        router.push("/home");
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

  // Keep the dispatcher pointed at this instance's handler on every render
  // where it changes, so a credential response always reaches whichever
  // GoogleSignInButton is currently on screen.
  useEffect(() => {
    handleCurrentCredential = handleCredential;
    return () => {
      if (handleCurrentCredential === handleCredential) handleCurrentCredential = null;
    };
  }, [handleCredential]);

  useEffect(() => {
    if (!isScriptReady || !GOOGLE_CLIENT_ID || !buttonRef.current || !window.google) return;

    if (!isGoogleInitialized) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => handleCurrentCredential?.(response),
      });
      isGoogleInitialized = true;
    }
    window.google.accounts.id.renderButton(buttonRef.current, {
      type: "standard",
      // Always the light "outline" style — Google's "filled_black" dark
      // variant reads as an oversized black block next to our own dark
      // surface color, so we keep the button visually consistent instead
      // of following the app's theme.
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
