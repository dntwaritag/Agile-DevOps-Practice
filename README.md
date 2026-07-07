# TaskFlow API

A small task management REST API built for the "Agile & DevOps in Practice"
individual assessment. It demonstrates Agile planning (backlog, sprints,
retrospectives) and DevOps practice (version control, CI pipeline, automated
tests, logging, health check) applied to a real, working prototype.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /tasks | Create a task |
| GET | /tasks | List all tasks (optional `?status=` filter) |
| PATCH | /tasks/:id | Update a task's status |
| DELETE | /tasks/:id | Delete a task |
| GET | /health | Health check (uptime) |

## Run locally

```bash
npm install
npm start        # starts the API on port 3000
npm test         # runs the full test suite
```

## Project docs
- `docs/backlog.md` – Sprint 0 planning: vision, backlog, estimates, DoD
- `docs/sprint1-review.md` – Sprint 1 review + retrospective
- `docs/sprint2-review.md` – Sprint 2 review + retrospective
- `.github/workflows/ci.yml` – CI pipeline (install → test on every push/PR)

## Commit history
Run `git log --oneline` to see incremental, story-by-story delivery across
both sprints (no "big-bang" commits).
