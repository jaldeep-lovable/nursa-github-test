import { createFileRoute } from "@tanstack/react-router";
import nursaLogo from "@/assets/nursa-logo.png";
import { AuthControls } from "@/components/AuthControls";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { error?: string; error_description?: string } => ({
    ...(typeof s["error"] === "string" ? { error: s["error"] } : {}),
    ...(typeof s["error_description"] === "string" ? { error_description: s["error_description"] } : {}),
  }),
  component: Index,
  head: () => ({
    meta: [
      { title: "Github test" },
      { name: "description", content: "Github test - a simple front-end app." },
      { property: "og:title", content: "Github test" },
      {
        property: "og:description",
        content: "Github test - a simple front-end app.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Index() {
  const search = Route.useSearch();
  const initialError = search.error
    ? `Sign-in didn't complete.${search.error_description ? " " + search.error_description : ""}`
    : undefined;
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center">
      <img src={nursaLogo} alt="Nursa logo" className="absolute top-8 left-1/2 h-12 w-auto -translate-x-1/2" />
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Github test
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        This is a github project to test protected branches and CI checks in github
      </p>
      <div className="mt-6 flex w-full justify-center">
        <AuthControls initialError={initialError} />
      </div>
    </main>
  );
}
