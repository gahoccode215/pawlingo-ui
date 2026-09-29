"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const googleSignInAvailable = Boolean(GOOGLE_CLIENT_ID);

type GoogleCredentialResponse = {
  credential: string;
};

type GoogleSignInButtonProps = {
  callbackUrl: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>
          ) => void;
        };
      };
    };
  }
}

let googleInitialized = false;
let currentCredentialHandler:
  | ((response: GoogleCredentialResponse) => void)
  | null = null;

export default function GoogleSignInButton({
  callbackUrl,
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredential = useCallback(
    async (response: GoogleCredentialResponse) => {
      if (submittingRef.current) {
        return;
      }

      submittingRef.current = true;
      setError(null);
      setIsSubmitting(true);

      try {
        const result = await signIn("backend-google", {
          idToken: response.credential,
          redirect: false,
          redirectTo: callbackUrl,
        });

        if (!result || result.error || !result.ok) {
          setError(
            "Không thể đăng nhập bằng Google. Vui lòng thử lại."
          );
          return;
        }

        router.replace(callbackUrl);
        router.refresh();
      } catch {
        setError(
          "Không thể kết nối đến Google. Vui lòng thử lại sau."
        );
      } finally {
        submittingRef.current = false;
        setIsSubmitting(false);
      }
    },
    [callbackUrl, router]
  );

  useEffect(() => {
    currentCredentialHandler = handleCredential;

    return () => {
      if (currentCredentialHandler === handleCredential) {
        currentCredentialHandler = null;
      }
    };
  }, [handleCredential]);

  useEffect(() => {
    if (
      !scriptReady ||
      !GOOGLE_CLIENT_ID ||
      !buttonRef.current ||
      !window.google
    ) {
      return;
    }

    if (!googleInitialized) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) =>
          currentCredentialHandler?.(response),
      });
      googleInitialized = true;
    }

    const buttonElement = buttonRef.current;
    let renderedWidth = 0;

    const renderButton = () => {
      const width = Math.min(
        400,
        Math.floor(buttonElement.clientWidth)
      );

      if (!width || width === renderedWidth) {
        return;
      }

      renderedWidth = width;
      buttonElement.replaceChildren();
      window.google?.accounts.id.renderButton(buttonElement, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "continue_with",
        locale: "vi",
        width,
      });
    };

    renderButton();

    const resizeObserver = new ResizeObserver(renderButton);
    resizeObserver.observe(buttonElement);

    return () => resizeObserver.disconnect();
  }, [scriptReady]);

  if (!GOOGLE_CLIENT_ID) {
    return null;
  }

  return (
    <div>
      <Script
        src="https://accounts.google.com/gsi/client?hl=vi"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div
        ref={buttonRef}
        className={`flex min-h-10 justify-center ${
          isSubmitting ? "pointer-events-none opacity-60" : ""
        }`}
        aria-busy={isSubmitting}
      />
      {isSubmitting && (
        <p role="status" className="mt-2 text-center text-[13px] text-muted">
          Đang đăng nhập với Google...
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-[10px] bg-red-50 px-3 py-2.5 text-center text-[13px] leading-5 text-red-800 dark:bg-red-950/60 dark:text-red-200"
        >
          {error}
        </p>
      )}
    </div>
  );
}
