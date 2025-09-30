# 🧪 Next.js + AntD — Two‑File Mini Demo

A **super simple** lab demo that touches only **two files** and uses short **TODOs (1–2 lines each)**.  
Students will:
- Scaffold a Next.js app with `npx`
- Add Ant Design (AntD)
- Call a public API **with a query param**
- See core Next.js App Router concepts (client component, fetch, caching note)

---

## 0) Create the app & install AntD

```bash
npx create-next-app@latest next-antd-mini --typescript --app --eslint
cd next-antd-mini
npm i antd @ant-design/cssinjs
```

> **Why**: `create-next-app` scaffolds a Next.js project. We choose **TypeScript** and **App Router** so the files here drop in cleanly. AntD gives us polished UI components quickly.

---

## 1) Replace just TWO files

Put these two files into your project (overwriting existing ones):

- `app/layout.tsx` — global HTML shell
- `app/page.tsx` — the only page in this demo

Then run:

```bash
npm run dev
# open http://localhost:3000
```

---

# File 1: `app/layout.tsx` (ONE TODO)

```tsx
// TODO(1): import AntD reset css (ONE LINE)

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Mini Demo',
  description: 'Next + AntD + API params',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### ✅ TODO(1) — Answer & Explanation
**Answer line:**  
```ts
import 'antd/dist/reset.css';
```
**What it does:** Imports AntD’s baseline CSS so AntD components render with consistent styles. In the App Router, `app/layout.tsx` wraps **every page**, so global CSS belongs here.

> **Next concept**: `layout.tsx` is a **Server Component** by default and defines the HTML scaffold for all routes under `app/`. Global CSS imports must be in a layout or in `globals.css`.

---

# File 2: `app/page.tsx` (FIVE tiny TODOs)

```tsx
'use client';

import { useState } from 'react';
import { Input, InputNumber, Button, List, Empty, Space, Typography, Spin, Alert } from 'antd';
const { Title } = Typography;

// TODO(2): set API base (ONE LINE) – using PokeAPI so no keys needed

export default function Page() {
  const [q, setQ] = useState('');          // search text
  const [limit, setLimit] = useState<number>(10);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true); setErr(null);
    try {
      // TODO(3): build URL with a query param (ONE LINE)

      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // TODO(4): set names from results (ONE LINE)

      // TODO(5): simple client-side filter by q (ONE LINE)

      setItems(filtered);
    } catch (e: any) {
      setErr(e.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <Title level={3}>Mini Demo: AntD + API Params</Title>
      <p>Type a filter and choose a limit (query param), then click Fetch.</p>

      <Space align="start" style={{ marginBottom: 12 }}>
        <Input placeholder="filter (e.g., pi, char)" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 260 }} />
        <InputNumber min={1} max={1000} value={limit} onChange={(v) => setLimit(Number(v ?? 10))} />
        <Button type="primary" onClick={fetchData}>Fetch</Button>
      </Space>

      {loading && <Spin />}
      {err && <Alert type="error" message={err} style={{ marginBottom: 12 }} />}

      {(!loading && !err && items.length === 0) ? (
        <Empty description="No data" />
      ) : (
        <List
          bordered
          dataSource={items}
          // TODO(6): render each item (ONE LINE)
        />
      )}
    </div>
  );
}
```

### ✅ TODO(2) — Answer & Explanation
**Answer line:**
```ts
const API_BASE = 'https://pokeapi.co/api/v2';
```
**What it does:** Sets a constant for the upstream API. Keeping the base URL separate mirrors real projects (later you’d move this to env vars).

**Next concept:** Client Components (marked with `'use client'`) run in the browser. We’re doing an interaction-driven fetch here, so a Client Component makes sense.

---

### ✅ TODO(3) — Answer & Explanation
**Answer line:**
```ts
const url = `${API_BASE}/pokemon?limit=${limit}`;
```
**What it does:** Builds the request URL and injects a **query parameter** (`limit`). The fetch will return `limit` number of Pokémon from the API.

**Next concept:** Query params are how the client passes options to an endpoint. You can open DevTools Network tab to show the request URL.

---

### ✅ TODO(4) — Answer & Explanation
**Answer line:**
```ts
const names: string[] = (data.results ?? []).map((x: any) => x.name);
```
**What it does:** Normalizes the API response to just an array of `name` strings. Defensive `?? []` avoids crashes if the response is missing fields.

**Next concept:** Shape your data ASAP; small, typed arrays are much easier to render and test.

---

### ✅ TODO(5) — Answer & Explanation
**Answer line:**
```ts
const filtered = q ? names.filter((n) => n.includes(q.toLowerCase())) : names;
```
**What it does:** Performs a **client-side** filter so students see immediate feedback without extra API complexity. `q` is the controlled input value.

**Next concept:** Start with client-side filtering; if performance becomes a problem, move filtering to an API route (server).

---

### ✅ TODO(6) — Answer & Explanation
**Answer line inside `<List />`:**
```tsx
renderItem={(name) => <List.Item>{name}</List.Item>}
```
**What it does:** Renders each string as a simple AntD list row.

**Next concept:** AntD gives polished primitives (`List`, `Input`, `Button`) so you can focus on data flow rather than CSS.

---

## What to type during the demo
- In the input: `pi`, `char`, `squirt`, etc.
- Change **limit** (e.g., `100`) to demonstrate query params changing the network request.

---

## Where this teaches “Next.js” (explicitly)
- **App Router**: `app/layout.tsx` (global shell) and `app/page.tsx` (route `/`).
- **Client vs Server**: `'use client'` on the page to enable state, events, and browser `fetch`.
- **Caching hint**: `{ cache: 'no-store' }` ensures each click re-fetches (good for demos).
- **Global CSS**: Lives in a layout (server) so components render correctly everywhere.

---

## Full source (drop-in)

### `app/layout.tsx`
```tsx
// TODO(1): import AntD reset css (ONE LINE)

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Mini Demo',
  description: 'Next + AntD + API params',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### `app/page.tsx`
```tsx
'use client';

import { useState } from 'react';
import { Input, InputNumber, Button, List, Empty, Space, Typography, Spin, Alert } from 'antd';
const { Title } = Typography;

// TODO(2): set API base (ONE LINE) – using PokeAPI so no keys needed

export default function Page() {
  const [q, setQ] = useState('');          // search text
  const [limit, setLimit] = useState<number>(10);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true); setErr(null);
    try {
      // TODO(3): build URL with a query param (ONE LINE)

      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      const data = await res.json();

      // TODO(4): set names from results (ONE LINE)

      // TODO(5): simple client-side filter by q (ONE LINE)

      setItems(filtered);
    } catch (e: any) {
      setErr(e.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <Title level={3}>Mini Demo: AntD + API Params</Title>
      <p>Type a filter and choose a limit (query param), then click Fetch.</p>

      <Space align="start" style={{ marginBottom: 12 }}>
        <Input placeholder="filter (e.g., pi, char)" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 260 }} />
        <InputNumber min={1} max={1000} value={limit} onChange={(v) => setLimit(Number(v ?? 10))} />
        <Button type="primary" onClick={fetchData}>Fetch</Button>
      </Space>

      {loading && <Spin />}
      {err && <Alert type="error" message={err} style={{ marginBottom: 12 }} />}

      {(!loading && !err && items.length === 0) ? (
        <Empty description="No data" />
      ) : (
        <List
          bordered
          dataSource={items}
          // TODO(6): render each item (ONE LINE)
        />
      )}
    </div>
  );
}
```

---

Happy teaching! 🎓
