# FlowCraft — نقشه راه، معماری و برنامه کامل پیاده‌سازی

> این سند مرجع اصلی توسعه FlowCraft است. از این مرحله به بعد، هر قابلیت جدید باید در یکی از Featureها، Phaseها و Definition of Done این سند قرار بگیرد و سپس پیاده‌سازی شود.

---

## 1. هدف پروژه

FlowCraft یک **BPMN Workflow Designer** سبک و وب‌محور است که با آن کاربر می‌تواند:

1. Workflow ایجاد کند.
2. مشخصات Workflow را مدیریت کند.
3. نمودار BPMN را با `bpmn-js` طراحی و ویرایش کند.
4. نمودار را اعتبارسنجی کند.
5. BPMN XML را ذخیره کند.
6. Workflowهای قبلی را دوباره باز کند و ادامه دهد.
7. Workflow را به‌روزرسانی، rename و حذف کند.
8. وضعیت‌های loading، empty، success و error را به شکل مناسب مشاهده کند.

طبق مستند فعلی، MVP روی **طراحی و persistence** تمرکز دارد و Authentication، Collaboration، Workflow Execution Engine، Advanced Versioning، Microservices و Distributed Messaging خارج از MVP هستند.

---

# 2. مرجع‌های معماری فعلی

## 2.1 Featureهای اصلی

Frontend بر اساس Featureها سازمان‌دهی می‌شود:

```text
features/
├── dashboard/
├── workflows/
└── designer/
```

- `dashboard`: نمای کلی Workflowها
- `workflows`: فهرست و مدیریت Workflowها
- `designer`: طراحی، ویرایش و اعتبارسنجی BPMN

Backend به شکل **Modular Monolith** و با محوریت ماژول `workflows` طراحی می‌شود.

## 2.2 Technology Stack

### Frontend

- Angular 21+
- TypeScript با strict checking
- Standalone Components
- Angular Signals
- Angular Router
- Reactive Forms
- HttpClient
- bpmn-js
- SCSS
- Bootstrap / Bootstrap Icons در UI موجود پروژه

### Backend

- Node.js
- Express
- TypeScript
- Mongoose
- REST API

### Database

- MongoDB
- یک collection اصلی برای MVP: `workflows`

---

# 3. معماری کلان

```text
┌──────────────────────────────────────────────────────┐
│                    Angular Frontend                  │
│                                                      │
│  Dashboard      Workflow Management      Designer    │
│                                      ┌────────────┐  │
│                                      │  bpmn-js   │  │
│                                      └────────────┘  │
└───────────────────────┬──────────────────────────────┘
                        │ HTTP / JSON
                        ▼
┌──────────────────────────────────────────────────────┐
│                 Node.js + Express                    │
│                                                      │
│ Routes → Controller → Service → Repository/Model    │
│                         │                            │
│                    Validation                        │
│                    Error Handling                    │
└───────────────────────┬──────────────────────────────┘
                        │ Mongoose
                        ▼
┌──────────────────────────────────────────────────────┐
│                      MongoDB                         │
│                                                      │
│                  workflows collection                │
│               BPMN XML + Metadata                    │
└──────────────────────────────────────────────────────┘
```

اصل مهم:

> Component نباید مسئول business logic، persistence یا منطق HTTP باشد.  
> Route نباید مستقیماً منطق database را اجرا کند.  
> Service محل business logic است و Repository/Model مسئول دسترسی به persistence است.

---

# 4. مرزبندی Featureها

## Feature A — Dashboard

### هدف

ارائه نمای کلی از Workflowهای موجود و مسیر سریع برای ایجاد یا باز کردن Workflow.

### قابلیت‌ها

- نمایش تعداد Workflowها
- نمایش Workflowهای اخیر
- نمایش Workflowهای آخرین تغییر یافته
- دکمه ایجاد Workflow
- لینک ورود به مدیریت Workflowها
- loading state
- empty state
- error state

### منبع داده

در MVP می‌تواند از:

