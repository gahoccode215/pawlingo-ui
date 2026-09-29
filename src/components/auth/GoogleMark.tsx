type GoogleMarkProps = {
  className?: string;
};

export function GoogleMark({ className = "size-5" }: GoogleMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.86-3A7.18 7.18 0 0 1 12 19.24a7 7 0 0 1-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.63H1.29A12 12 0 0 0 0 12c0 1.92.47 3.74 1.29 5.37l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.76c1.76 0 3.33.61 4.57 1.8L20 3.13A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.29 6.63l3.98 3.09A7 7 0 0 1 12 4.76Z"
      />
    </svg>
  );
}
