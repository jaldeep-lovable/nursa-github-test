## Steps
1. Link the GitHub connector to this project (connect card in chat).
2. Build the server side that fetches open PRs.
3. Build the dashboard page with table, filters and refresh.
4. Add a link to it from the home page.
5. Verify in the preview against `jaldeep-lovable/nursa-github-test` (PR #1 should appear).

## Open questions
- All repos the account can see, or a fixed list (e.g. only the Nursa repos)?
- Should the page be private (Lovable sign-in for workspace members) or open to anyone with the link?

## Technical details
- Route: `src/routes/prs.tsx` with its own `head()` metadata.
- `src/lib/github.functions.ts`: `createServerFn` `listOpenPrs` calling the connector gateway (`https://connector-gateway.lovable.dev/github/...`) with `LOVABLE_API_KEY` + `GITHUB_API_KEY`, read inside the handler.
- Fetch via GitHub search API `search/issues?q=is:pr+is:open+user:<owner>` (paginated, 100/page); enrich each PR with `pulls/{n}` (draft, branches) and `commits/{sha}/check-runs` (CI state) plus `pulls/{n}/reviews`, run with limited concurrency.
- Optional repo allowlist via Zod-validated input.
- TanStack Query: loader `ensureQueryData`, component `useSuspenseQuery`, `staleTime` 60s, Refresh calls `invalidateQueries`.
- Client-side filtering/sorting; shadcn Table, Badge, Avatar, Select, Input.
- Surface gateway status/body on errors; show a "connect GitHub" state when the key is missing.
- Unit test for the PR status-mapping helper (checks/review -> badge state).