```http
GET /api/workflows
```

استفاده کند و الزاماً API اختصاصی Dashboard لازم نیست.

### Definition of Done

- [ ] Dashboard بدون داده به شکل مناسب نمایش داده شود.
- [ ] Loading state وجود داشته باشد.
- [ ] Error state وجود داشته باشد.
- [ ] تعداد Workflowها درست نمایش داده شود.
- [ ] Create و Open navigation کار کند.

---

# 5. Feature B — Workflow Management

این Feature مرکز مدیریت entity اصلی سیستم است.

## 5.1 قابلیت‌ها

```text
Workflow Management
├── List
├── Create
├── Open
├── Rename
├── Update
└── Delete
```

## 5.2 Workflow List

UI باید شامل موارد زیر باشد:

- نام Workflow
- تاریخ ایجاد
- تاریخ آخرین تغییر
- عملیات Open
- عملیات Edit/Rename
- عملیات Delete
- loading
- empty
- error

## 5.3 Create Workflow

فرآیند:

```text
User
 ↓
Create Workflow
 ↓
Enter metadata
 ↓
POST /api/workflows
 ↓
Receive workflow id
 ↓
Navigate to designer
```

حداقل ورودی:

```text
name
```

و در صورت پیاده‌سازی:

```text
description
```

## 5.4 Rename / Update

برای تغییر metadata یا BPMN XML:

```http
PATCH /api/workflows/:id
```

Body می‌تواند شامل یک یا چند فیلد قابل تغییر باشد:

```json
{
  "name": "Order Process",
  "description": "Order processing",
  "bpmnXml": "<?xml ...>"
}
```

## 5.5 Delete

فرآیند:

```text
Delete
 ↓
Confirmation
 ↓
DELETE /api/workflows/:id
 ↓
Refresh list
```

حذف باید destructive action محسوب شود و confirmation داشته باشد.

### Definition of Done

- [ ] List
- [ ] Create
- [ ] Open
- [ ] Rename
- [ ] Update
- [ ] Delete
- [ ] Confirmation
- [ ] Loading states
- [ ] Empty state
- [ ] Error state
- [ ] Success feedback
- [ ] تست‌های مرتبط

---

# 6. Feature C — BPMN Designer

این Feature هسته اصلی FlowCraft است.

## 6.1 مسئولیت Designer

Designer مسئول:

- ایجاد diagram
- import XML
- export XML
- افزودن element
- حذف element
- اتصال elementها
- ویرایش elementها
- zoom
- pan
- undo
- redo
- دریافت XML
- بارگذاری XML
- نمایش وضعیت unsaved changes

Designer نباید مسئول ذخیره مستقیم در MongoDB باشد.

---

# 7. چرخه Designer

```text
Workflow
   ↓
Load bpmnXml
   ↓
bpmn-js
   ↓
User edits diagram
   ↓
Diagram changed
   ↓
dirty = true
   ↓
Validate
   ↓
Save
   ↓
PATCH /api/workflows/:id
   ↓
dirty = false
```

---

# 8. BPMN XML

فرمت persistence نمودار:

```text
BPMN Diagram
      ↓
bpmn-js
      ↓
XML
      ↓
Workflow.bpmnXml
      ↓
MongoDB
```

اصل معماری:

> MongoDB در MVP محل ذخیره Workflow Definition است؛ نه محل ذخیره objectهای داخلی `bpmn-js`.

---

# 9. Designer State

برای state محلی Designer از Signals استفاده شود.

نمونه state مفهومی:

```ts
loading
dirty
saving
errorMessage
successMessage
workflow
```

همچنین reference مربوط به modeler باید lifecycle مناسبی داشته باشد.

---

# 10. Import / Export

## Import

```text
XML
 ↓
modeler.importXML(xml)
 ↓
canvas.zoom('fit-viewport')
```

در صورت خطا:

```text
import error
 ↓
errorMessage
```

## Export

```text
modeler.saveXML()
 ↓
XML
```

