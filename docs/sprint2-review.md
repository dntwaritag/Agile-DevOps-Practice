# Sprint 2 – Review

## Improvements applied from Sprint 1 retro
1. Added request logging middleware every request now logs method, path, status code, and response time.
2. Added a `/health` endpoint and tightened input validation (status filter is now validated too).

## Stories delivered
- US-4: Delete task 
- US-5: Filter tasks by status 
- US-6: Health check + monitoring/logging 

## Demo (sample requests)

```bash
# Delete a task
curl -X DELETE localhost:3000/tasks/1
# -> 204 No Content

# Filter tasks by status
curl "localhost:3000/tasks?status=done"
# -> 200 [ { id: 2, status: "done", ... } ]

# Health check
curl localhost:3000/health
# -> 200 { "status": "ok", "uptime": 123.45 }
```

Sample log output during a request (as printed by the logging middleware):
```
GET /tasks -> 200 (1ms)
POST /tasks -> 201 (0ms)
PATCH /tasks/1 -> 200 (0ms)
```

## CI/CD evidence
- Same GitHub Actions pipeline (`.github/workflows/ci.yml`) runs the full suite on every push.
- Full local test run: **10/10 tests passing** across sprint 1 and sprint 2 suites.

## Definition of Done check
| Item | Status |
|------|--------|
| Retro improvements applied | &#x2714; |
| Code committed incrementally | &#x2714; (3 more commits) |
| Tests written and passing |  &#x2714; 10/10 total |
| Monitoring/logging in place | &#x2714; |
| Acceptance criteria met | &#x2714; |

## Sprint 2 Retrospective

**What went well**
- Applying last sprint's retro items first (logging, health check) paid off immediately debugging was easier this sprint.
- Filtering and deletion were simple to add on top of the existing store module, showing the value of separating data logic from routes.

**What went wrong**
- Data is still in-memory only; all tasks are lost on restart. Fine for this assessment, but not production-ready.
- No authentication/authorization anyone can hit any endpoint.

**Lessons learned / future improvements**
1. Swap the in-memory store for a real database (e.g., SQLite/Postgres) to persist data.
2. Add basic auth or API keys before treating this as a real service.
3. Extend CI to include a lint step and a staging deploy job (canary or blue-green) as covered in the DevOps notes.
