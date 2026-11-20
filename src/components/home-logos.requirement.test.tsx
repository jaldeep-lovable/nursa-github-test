// @vitest-environment jsdom
import { createElement } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: { component: () => unknown }) => ({
    options,
    useSearch: () => ({}),
  }),
}));
vi.mock("@/components/AuthControls", () => ({ AuthControls: () => null }));

import { Route } from "../routes/index";

afterEach(cleanup);

describe("The home page shows Lovable beside Nursa", () => {
  it("A visitor sees both logos together above the existing page content", () => {
    render(createElement(Route.options.component as () => React.ReactNode));
    const nursa = screen.getByRole("img", { name: "Nursa logo" });
    const lovable = screen.getByRole("img", { name: "Lovable logo" });
    expect(lovable.parentElement).toBe(nursa.parentElement);
    expect(nursa.nextElementSibling).toBe(lovable);
    expect(screen.getByRole("heading", { name: "Github test" })).toBeTruthy();
    expect(screen.getByText("This is a github project to test protected branches and CI checks in github")).toBeTruthy();
  });
});