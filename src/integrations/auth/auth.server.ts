// Created by the Lovable Auth integration. Edit to tune SDK options; it is
// only re-created when deleted.
import { createAuthServer, type AuthServer } from "@lovable.dev/lovable-auth-js/server";

import { AUTH_SETUP } from "@/integrations/auth/setup";

let instance: AuthServer | null = null;

export function getAuth(): AuthServer {
  if (!instance) {
    instance = createAuthServer({
      setup: AUTH_SETUP,
      trustRequestOrigin: true,
      errorURL: "/",
    });
  }
  return instance;
}
