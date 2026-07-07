# Sprint 0 – Planning: TaskFlow API

## Product Vision
TaskFlow is a lightweight REST API that lets a user create, track, and manage
personal tasks, so they can stay organized without needing a full app.

## Product Backlog

| ID | User Story | Story Points | Priority |
|----|------------|---------------|----------|
| US-1 | As a user, I want to create a task, so that I can record work I need to do. | 3 | High |
| US-2 | As a user, I want to view all my tasks, so that I can see everything on my list. | 2 | High |
| US-3 | As a user, I want to update a task's status, so that I can track my progress. | 3 | High |
| US-4 | As a user, I want to delete a task, so that I can remove items I no longer need. | 2 | Medium |
| US-5 | As a user, I want to filter tasks by status, so that I can focus on what's relevant. | 3 | Medium |
| US-6 | As a user, I want a health check endpoint, so that the system's uptime can be monitored. | 2 | Low |

Estimation used relative sizing (1–5 points), based on: amount of work,
complexity, and risk/uncertainty consistent with standard Scrum estimation.

## Acceptance Criteria (examples)

**US-1 – Create task**
- Given valid title and description, when I POST /tasks, then a task is created with status "todo" and a unique ID.
- Given a missing title, when I POST /tasks, then I receive a 400 error.

**US-3 – Update status**
- Given a valid task ID and status, when I PATCH /tasks/:id, then the task's status is updated.
- Given an invalid status value, when I PATCH /tasks/:id, then I receive a 400 error.

**US-5 – Filter tasks**
- Given a status query parameter, when I GET /tasks?status=done, then only matching tasks are returned.

## Definition of Done (DoD)
A story is "Done" when:
1. Code is written and committed with a clear message.
2. Unit/integration tests are written and passing.
3. The CI pipeline runs green on the change.
4. The endpoint is manually verified (via test or curl).
5. Acceptance criteria are met.

## Sprint 1 Plan (selected stories)
- US-1: Create task
- US-2: View all tasks
- US-3: Update task status

## Sprint 2 Plan (selected stories)
- US-4: Delete task
- US-5: Filter tasks by status
- US-6: Health check + basic monitoring/logging
