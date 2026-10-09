# GitHub Open PRs Dashboard

## Goal
A new page in the app that lists every open pull request across the GitHub repositories your connected GitHub account can see, so you can review them in one place.

## What you will see

### Header
- The Nursa logo at the top left, linking back to the home page.
- Page title "Open pull requests" with a count next to it (e.g. "· 12") that updates as you filter.
- A small "Last updated 2 min ago" note so you know how fresh the list is.
- A Refresh button at the top right. While it reloads it shows a spinner and is disabled.

### Summary strip
- Four small cards above the table: Total open, Drafts, Waiting for review, Failing checks.
- Clicking a card applies that filter to the table.

### Filter bar
- Search box that matches PR titles and numbers as you type.
- Repository dropdown listing every repo that has open PRs, with a count per repo.
- Author dropdown with avatars.
- Status chips: Draft, Ready, Review requested, Approved, Changes requested, Checks failing. Several can be on at once.
- A "Clear filters" link that appears once any filter is set.
- Filters are kept in the page address, so a filtered view can be shared or bookmarked.

### PR table
- Columns: Repository, Title (#number, opens the PR on GitHub in a new tab), Author (avatar + name), Branch (head -> base), Checks, Review, Age, Labels.
- Checks: green tick = passing, red cross = failing, yellow dot = running, grey dash = no checks.
- Review: Approved, Changes requested, Review requested, or "No review".
- Draft PRs are shown in muted text with a "Draft" tag.
- Age shows "3d", "5h" etc.; hovering shows the exact date and time opened.
- Labels appear as small coloured tags matching their GitHub colours, with "+2" when there are more than three.
- Click column headers to sort (default: newest first). PRs older than 14 days get a subtle "stale" marker.

### Loading, empty and error states
- While loading: grey placeholder rows in the table.
- No open PRs: a friendly "All clear — no open pull requests" message.
- No matches for filters: "No PRs match these filters" with a Clear filters button.
- GitHub not connected or access expired: a message explaining it, with a button to reconnect.
- GitHub rate limit or outage: a message with the reason from GitHub and a Try again button.

### On phones
- The table turns into stacked cards (title, repo, author, checks and review badges), and filters collapse into a "Filters" button.

## How it connects to GitHub
- Use the existing GitHub connector, linked to this project, so the app reads PRs with your (the builder's) GitHub account. No sign-in is needed for viewers.
- All GitHub calls happen on the server, so the connection key never reaches the browser.
- Data is cached for about 60 seconds; the Refresh button forces a reload.
