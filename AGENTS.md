<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
- Sign-in uses Lovable Auth (managed_oidc); root beforeLoad loads the session and wraps the app in AuthSessionProvider. Why: one auth source for SSR and client.
- Sign-in controls live in src/components/AuthControls.tsx and show only enabled methods (Google, email). Why: hosted pages own codes/passwords.
- Vitest uses a separate React configuration without route transforms. Why: page requirements render the actual page synchronously.
<!-- AGENT-MEMORY:END -->
