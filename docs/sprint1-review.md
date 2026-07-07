# Sprint 1 – Review

## Stories delivered
- US-1: Create task ✅
- US-2: View all tasks ✅
- US-3: Update task status ✅

## Demo (sample requests)

```bash
# Create a task
curl -X POST localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write backlog","description":"Draft user stories"}'
# -> 201 { id: 1, title: "Write backlog", status: "todo", ... }

# List tasks
curl localhost:3000/tasks
# -> 200 [ { id: 1, title: "Write backlog", status: "todo", ... } ]

# Update status
curl -X PATCH localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"in-progress"}'
# -> 200 { id: 1, status: "in-progress", ... }
```

## CI/CD evidence
- GitHub Actions workflow `.github/workflows/ci.yml` runs on every push/PR:
  installs dependencies, then runs `npm test`.
- All 5 tests pass locally (see `tests/tasks.sprint1.test.js`), matching what CI would report.

## Definition of Done check
| Item | Status |
|------|--------|
| Code committed incrementally | ✅ (4 separate commits) |
| Tests written and passing | ✅ 5/5 |
| CI pipeline configured | ✅ |
| Acceptance criteria met | ✅ |

## Sprint Retrospective

**What went well**
- Small, focused commits made progress easy to track.
- Writing acceptance criteria before coding made testing straightforward.

**What went wrong**
- No input validation on the `description` field (accepts anything, even wrong types).
- No logging — hard to trace what happened after a request without breakpoints.

**Improvements to carry into Sprint 2**
1. Add basic request logging so behavior in "production" is traceable.
2. Add a health check endpoint so uptime/monitoring is possible, and tighten input validation.