XML نباید صرفاً در localStorage به عنوان persistence اصلی ذخیره شود.

`localStorage` در صورت نیاز فقط می‌تواند برای قابلیت‌های موقت UI مانند draft یا توسعه/debug استفاده شود؛ منبع اصلی persistence باید API و MongoDB باشد.

---

# 11. Feature D — BPMN Validation

Validation باید از Designer UI جدا نگه داشته شود.

## 11.1 لایه‌های Validation

```text
BPMN XML
   ↓
XML / BPMN structural validation
   ↓
Business-oriented basic validation
   ↓
ValidationResult
   ↓
Designer UI
```

## 11.2 نمونه Validationهای MVP

حداقل موارد پیشنهادی:

- وجود Start Event
- وجود End Event
- وجود elementهای معتبر
- اتصال صحیح sequence flowها
- نبودن taskهای کاملاً disconnected
- بررسی خطاهای import/parser
- گزارش error و warning با پیام قابل فهم

## 11.3 قرارداد نتیجه

```ts
interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

interface ValidationIssue {
  code: string;
  message: string;
  elementId?: string;
}
```

هدف:

```text
✕ Workflow contains 2 errors

1. Start Event is missing.
2. Task "Approve Request" is disconnected.
```

---

# 12. Feature E — Persistence

Persistence از سه بخش تشکیل می‌شود:

```text
Angular
 ↓
REST API
 ↓
Workflow Service
 ↓
Mongoose
 ↓
MongoDB
```

## 12.1 Data Model

MVP فقط collection زیر را لازم دارد:

```text
workflows
```

مدل مفهومی:

```ts
Workflow {
  _id: ObjectId
  name: string
  description?: string
  bpmnXml: string
  createdAt: Date
  updatedAt: Date
}
```

`description` در صورت نیاز می‌تواند optional باشد.

---

# 13. MongoDB و Mongoose

جریان ساخت داده:

```text
Mongoose Schema
       ↓
Mongoose Model
       ↓
Application operation
       ↓
MongoDB
       ↓
workflows collection
```

Mongoose مسئول mapping بین application و MongoDB است.

نکته مهم:

> Collection باید نتیجه استفاده از Model/Schema و عملیات persistence باشد؛ لازم نیست ابتدا collection را به شکل دستی در MongoDB بسازیم.

---

# 14. Feature F — REST API

APIهای اصلی MVP:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | سلامت Backend |
| GET | `/api/workflows` | فهرست Workflowها |
| GET | `/api/workflows/:id` | دریافت Workflow |
| POST | `/api/workflows` | ایجاد Workflow |
| PATCH | `/api/workflows/:id` | تغییر Workflow |
| DELETE | `/api/workflows/:id` | حذف Workflow |

---

# 15. API Layering

برای درخواست:

```http
PATCH /api/workflows/:id
```

مسیر داخلی:

```text
HTTP Request
    ↓
Router
    ↓
Controller
    ↓
Service
    ↓
Repository / Mongoose Model
    ↓
MongoDB
```

## Controller

مسئول:

- دریافت request
- استخراج params/body
- فراخوانی service
- ارسال response

## Service

مسئول:

- business rules
- تصمیم‌گیری
- orchestration
- خطاهای business

## Repository

در صورت استفاده:

- database access
- query
- persistence

## Model

- schema
- persistence mapping

---

# 16. API Contract

## GET /api/workflows

Response مفهومی:

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Order Process",
      "description": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

## GET /api/workflows/:id

