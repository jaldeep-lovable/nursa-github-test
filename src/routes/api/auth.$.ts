import { createFileRoute } from "@tanstack/react-router";

async function handle(request: Request) {
  const { lovable } = await import("@/integrations/lovable.server");
  const routes = lovable.auth.routes();
  const handler = request.method === "GET" ? routes.server.handlers.GET : routes.server.handlers.POST;
  return handler({ request });
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => handle(request),
      POST: ({ request }) => handle(request),
    },
  },
});
