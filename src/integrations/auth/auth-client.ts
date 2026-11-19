// Created by the Lovable Auth integration. Edit to tune SDK options; it is
// only re-created when deleted.
import { newAuthClient, type AuthClient } from "@lovable.dev/lovable-auth-js";

import { AUTH_SETUP } from "@/integrations/auth/setup";

const client = newAuthClient({
  setup: AUTH_SETUP,
  rpInitiatedLogout: true,
});

export const authClient: AuthClient = {
  ...client,
  signIn: (options) => client.signIn({ prompt: "login", ...options }),
};
