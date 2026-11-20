import { createFileRoute } from "@tanstack/react-router";
import nursaLogo from "@/assets/nursa-logo.png";
import lovableLogo from "@/assets/lovable-logo.svg.asset.json";
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
      <div className="absolute top-8 left-1/2 flex w-max max-w-[calc(100%-3rem)] -translate-x-1/2 items-center gap-5 sm:gap-8">
        <img src={nursaLogo} alt="Nursa logo" className="h-12 w-auto min-w-0 object-contain" />
        <img src={lovableLogo.url} alt="Lovable logo" className="h-8 w-auto min-w-0 object-contain sm:h-10" />
      </div>
      <h1 className="text-5xl font-semibold tracking-normal text-foreground">
        Github test
      </h1>
      <p className="max-w-xl text-2xl text-muted-foreground">
        This is a github project to test protected branches and CI checks in github
      </p>
      <div className="mt-6 flex w-full justify-center">
        <AuthControls initialError={initialError} />
      </div>
    </main>
  );
}
