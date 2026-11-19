import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { lovable } from "@/integrations/lovable-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LOCALE = "en";
const GOOGLE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.930-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.950 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>';

export function AuthControls({ initialError }: { initialError?: string | undefined }) {
  const router = useRouter();
  const { data: session } = lovable.auth.useSession();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(initialError ?? null);

  const base = { callbackURL: "/", errorCallbackURL: "/", locale: LOCALE };
  const after = async (p: Promise<{ error?: { message?: string } | null } | void>) => {
    const res = await p;
    if (res && res.error) setError("Sign-in didn't complete. " + (res.error.message ?? ""));
    else router.invalidate();
  };
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (session?.user) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="text-foreground">{session.user.email ?? session.user.name ?? "Signed in"}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const { error: e } = lovable.auth.openAccount({ locale: LOCALE });
            setError(e?.message ?? null);
          }}
        >
          Manage account
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => void after(lovable.auth.signOut({ callbackURL: "/" }))}
        >
          Sign out
        </Button>
        {error && <p className="w-full text-destructive">{error}</p>}
      </div>
    );
  }


  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Button
        variant="outline"
        className="border-[#747775] bg-white text-[#1F1F1F] hover:bg-white/90"
        onClick={() => void after(lovable.auth.signIn({ ...base, loginMethod: "google" }))}
      >
        <span aria-hidden="true" className="size-[18px]" dangerouslySetInnerHTML={{ __html: GOOGLE_SVG }} />
        Continue with Google
      </Button>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (validEmail) void after(lovable.auth.signIn({ ...base, loginMethod: "email", loginHint: email }));
        }}
      >
        <Input type="email" placeholder="you@example.com" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={!validEmail}>Sign in</Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            disabled={!validEmail}
            onClick={() => void after(lovable.auth.signUp({ ...base, loginMethod: "email", loginHint: email }))}
          >
            Sign up
          </Button>
        </div>
      </form>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
