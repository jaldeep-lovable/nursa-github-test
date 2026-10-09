export type CheckState = "passing" | "failing" | "pending" | "none";
export type ReviewState = "approved" | "changes_requested" | "review_requested" | "none";

export function mapCheckState(runs: { status: string; conclusion: string | null }[]): CheckState {
  if (runs.length === 0) return "none";
  const bad = ["failure", "timed_out", "cancelled", "action_required", "startup_failure"];
  if (runs.some((r) => r.conclusion && bad.includes(r.conclusion))) return "failing";
  if (runs.some((r) => r.status !== "completed")) return "pending";
  return "passing";
}

export function mapReviewState(
  reviews: { user: string; state: string }[],
  requestedReviewers: number,
): ReviewState {
  const latest = new Map<string, string>();
  for (const r of reviews) {
    if (r.state === "APPROVED" || r.state === "CHANGES_REQUESTED") latest.set(r.user, r.state);
  }
  const states = [...latest.values()];
  if (states.includes("CHANGES_REQUESTED")) return "changes_requested";
  if (states.includes("APPROVED")) return "approved";
  if (requestedReviewers > 0) return "review_requested";
  return "none";
}
