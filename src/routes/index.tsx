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
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Github test
      </h1>
    </main>
  );
}
