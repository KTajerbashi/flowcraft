# FlowCraft — BPMN Workflow Designer

FlowCraft is a lightweight, web-based BPMN workflow designer built to demonstrate modern Angular development, component architecture, REST API integration, and data persistence.

The application enables users to create, edit, validate, save, and manage business process diagrams using [bpmn-js](https://bpmn.io/toolkit/bpmn-js/).

## Overview

FlowCraft aims to provide a simple and intuitive environment for designing BPMN workflows while showcasing clean, maintainable, and testable full-stack development practices.

### Key Features

- **Workflow Management** — Create, view, rename, update, and delete workflows.
- **BPMN Diagram Editor** — Design business process diagrams using bpmn-js.
- **Diagram Persistence** — Save BPMN diagrams as XML documents in MongoDB.
- **Workflow Reopening** — Load and continue editing previously saved diagrams.
- **BPMN Validation** — Provide basic validation and understandable error messages.
- **REST API Integration** — Communicate with a Node.js and Express backend.
- **User-Friendly States** — Handle loading, empty, success, and error states.

> Features are implemented incrementally. The list describes the project's intended MVP scope; individual features may still be under development.

## Technology Stack

### Frontend

- Angular 21+
- TypeScript
- Angular Standalone Components
- Angular Signals
- Angular Router
- Reactive Forms
- Angular HttpClient
- bpmn-js
- SCSS

### Backend

- Node.js
- Express
- TypeScript
- Mongoose
- REST API

### Database

- MongoDB

### Development Tools

- Git and GitHub
- npm
- Angular CLI
- ESLint and testing tools appropriate to the installed versions

## Architecture

FlowCraft follows a feature-oriented architecture on the frontend and a modular monolith architecture on the backend.

### Frontend Structure

The Angular application is organized around the following features:

- `dashboard` — Overview of available workflows.
- `workflows` — Workflow listing and management.
- `designer` — BPMN diagram editing and validation.

Shared services and models handle API communication, application state, and data contracts.

### Backend Structure

The backend is organized around the `workflows` module, separating HTTP handling, business logic, validation, and database access where appropriate.

### High-Level Architecture

```text
┌──────────────────────────────┐
│       Angular Frontend       │
│                              │
│  Dashboard                   │
│  Workflow Management         │
│  BPMN Designer (bpmn-js)     │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│      Node.js + Express       │
│                              │
│  REST API                    │
│  Validation                  │
│  Workflow Business Logic     │
│  Centralized Error Handling  │
└──────────────┬───────────────┘
               │ Mongoose
               ▼
┌──────────────────────────────┐
│           MongoDB            │
│                              │
│  workflows collection        │
│  BPMN XML + Metadata         │
└──────────────────────────────┘
```

## Data Model

The MVP uses a single MongoDB collection: `workflows`.

Each workflow contains:

| Field | Description |
|---|---|
| `_id` | MongoDB ObjectId |
| `name` | Workflow name |
| `description` | Optional workflow description, if implemented |
| `bpmnXml` | BPMN diagram serialized as XML |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last modification timestamp |

The final schema may omit optional fields that are not needed in the initial implementation.

## REST API

The initial API contract includes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Check API health |
| `GET` | `/api/workflows` | Retrieve all workflows |
| `GET` | `/api/workflows/:id` | Retrieve a workflow |
| `POST` | `/api/workflows` | Create a workflow |
| `PATCH` | `/api/workflows/:id` | Update workflow metadata or BPMN XML |
| `DELETE` | `/api/workflows/:id` | Delete a workflow |

The API uses JSON request and response bodies, appropriate HTTP status codes, input validation, and consistent error responses.

## Getting Started

### Prerequisites

Install the following tools before running the project:

- Node.js — a version compatible with the selected Angular and backend dependencies.
- npm
- Angular CLI compatible with the installed Angular version.
- MongoDB local installation or a MongoDB connection string.
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/KTajerbashi/bpmn-io.git
cd bpmn-io
```

### 2. Install Dependencies

Install frontend and backend dependencies separately, using the actual project directory names.

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

> The commands above assume the application uses `frontend` and `backend` directories. Adjust them if your repository uses a different structure.

### 3. Configure Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/flowcraft
```

Use the variable names expected by the backend implementation. Do not commit `.env` files or credentials to GitHub.

### 4. Start the Backend

From the backend directory, run the development command configured in `package.json`, for example:

```bash
npm run dev
```

Verify the health endpoint:

```text
http://localhost:3000/api/health
```

### 5. Start the Frontend

From the frontend directory, run:

```bash
npm start
```

If the project does not define an `npm start` script, use the configured Angular CLI command:

```bash
npx ng serve
```

Open the local URL printed by Angular CLI, typically `http://localhost:4200`.

> Exact commands, ports, and environment variables depend on the scripts and configuration in the repository.

## Development Roadmap

FlowCraft is developed incrementally, with each milestone completed and tested before the next begins.

- [ ] Initialize the Angular application and establish the feature structure.
- [ ] Initialize the Node.js and Express backend.
- [ ] Configure MongoDB and the Mongoose workflow model.
- [ ] Implement the workflow REST API.
- [ ] Build the dashboard and workflow list.
- [ ] Implement workflow creation, editing, and deletion.
- [ ] Integrate bpmn-js into the Angular designer.
- [ ] Implement BPMN XML import and export.
- [ ] Persist diagrams through the REST API.
- [ ] Implement workflow reopening and metadata updates.
- [ ] Add validation and user-friendly error handling.
- [ ] Write frontend and backend tests.
- [ ] Improve documentation and prepare a portfolio-ready release.

## Testing

Run tests using the scripts configured in each application.

Frontend:

```bash
cd frontend
npm test
```

Backend:

```bash
cd backend
npm test
```

The project aims to cover component behavior, workflow services, API validation, error handling, and data persistence with automated tests.

## Project Scope

The initial version focuses on workflow design and persistence.

The following capabilities are outside the MVP scope:

- Authentication and authorization
- Multi-user collaboration
- Workflow execution engine
- Advanced workflow versioning
- Microservices architecture
- Distributed messaging infrastructure

These capabilities may be evaluated after the core application is stable.

## Design Principles

- Keep the application small and focused.
- Use Angular's modern standalone and Signals-based APIs where appropriate.
- Maintain strict TypeScript type checking.
- Separate presentation, business logic, and data access.
- Use clear API contracts and consistent error handling.
- Avoid unnecessary dependencies and abstractions.
- Test features before considering them complete.

## Contributing

This project is primarily a personal portfolio and learning project. Suggestions, bug reports, and constructive feedback are welcome.

## License

A license has not yet been specified. Until a license is added to the repository, reuse and redistribution are subject to applicable copyright law.

## Author

**Kamran Tajerbashi**

Senior Software Engineer / Full-Stack Developer

GitHub: [@KTajerbashi](https://github.com/KTajerbashi)

---

Built to explore modern Angular development and practical BPMN workflow design.
