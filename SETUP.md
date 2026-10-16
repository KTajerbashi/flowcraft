# FlowCraft — Setup & Run Guide

این فایل نحوه نصب dependencyها، راه‌اندازی و اجرای پروژه FlowCraft را توضیح می‌دهد.

## 1. Prerequisites

قبل از اجرای پروژه، موارد زیر باید روی سیستم نصب باشند:

- Node.js
- npm
- Angular CLI
- MongoDB

برای بررسی نصب Node.js و npm:

```bash
node --version
npm --version
```

برای بررسی Angular CLI:

```bash
ng version
```

---

## 2. Project Structure

ساختار اصلی پروژه:

```text
flowcraft/
│
├── frontend/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── package.json
│   └── ...
│
├── package.json
├── package-lock.json
└── SETUP.md
```

Frontend با Angular و Backend با Node.js / Express پیاده‌سازی شده است.

---

## 3. Install Dependencies

بعد از Clone کردن repository وارد Root Directory پروژه شوید:

```bash
cd flowcraft
```

Dependencyهای Root را نصب کنید:

```bash
npm install
```

سپس dependencyهای Frontend و Backend را نصب کنید:

```bash
npm run install:all
```

این دستور معادل اجرای دستورات زیر است:

```bash
npm install --prefix frontend
npm install --prefix backend
```

بنابراین لازم نیست وارد هر پوشه شوید و `npm install` را به صورت جداگانه اجرا کنید.

---

## 4. Start the Application

برای اجرای همزمان Frontend و Backend:

```bash
npm start
```

این دستور هر دو سرویس را اجرا می‌کند:

```text
Frontend
Angular Development Server

Backend
Node.js / Express Server
```

---

## 5. Run Frontend Only

اگر فقط می‌خواهید Frontend را اجرا کنید:

```bash
npm run start:frontend
```

یا:

```bash
cd frontend
npm start
```

---

## 6. Run Backend Only

اگر فقط می‌خواهید Backend را اجرا کنید:

```bash
npm run start:backend
```

یا:

```bash
cd backend
npm start
```

---

## 7. Recommended Development Workflow

برای توسعه روزمره پروژه:

### Step 1 — Install dependencies

```bash
npm install
npm run install:all
```

### Step 2 — Start application

```bash
npm start
```

### Step 3 — Develop

Frontend و Backend به صورت همزمان در حال اجرا خواهند بود.

---

## 8. Available Root Commands

| Command | Description |
|---|---|
| `npm install` | نصب dependencyهای Root |
| `npm run install:all` | نصب dependencyهای Frontend و Backend |
| `npm run start:frontend` | اجرای فقط Angular Frontend |
| `npm run start:backend` | اجرای فقط Node.js Backend |
| `npm start` | اجرای همزمان Frontend و Backend |

---

## 9. First-Time Setup

اگر پروژه را برای اولین بار Clone کرده‌اید، ترتیب پیشنهادی:

```bash
git clone <repository-url>
cd flowcraft
npm install
npm run install:all
npm start
```

---

## 10. Troubleshooting

### Port already in use

اگر هنگام اجرای پروژه با خطای اشغال بودن Port مواجه شدید، بررسی کنید که سرویس دیگری از همان Port استفاده نکند.

برای مثال:

```text
Frontend → Angular development server
Backend  → Node.js / Express server
```

در صورت نیاز Port مربوط به سرویس را تغییر دهید.

---

### Dependency installation problem

در صورت بروز مشکل در نصب dependencyها:

```bash
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules
```

سپس:

```bash
npm install
npm run install:all
```

در Windows اگر دستور `rm` کار نمی‌کند، پوشه‌های `node_modules` را به صورت دستی حذف کنید.

---

## 11. Environment Variables

در صورت نیاز به Environment Variables، فایل‌های environment مربوط به Backend و Frontend را طبق تنظیمات پروژه ایجاد کنید.

برای مثال:

```text
backend/
├── .env
└── ...

frontend/
└── ...
```

**فایل `.env` نباید در Git commit شود.**

در صورت استفاده از MongoDB، connection string مربوط به MongoDB باید در Environment Variables نگهداری شود.

---

## 12. MongoDB

FlowCraft از MongoDB برای ذخیره Workflowها استفاده می‌کند.

قبل از اجرای Backend، مطمئن شوید MongoDB در حال اجرا است.

ساختار کلی:

```text
Angular
   │
   │ HTTP
   ▼
Node.js / Express
   │
   │ Mongoose
   ▼
MongoDB
```

BPMN diagram به صورت XML در MongoDB ذخیره می‌شود.

---

## 13. Development Architecture

```text
                    FlowCraft
                       │
          ┌────────────┴────────────┐
          │                         │
       Frontend                  Backend
       Angular                Node.js/Express
          │                         │
          │ HTTP REST API           │
          └────────────►────────────┘
                                    │
                                 Mongoose
                                    │
                                    ▼
                                 MongoDB
```

---

## 14. Production

در مرحله MVP تمرکز پروژه روی Development و پیاده‌سازی قابلیت‌های اصلی است.

Production build و deployment در مراحل بعدی پروژه اضافه خواهد شد.