```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Order Process",
    "description": "...",
    "bpmnXml": "<?xml ...>",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## POST /api/workflows

Request:

```json
{
  "name": "Order Process",
  "description": ""
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "..."
  }
}
```

## PATCH /api/workflows/:id

Request:

```json
{
  "name": "Updated Process",
  "bpmnXml": "<?xml ...>"
}
```

## DELETE /api/workflows/:id

Response باید یک قرارداد موفقیت ثابت داشته باشد.

> قرارداد نهایی response باید با implementation موجود repository هماهنگ شود؛ این بخش یک قرارداد معماری پیشنهادی است.

---

# 17. HTTP Error Contract

خطاها باید predictable باشند.

نمونه:

```json
{
  "success": false,
  "error": {
    "code": "WORKFLOW_NOT_FOUND",
    "message": "Workflow was not found."
  }
}
```

کدهای منطقی:

```text
400 Bad Request
404 Not Found
409 Conflict        در صورت نیاز
500 Internal Server Error
```

Backend باید centralized error handling داشته باشد.

---

# 18. Frontend Architecture

ساختار هدف:

```text
src/app/
│
├── core/
│   ├── services/
│   ├── interceptors/
│   ├── guards/
│   └── models/
│
├── shared/
│   ├── components/
│   ├── directives/
│   └── pipes/
│
├── layouts/
│
└── features/
    │
    ├── dashboard/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   └── models/
    │
    ├── workflows/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   └── models/
    │
    └── designer/
        ├── pages/
        ├── components/
        ├── services/
        ├── validators/
        └── models/
```

همه ساختارهای جدید باید با Standalone Components و Angular modern control flow (`@if`, `@for`, `@switch`) پیاده‌سازی شوند.

---

# 19. Backend Architecture

ساختار هدف:

```text
backend/
└── src/
    ├── config/
    │   └── database.ts
    │
    ├── modules/
    │   └── workflows/
    │       ├── workflow.model.ts
    │       ├── workflow.types.ts
    │       ├── workflow.repository.ts
    │       ├── workflow.service.ts
    │       ├── workflow.controller.ts
    │       ├── workflow.routes.ts
    │       └── workflow.validation.ts
    │
    ├── middlewares/
    │   ├── error.middleware.ts
    │   └── validation.middleware.ts
    │
    ├── routes/
    │   └── index.ts
    │
    ├── app.ts
    └── server.ts
```

این ساختار باید فقط تا جایی استفاده شود که واقعاً complexity را کاهش دهد؛ abstraction صرفاً برای زیاد کردن تعداد فایل‌ها ممنوع است.

---

# 20. Routing

مسیرهای پیشنهادی Frontend:

```text
/
├── dashboard
├── workflows
├── workflows/new
├── workflows/:id
├── workflows/:id/designer
├── 401
├── 404
└── 500
```

نام دقیق routeها باید با routeهای موجود repository هماهنگ بماند و بدون دلیل تغییر نکند.

---

# 21. User Flow اصلی

## ایجاد Workflow

```text
Dashboard
 ↓
Create Workflow
 ↓
Workflow metadata
 ↓
Create API
 ↓
Workflow ID
 ↓
Designer
 ↓
Design BPMN
 ↓
Validate
 ↓
Save
```

## باز کردن Workflow

```text
Workflow List
 ↓
Open
 ↓
GET /api/workflows/:id
 ↓
Receive bpmnXml
 ↓
modeler.importXML()
 ↓
Edit
```

## ذخیره

```text
Designer
 ↓
modeler.saveXML()
 ↓
PATCH /api/workflows/:id
 ↓
MongoDB
 ↓
Success
 ↓
dirty = false
```

## حذف

```text
Workflow List
 ↓
Delete
 ↓
Confirm
 ↓
DELETE API
 ↓
