import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Github test
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        This is a github project to test protected branches and CI checks in github
      </p>
    </main>
  );
}
