# Finance Dashboard

A modern, dark-themed finance dashboard UI built with React 18 and Vite. Track income, expenses, and financial insights with a professional "Bloomberg meets Notion" aesthetic.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)

---

## Overview

This project is a fully functional finance dashboard built as a frontend assignment. It demonstrates modern React patterns, clean component architecture, and a polished dark-themed design system.

**Key Approach:**
- Component-driven architecture with reusable UI primitives
- Global state management via React Context + useReducer (Redux-like pattern, no external library)
- Mock API service layer with simulated network latency
- localStorage persistence for data durability
- Fully responsive design: desktop sidebar + mobile bottom navigation

---

## Features

### Core
- **Dashboard** — KPI summary cards (Total Balance, Income, Expenses) with animated count-up numbers and delta badges
- **Balance Trend Chart** — Area chart showing cumulative monthly balance over 6 months
- **Spending Breakdown** — Donut chart with color-coded category segments and center total label
- **Transactions Table** — Full table with date, description, category badge, type badge, and colored amount
- **Search, Filter & Sort** — Text search, type/category dropdowns, sortable columns
- **Role-Based UI** — Viewer (read-only) / Admin (full CRUD) toggle in the header
- **Insights Page** — Key observations, monthly comparison bar chart, category spending breakdown with progress bars
- **Responsive Design** — Desktop sidebar (240px) + mobile bottom navigation bar
- **Empty State Handling** — Friendly UI when no data matches filters

### Optional Enhancements (All Implemented)
- **LocalStorage Persistence** — Transactions auto-save and reload across sessions
- **Mock API Integration** — Service layer (`src/services/`) with async functions and artificial delay for loading states
- **Animations & Transitions** — Staggered card entry, count-up numbers (800ms ease-out), chart draw animations, hover effects
- **CSV & JSON Export** — Download filtered transactions as CSV or JSON files
- **Advanced Filtering** — Date range picker, amount range inputs, multi-category support
- **Grouping** — Group transactions by Day, Month, or Category with sticky section headers
- **Active Filter Chips** — Dismissible badges showing all applied filters
- **Dark Mode** — Dark theme as default with refined design tokens

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS v3 | Utility-first CSS + design tokens |
| Recharts | Charts (Area, Pie, Bar) |
| Lucide React | Icon library (20+ icons used) |
| React Router DOM v6 | Client-side routing |
| React Context + useReducer | Global state management |
| DM Sans + DM Mono | Typography (Google Fonts) |

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Role Switching

Use the **segmented toggle** in the top-right corner of the header to switch between:

| Mode | Behavior |
|---|---|
| **Viewer** (Eye icon) | Read-only — can view dashboard, transactions, and insights |
| **Admin** (Shield icon) | Full CRUD — can add, edit, and delete transactions |

---

## Project Structure

```
finance-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                    # Static assets (logo)
│   ├── components/
│   │   ├── common/                # Reusable UI: Badge, Button, Card, Input, Modal, Select, Tooltip, EmptyState
│   │   ├── layout/                # AppLayout, Header, Sidebar, BottomNav
│   │   ├── dashboard/             # KPICard, BalanceTrendChart, SpendingDonut
│   │   ├── transactions/          # TransactionTable, TransactionRow, TransactionFilters, TransactionModal
│   │   └── insights/              # InsightCard, MonthlyComparison
│   ├── context/
│   │   ├── AppContext.jsx         # Global context provider
│   │   └── appReducer.js          # Reducer with 11 action types
│   ├── data/
│   │   ├── mockTransactions.js    # 50 sample transactions (6 months)
│   │   └── categories.js          # 10 category definitions with colors
│   ├── hooks/
│   │   ├── useAppState.js         # Context consumer hook
│   │   ├── useTransactions.js     # Filter, sort, group, active chips logic
│   │   ├── useInsights.js         # Derived analytics computations
│   │   └── useCountUp.js          # Number animation hook
│   ├── pages/
│   │   ├── DashboardPage.jsx      # Route: /
│   │   ├── TransactionsPage.jsx   # Route: /transactions
│   │   └── InsightsPage.jsx       # Route: /insights
│   ├── services/
│   │   └── transactionService.js  # Mock API with simulated delays
│   ├── utils/
│   │   ├── formatCurrency.js      # ₹ currency formatting
│   │   ├── formatDate.js          # Date display helpers
│   │   ├── calculateInsights.js   # Insight computation functions
│   │   ├── exportData.js          # CSV/JSON export
│   │   └── storage.js             # localStorage helpers
│   ├── styles/
│   │   └── globals.css            # Design tokens + animations
│   ├── App.jsx                    # Root component + Router
│   └── main.jsx                   # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Design Decisions

### Visual Theme
- **"Refined Dark Finance"** — Inspired by Bloomberg Terminal meets Notion's clean layout
- Near-black base (`#0D0F14`) with subtle blue tint for depth
- Electric teal accent (`#00D4AA`) for CTAs and active states
- Amber for income, Red for expenses — instantly recognizable financial semantics

### Typography
- **DM Sans** for headings and body text — clean, modern, professional
- **DM Mono** for ALL numbers — monospaced numerics prevent layout shift and create the "financial terminal" aesthetic

### State Architecture
- Single useReducer with 11 action types — predictable, traceable state transitions
- Service layer wraps data operations in async functions — ready for real API integration
- localStorage syncs on every transaction change — data persists across sessions

### Responsiveness
- Desktop (≥1024px): 240px sidebar + fluid content
- Mobile (<1024px): Bottom tab navigation, stacked cards, scrollable tables

---

## Mock Data

50 transactions across October 2024 — March 2025:
- **20% income** (Salary, Freelance, Investment returns)
- **80% expenses** (Food, Transport, Entertainment, Health, Shopping, Utilities)
- Amounts range from ₹119 to ₹65,000
- Realistic Indian context (Swiggy, Zomato, Flipkart, Metro, etc.)

---

## License

This project was built as a frontend developer internship assignment.