Remove from list
```

---

# 22. Stateهای مورد نیاز

هر Feature مهم باید stateهای زیر را بررسی کند:

```text
Initial
Loading
Success
Empty
Error
Saving
Dirty
```

مثلاً Workflow List:

```text
@if (loading) {
    loading UI
} @else if (error) {
    error UI
} @else if (workflows.length === 0) {
    empty UI
} @else {
    workflow list
}
```

از الگوهای قدیمی:

```text
*ngIf
*ngFor
*ngSwitch
```

در implementation جدید استفاده نشود.

---

# 23. فازهای کامل پروژه

## Phase 0 — Project Baseline

هدف: تثبیت وضعیت فعلی.

### کارها

- [ ] بررسی frontend
- [ ] بررسی backend
- [ ] بررسی packageها
- [ ] بررسی routes
- [ ] بررسی environment
- [ ] بررسی API فعلی
- [ ] بررسی designer فعلی
- [ ] مشخص کردن کدهای incomplete
- [ ] ثبت technical debt

### خروجی

یک baseline قابل اتکا.

---

# Phase 1 — Foundation

بخش زیادی از این Phase در پروژه فعلی انجام شده است.

### Frontend

- [x/partial] Angular application
- [x/partial] Routing
- [x/partial] Layout
- [x/partial] Bootstrap
- [x/partial] Bootstrap Icons
- [x/partial] BaseService
- [x/partial] ApiService
- [x/partial] صفحات پایه
- [ ] تثبیت architecture

### Backend

- [x/partial] Node.js
- [x/partial] Express
- [x/partial] TypeScript
- [x/partial] JSON middleware
- [x/partial] CORS
- [ ] centralized errors
- [ ] request validation
- [ ] stable module structure

### خروجی

Foundation stable.

---

# Phase 2 — Workflow Domain + Database

این مرحله اولین milestone اصلی بعد از foundation است.

## Backend

- [ ] MongoDB connection
- [ ] environment configuration
- [ ] Workflow schema
- [ ] Workflow model
- [ ] TypeScript contracts
- [ ] repository
- [ ] service
- [ ] validation

## Database

```text
workflows
```

با:

```text
_id
name
description?
bpmnXml
createdAt
updatedAt
```

## تست

- [ ] connection behavior
- [ ] model validation
- [ ] required name
- [ ] BPMN XML field behavior

### خروجی

Backend قادر به ذخیره Workflow باشد.

---

# Phase 3 — Workflow REST API

## Implement

```text
GET    /api/workflows
GET    /api/workflows/:id
POST   /api/workflows
PATCH  /api/workflows/:id
DELETE /api/workflows/:id
GET    /api/health
```

## موارد ضروری

- [ ] request validation
- [ ] ObjectId validation
- [ ] not found handling
- [ ] consistent responses
- [ ] centralized error handling
- [ ] HTTP status codes
- [ ] tests

### Definition of Done

تمام CRUD APIها با test قابل تکرار کار کنند.

---

# Phase 4 — Workflow Management UI

## Pages

- [ ] Workflow list
- [ ] Create workflow
- [ ] Edit metadata
- [ ] Delete confirmation

## UX

- [ ] loading
- [ ] empty
- [ ] success
- [ ] error
- [ ] confirmation
- [ ] navigation

### خروجی

کاربر بدون ورود به Designer بتواند Workflow را مدیریت کند.

---

# Phase 5 — BPMN Designer Core

## bpmn-js

- [ ] initialization
- [ ] destroy lifecycle
- [ ] create diagram
- [ ] import XML
- [ ] export XML
- [ ] add elements
- [ ] edit elements
- [ ] connect elements
- [ ] delete elements
- [ ] zoom
- [ ] pan
- [ ] undo
- [ ] redo

## UI

- [ ] toolbar
- [ ] designer canvas
- [ ] save
- [ ] validate
- [ ] import/export
- [ ] dirty indicator

### خروجی

Designer مستقل و پایدار داشته باشیم.

---

# Phase 6 — Designer + Persistence Integration

این Phase نقطه اتصال واقعی Frontend و Backend است.

## Open

```text
GET workflow
 ↓
bpmnXml
 ↓
importXML
```

## Save

```text
saveXML
 ↓
PATCH workflow
 ↓
MongoDB
```

## Dirty state

```text
Diagram changed
 ↓
