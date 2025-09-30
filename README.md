Perfect 👍 Here’s the rebuilt **README.md** for your demo repo — now with **all TODO answers and explanations filled in**. It’s structured so you can hand it to students, demo the TODOs live, and they can see the reasoning behind each one.

---

# 🧪 Next.js + AntD — Three-File Mini Demo

This lab shows how to use **Next.js (App Router)** with **Ant Design (AntD)** and call an API with query params.
Students only need to touch **three files**:

1. `app/layout.tsx` → global wrapper (1 TODO)
2. `app/page.tsx` → interactive page (many TODOs, each 1–2 lines)
3. `.env.local` → API base URL (1 TODO)

---

## 0) Scaffold & install

```bash
npx create-next-app@latest next-antd-mini --typescript --app --eslint
cd next-antd-mini
npm i antd @ant-design/cssinjs
```

> **Why:** App Router + TypeScript demonstrate modern Next.js.
> AntD gives prebuilt components so we focus on data + logic instead of CSS.

---

## 1) Drop in these three files

* `app/layout.tsx` — global shell
* `app/page.tsx` — interactive page
* `.env.local` — API base

Then run:

```bash
npm run dev
# open http://localhost:3000
```

---

## Key Next.js concepts (for your short lecture)

### `app/layout.tsx` (Server Component)

* Wraps every route under `app/`.
* Only runs on the server, not in the browser.
* Good place for global CSS, fonts, or layout skeletons.

### `app/page.tsx` (Client Component)

* Adding `'use client'` makes it a **Client Component**, so it can:

  * use React hooks (`useState`, `useEffect`)
  * respond to browser events
  * access client-visible env vars (`NEXT_PUBLIC_*`)

### Env var rule

* Client Components need `NEXT_PUBLIC_…` prefix (gets bundled for browser).
* Server-only secrets should **not** have that prefix.

### Caching

* In fetch: `{ cache: 'no-store' }` forces a fresh request every time.
* Without it, Next may cache aggressively.

---

# File 1: `app/layout.tsx`

```tsx
// TODO(1): import AntD reset css (ONE LINE)

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Mini Demo',
  description: 'Next + AntD + API params via env',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### ✅ TODO(1) Answer

```ts
import 'antd/dist/reset.css';
```

**Why:** Loads global AntD styles. In App Router, global CSS must be imported in a `layout.tsx`.

---

# File 2: `app/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Input, InputNumber, Button, List, Empty, Space, Typography, Spin, Alert } from 'antd';
const { Title } = Typography;

// TODO(2): read API base from env (ONE LINE) – fallback to PokeAPI

export default function Page() {
  // --- STATE SETUP ---
  // TODO(3a): search text state (ONE LINE)
  // TODO(3b): limit (number) state with default 10 (ONE LINE)
  // TODO(3c): items array state (ONE LINE)
  // TODO(3d): loading boolean state (ONE LINE)
  // TODO(3e): error string-or-null state (ONE LINE)

  async function fetchData() {
    // small UX helpers
    // TODO(4a): set loading true and clear err (ONE LINE)
    try {
      // --- FETCH ---
      // TODO(4b): build URL with query param (ONE LINE)

      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // --- TRANSFORM ---
      // TODO(4c): pull names array from data.results (ONE LINE)

      // TODO(4d): client filter names by q (ONE LINE)

      // TODO(4e): save filtered array to state (ONE LINE)
    } catch (e: any) {
      // TODO(4f): set error message to state (ONE LINE)
    } finally {
      // TODO(4g): set loading false (ONE LINE)
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      {/* TODO(5): Title element (ONE LINE) */}

      <p>Type a filter and choose a limit (query param), then click Fetch.</p>

      <Space align="start" style={{ marginBottom: 12 }}>
        {/* TODO(6a): Input for q (ONE LINE) */}

        {/* InputNumber is optional; included for numeric param demo */}
        <InputNumber min={1} max={1000} value={limit} onChange={(v) => setLimit(Number(v ?? 10))} />

        {/* TODO(6b): Button to run fetchData (ONE LINE) */}
      </Space>

      {loading && <Spin />}
      {err && <Alert type="error" message={err} style={{ marginBottom: 12 }} />}

      {/* TODO(7): conditional Empty vs List block (PASTE 5-7 lines) */}
    </div>
  );
}
```

---

## ✅ Answers for TODOs

### TODO(2) — Env base

```ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://pokeapi.co/api/v2';
```

### TODO(3a–3e) — State

```ts
const [q, setQ] = useState('');
const [limit, setLimit] = useState<number>(10);
const [items, setItems] = useState<string[]>([]);
const [loading, setLoading] = useState(false);
const [err, setErr] = useState<string | null>(null);
```

### TODO(4a–4g) — Fetch flow

```ts
setLoading(true); setErr(null);

const url = `${API_BASE}/pokemon?limit=${limit}`;

const names: string[] = (data.results ?? []).map((x: any) => x.name);

type PokemonResult = { name: string; url: string };
const names: string[] = (data.results ?? []).map((x: PokemonResult) => x.name);

setItems(filtered);

setErr(e.message ?? 'Unknown error');

setLoading(false);
```

### TODO(5) — Title

```tsx
<Title level={3}>Mini Demo: AntD + API Params via .env</Title>
```

### TODO(6a) — Input

```tsx
<Input
  placeholder="filter (e.g., pi, char)"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  style={{ width: 260 }}
/>
```

### TODO(6b) — Button

```tsx
<Button type="primary" onClick={fetchData}>Fetch</Button>
```

### TODO(7) — Empty vs List

```tsx
{(!loading && !err && items.length === 0) ? (
  <Empty description="No data" />
) : (
  <List
    bordered
    dataSource={items}
    renderItem={(name) => <List.Item>{name}</List.Item>}
  />
)}
```

---

# File 3: `.env.local`

```env
# TODO(8): set public API base (ONE LINE). Must start with NEXT_PUBLIC_ to be readable in the browser.
NEXT_PUBLIC_API_BASE=https://pokeapi.co/api/v2
```

**Why:** Client code can only access env vars prefixed with `NEXT_PUBLIC_`. Restart `npm run dev` after editing.

---

## Demo Flow (what to show live)

1. Show `.env.local` → explain `NEXT_PUBLIC_`.
2. Change limit from 10 → 100 → show URL with `?limit=100`.
3. Type “pi” → watch filtering in real time.
4. Break the API URL → trigger error → see `<Alert>`.
5. Clear input → show Empty state.

---

✅ This README teaches both **React state flow** and **Next.js App Router basics**, with AntD sprinkled in to make the UI look polished.

---

Do you want me to package this back into a **zip with the updated README + source files**, like before, so you can drop it straight into your lab repo?
