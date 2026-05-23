# AI-Powered Compensation Intelligence Backend System

A backend-focused compensation intelligence platform designed to provide structured salary comparison, compensation normalization, and company-level compensation analytics through scalable APIs and validated data pipelines.

---

# Project Objective

Modern salary platforms often suffer from:

* inconsistent salary structures
* duplicate company names
* incomplete compensation data
* weak comparison workflows
* unreliable aggregation logic

This project focuses on solving these problems through:

* structured compensation storage
* normalization systems
* scalable REST APIs
* validation pipelines
* compensation comparison workflows

The system is intentionally backend-centric and prioritizes:

* reliability
* architecture quality
* clean API design
* data consistency

---

# Tech Stack

| Layer      | Technology           |
| ---------- | -------------------- |
| Framework  | Next.js (App Router) |
| Language   | TypeScript           |
| ORM        | Prisma               |
| Database   | SQLite               |
| Validation | Zod                  |

---

# Core Features

## Salary Ingestion

Create salary entries with:

* validation
* normalization
* automatic total compensation calculation

---

## Salary Search & Filtering

Supports:

* company filtering
* role filtering
* location filtering
* min/max salary filtering
* sorting
* pagination

---

## Compensation Comparison

Compare multiple compensation entries:

* total compensation
* base salary
* stock
* bonus

---

## Company Aggregation

Generate company-level analytics:

* average base salary
* average stock compensation
* average bonus
* average total compensation

---

# Research Observations

## Key Insights

### 1. Structured compensation is more useful than raw salary numbers

Platforms like Levels.fyi focus heavily on:

* base salary
* stock
* bonus
* compensation levels

rather than single salary values.

---

### 2. Company normalization is critical

Different naming styles create inaccurate analytics.

Examples:

* Google
* GOOGLE
* Google India

All should map to:

```ts
Google
```

---

### 3. Comparison workflows provide the highest practical value

Users benefit more from:

* side-by-side compensation comparison

than from:

* complex dashboards

---

### 4. Real-world compensation data is noisy

Observed issues:

* missing bonus values
* inconsistent stock entries
* duplicate company names
* incomplete compensation structures

---

### 5. Compensation intelligence is fundamentally a backend problem

The biggest challenge is:

* validation
* normalization
* aggregation
* consistency

not frontend complexity.

---

# Feature Comparison Research

| Feature                           | Levels.fyi | 6figr | AmbitionBox | Glassdoor | Build? |
| --------------------------------- | ---------- | ----- | ----------- | --------- | ------ |
| Structured Compensation Breakdown | ✅          | ✅     | ⚠️          | ⚠️        | ✅      |
| Salary Search & Filtering         | ✅          | ✅     | ✅           | ✅         | ✅      |
| Compensation Comparison           | ✅          | ✅     | ⚠️          | ⚠️        | ✅      |
| Company Aggregation               | ✅          | ✅     | ✅           | ✅         | ✅      |
| Role-Level Mapping                | ✅          | ⚠️    | ❌           | ❌         | ✅      |
| Reviews & Community               | ❌          | ❌     | ✅           | ✅         | ❌      |
| Interview Experiences             | ❌          | ❌     | ✅           | ✅         | ❌      |
| Compensation Trend Graphs         | ✅          | ✅     | ⚠️          | ⚠️        | ❌      |

---

# Project Architecture

```bash
src/
 ├── app/
 │    └── api/
 │         ├── salaries/
 │         ├── compare/
 │         └── stats/
 │
 ├── lib/
 │    ├── prisma.ts
 │    ├── normalize.ts
 │    ├── validation.ts
 │    └── services/
 │         ├── salary.service.ts
 │         ├── compare.service.ts
 │         └── stats.service.ts
 │
prisma/
README.md
```

---

# Database Schema

```prisma
model Salary {
  id          Int      @id @default(autoincrement())
  company     String
  role        String
  level       String
  location    String
  baseSalary  Float
  stock       Float
  bonus       Float
  totalComp   Float
  createdAt   DateTime @default(now())
}
```

---

# API Endpoints

---

## GET `/api/salaries`

Fetch salary entries with:

* filtering
* sorting
* pagination

### Query Parameters

| Parameter | Description        |
| --------- | ------------------ |
| company   | Filter by company  |
| role      | Filter by role     |
| location  | Filter by location |
| minSalary | Minimum salary     |
| maxSalary | Maximum salary     |
| page      | Pagination page    |
| limit     | Results per page   |
| sort      | Sorting option     |

---

## POST `/api/salaries`

Create salary entry.

### Features

* validation
* normalization
* automatic total compensation calculation

---

## POST `/api/compare`

Compare compensation entries.

### Request

```json
{
  "ids": [1, 2, 3]
}
```

### Response

```json
{
  "highestTC": {},
  "comparison": []
}
```

---

## GET `/api/stats/company/:name`

Get company-level compensation analytics.

### Response

```json
{
  "averageBaseSalary": 0,
  "averageStock": 0,
  "averageBonus": 0,
  "averageTotalComp": 0,
  "totalEntries": 0
}
```

---

# Validation Rules

The system rejects:

* negative salary values
* missing required fields
* invalid compensation structures

Validation is implemented using:

* Zod schemas
* reusable middleware logic

---

# Normalization Logic

Examples:

```ts
google -> Google
GOOGLE -> Google
Google India -> Google
```

This improves:

* aggregation quality
* filtering consistency
* comparison reliability

---

# Setup Instructions

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Configure Environment

Create `.env`

```env
DATABASE_URL="file:./dev.db"
```

---

## 3. Generate Prisma Client

```bash
npx prisma generate
```

---

## 4. Run Database Migration

```bash
npx prisma migrate dev --name init
```

---

## 5. Start Development Server

```bash
npm run dev
```

---
Deployment updated successfully.

# Project Philosophy

This project intentionally prioritizes:

* backend reliability
* scalable API architecture
* clean modular structure
* production-oriented design

instead of:

* unnecessary frontend complexity
* overengineering
* excessive features

---

# Future Improvements

Potential future enhancements:

* authentication
* real-time salary updates
* salary trend analytics
* AI-based compensation insights
* dashboard visualizations
* recommendation systems

---

# Evaluation Focus

This implementation is designed to demonstrate:

* backend engineering skills
* API architecture
* validation systems
* normalization pipelines
* aggregation handling
* scalable backend design

within a production-oriented MVP scope.