dirty = true
```

بعد از Save:

```text
dirty = false
```

## Navigation protection

اگر:

```text
dirty === true
```

باشد، قبل از ترک Designer باید رفتار مشخصی وجود داشته باشد.

---

# Phase 7 — BPMN Validation

## Structural

- [ ] valid BPMN XML
- [ ] parser/import errors

## Basic semantic

- [ ] Start Event
- [ ] End Event
- [ ] connected tasks
- [ ] valid sequence flow
- [ ] disconnected elements

## UI

- [ ] validation panel
- [ ] errors
- [ ] warnings
- [ ] element reference
- [ ] understandable messages

---

# Phase 8 — Professional UX

بعد از functional completion.

- [ ] global loading behavior
- [ ] consistent error UI
- [ ] toast/feedback strategy
- [ ] confirmation dialogs
- [ ] dirty indicator
- [ ] save state
- [ ] disabled buttons while saving
- [ ] empty states
- [ ] retry actions
- [ ] 401
- [ ] 404
- [ ] 500
- [ ] responsive layout
- [ ] accessibility basics

---

# Phase 9 — Testing

## Frontend

### Unit

- [ ] Workflow service
- [ ] Designer service
- [ ] validation logic
- [ ] state transitions

### Component

- [ ] Dashboard
- [ ] Workflow list
- [ ] Workflow form
- [ ] Designer states

## Backend

- [ ] repository
- [ ] service
- [ ] controller
- [ ] validation
- [ ] API endpoints
- [ ] error handling

## Integration

حداقل:

```text
Create workflow
 ↓
Get workflow
 ↓
Update workflow
 ↓
Delete workflow
```

---

# Phase 10 — Documentation

مستندات نهایی:

```text
README.md
SETUP.md
ARCHITECTURE.md
ROADMAP.md
API.md
DATABASE.md
```

## README

- Project overview
- Features
- Stack
- Quick start

## SETUP

- Prerequisites
- Installation
- Environment
- Run commands
- Troubleshooting

## ARCHITECTURE

- Frontend
- Backend
- Database
- Data flow
- Feature boundaries

## API

- endpoints
- request
- response
- errors

## DATABASE

- collection
- schema
- indexes
- persistence rules

## ROADMAP

- completed
- current
- next
- future

---

# 24. Phase 11 — Production Readiness

پس از Stable شدن MVP:

- [ ] production frontend build
- [ ] production backend build
- [ ] environment separation
- [ ] logging
- [ ] security headers
- [ ] CORS policy
- [ ] health check
- [ ] graceful shutdown
- [ ] MongoDB production configuration
- [ ] Docker
- [ ] Docker Compose
- [ ] deployment documentation

---

# 25. چیزهایی که فعلاً نباید پیاده‌سازی شوند

تا زمانی که MVP کامل نشده:

```text
❌ Authentication
❌ Authorization
❌ Users
❌ Roles
❌ Permissions
❌ Workflow execution engine
❌ Task execution
❌ Multi-user collaboration
❌ Real-time editing
❌ Advanced versioning
❌ Event broker
❌ Redis
❌ Kafka
❌ Microservices
```

این موارد ممکن است در roadmap بعد از MVP قرار بگیرند، اما نباید تمرکز فعلی را خراب کنند.

---

# 26. آینده بعد از MVP

اگر MVP پایدار شد، معماری آینده می‌تواند به این سمت برود:

```text
FlowCraft
│
├── Workflow Designer
│
├── Workflow Definition
│
├── Workflow Runtime
│
├── Task Management
│
├── Execution History
│
└── Users / Permissions
```

اما این‌ها **Phase بعد از MVP** هستند.

---

# 27. Definition of Done کلی

یک Feature زمانی Done است که:

```text
Implementation
      +
Validation
      +
Error Handling
      +
Loading/Empty/Success States
      +
API Contract
      +
Persistence (در صورت نیاز)
      +
Tests
      +
Documentation
      =
DONE
```

صرفاً اینکه UI نمایش داده شود به معنی Done نیست.

---

# 28. قانون توسعه پروژه

از این مرحله به بعد هر درخواست توسعه باید با این قالب تعریف شود:

```text
Feature:
...

Goal:
...

User Flow:
...

Frontend:
...

API:
...

Backend:
...

Database:
...

Validation:
...

Error States:
...

Tests:
...

