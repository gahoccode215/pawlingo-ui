interface AuthFormSkeletonProps {
  /** Register's form is taller (name row + terms checkbox) than Login's. */
  extraRows?: boolean;
}

export default function AuthFormSkeleton({ extraRows = false }: AuthFormSkeletonProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm animate-pulse">
        <div className="text-center mb-6">
          <div className="h-3 w-32 bg-ink/10 rounded-full mx-auto" />
          <div className="h-8 w-48 bg-ink/10 rounded-full mx-auto mt-3" />
        </div>

        <div className="rounded-3xl border border-ink/10 bg-surface p-6">
          <div className="h-11 w-full bg-ink/5 rounded-full" />
          <div className="h-px w-full bg-ink/10 my-5" />
          {extraRows && <div className="h-11 w-full bg-ink/5 rounded-xl mb-4" />}
          <div className="h-11 w-full bg-ink/5 rounded-xl mb-4" />
          <div className="h-11 w-full bg-ink/5 rounded-xl mb-4" />
          <div className="h-11 w-full bg-ink/15 rounded-full" />
        </div>
      </div>
    </div>
  );
}
