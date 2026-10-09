# GitHub Open PRs Dashboard

## Goal
A new page in the app that lists every open pull request across the GitHub repositories your connected GitHub account can see, so you can review them in one place.

## What you will see
- A big "GITHUB" title at the top of the page.
- A header with the Nursa logo, page title, total open PR count and a Refresh button.
- Filter bar: search by title, filter by repository, author, and status (draft / ready / review requested).
- A table of PRs: repository, title (links to GitHub), author with avatar, branch (head -> base), CI check status, review status, age, and labels.
- Empty and error states (e.g. "GitHub not connected" with a connect prompt).

## How it connects to GitHub
- Use the existing GitHub connector, linked to this project, so the app reads PRs with your (the builder's) GitHub account. No sign-in is needed for viewers.
- All GitHub calls happen on the server, so the connection key never reaches the browser.
- Data is cached for about 60 seconds; the Refresh button forces a reload.