Definition of Done:
...
```

سپس implementation انجام می‌شود.

---

# 29. ترتیب اجرای واقعی از وضعیت فعلی

برای جلوگیری از پراکندگی، ترتیب توصیه‌شده دقیقاً این است:

```text
1. Baseline / Audit
       ↓
2. MongoDB + Workflow Model
       ↓
3. Workflow Repository
       ↓
4. Workflow Service
       ↓
5. Workflow Controller
       ↓
6. Workflow Routes
       ↓
7. API Tests
       ↓
8. Workflow List UI
       ↓
9. Create Workflow UI
       ↓
10. Open Workflow
       ↓
11. Rename / Update
       ↓
12. Delete
       ↓
13. Stable BPMN Designer
       ↓
14. Designer ↔ Workflow API
       ↓
15. Save / Load BPMN XML
       ↓
16. Dirty State
       ↓
17. BPMN Validation
       ↓
18. UX / Error Handling
       ↓
19. Frontend Tests
       ↓
20. Backend Tests
       ↓
21. Integration Tests
       ↓
22. Documentation
       ↓
23. Production / Docker
```

---

# 30. Milestoneهای قابل اندازه‌گیری

## M1 — Foundation Stable

```text
Frontend runs
Backend runs
MongoDB connects
Routing works
```

## M2 — Workflow CRUD Complete

```text
Create
Read
Update
Delete
```

## M3 — Designer Complete

```text
Create
Edit
Connect
Delete
Import
Export
```

## M4 — Persistence Complete

```text
Save BPMN
Load BPMN
Reopen
Continue editing
```

## M5 — Validation Complete

```text
Validate
Show errors
Show warnings
```

## M6 — MVP Complete

```text
Dashboard
Workflow Management
Designer
Persistence
Validation
Error handling
Tests
```

## M7 — Portfolio Ready

```text
Clean architecture
Tests
Documentation
Docker
Production build
```

---

# 31. معیار موفقیت MVP

FlowCraft زمانی MVP محسوب می‌شود که کاربر بتواند این سناریو را بدون دخالت developer انجام دهد:

```text
Open FlowCraft
      ↓
Create Workflow
      ↓
Enter "Order Process"
      ↓
Open Designer
      ↓
Create BPMN process
      ↓
Validate
      ↓
Save
      ↓
Close application
      ↓
Open FlowCraft again
      ↓
Open "Order Process"
      ↓
Diagram is restored
      ↓
Edit diagram
      ↓
Save again
      ↓
Delete Workflow
```

اگر این سناریو کامل و تست‌شده باشد، هسته MVP تمام شده است.

---

# 32. وضعیت فعلی و نحوه استفاده از این سند

طبق مستندات فعلی پروژه، FlowCraft از ابتدا با هدف workflow management، BPMN editing، persistence، reopening، validation و REST integration تعریف شده است؛ بنابراین این roadmap قابلیت‌های جدید خارج از scope اصلی اختراع نمی‌کند، بلکه آن‌ها را به ترتیب اجرایی و قابل تست سازمان‌دهی می‌کند.

در مستند فعلی نیز Featureهای اصلی شامل Workflow Management، BPMN Diagram Editor، Diagram Persistence، Workflow Reopening، BPMN Validation، REST API Integration و stateهای loading/empty/success/error تعریف شده‌اند.

از این پس:

> **این فایل باید مرجع ترتیب پیاده‌سازی باشد، نه اینکه هم‌زمان چند Feature را نصفه پیاده‌سازی کنیم.**

هر Phase باید تا Definition of Done خود تکمیل شود، سپس به Phase بعد برویم.

---

# 33. Current Next Step

اولین کار بعدی:

```text
PHASE 0
Audit Current Implementation
        ↓
PHASE 2
Workflow Domain + MongoDB
        ↓
PHASE 3
Workflow REST API
```

در شروع هر Phase ابتدا وضعیت موجود repository بررسی می‌شود تا فایل‌های موجود دوباره ساخته نشوند.

