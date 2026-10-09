import { describe, expect, it } from "vitest";
import { mapCheckState, mapReviewState } from "./pr-status";

describe("mapCheckState", () => {
  it("is none with no runs", () => expect(mapCheckState([])).toBe("none"));
  it("is failing if any run failed", () =>
    expect(
      mapCheckState([
        { status: "completed", conclusion: "success" },
        { status: "completed", conclusion: "failure" },
      ]),
    ).toBe("failing"));
  it("is pending while a run is in progress", () =>
    expect(mapCheckState([{ status: "in_progress", conclusion: null }])).toBe("pending"));
  it("is passing when all succeed", () =>
    expect(mapCheckState([{ status: "completed", conclusion: "success" }])).toBe("passing"));
});

describe("mapReviewState", () => {
  it("latest review per user wins", () =>
    expect(
      mapReviewState(
        [
          { user: "a", state: "CHANGES_REQUESTED" },
          { user: "a", state: "APPROVED" },
        ],
        0,
      ),
    ).toBe("approved"));
  it("changes requested beats approval", () =>
    expect(
      mapReviewState(
        [
          { user: "a", state: "APPROVED" },
          { user: "b", state: "CHANGES_REQUESTED" },
        ],
        0,
      ),
    ).toBe("changes_requested"));
  it("review requested when reviewers pending", () =>
    expect(mapReviewState([], 1)).toBe("review_requested"));
});
