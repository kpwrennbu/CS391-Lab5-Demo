'use client';

import { useState } from 'react';
import { Input, InputNumber, Button, List, Empty, Space, Typography, Spin, Alert } from 'antd';
const { Title } = Typography;

// TODO(2): read API base from env (ONE LINE) – fallback to PokeAPI
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://pokeapi.co/api/v2';

export default function Page() {
  // --- STATE SETUP ---
  // TODO(3a): search text state (ONE LINE)
  const [q, setQ] = useState('');

  // TODO(3b): limit (number) state with default 10 (ONE LINE)
  const [limit, setLimit] = useState<number>(10);

  // TODO(3c): items array state (ONE LINE)
  const [items, setItems] = useState<string[]>([]);

  // TODO(3d): loading boolean state (ONE LINE)
  const [loading, setLoading] = useState(false);

  // TODO(3e): error string-or-null state (ONE LINE)
  const [err, setErr] = useState<string | null>(null);
  
  async function fetchData() {
    // small UX helpers
    // TODO(4a): set loading true and clear err (ONE LINE)
    setLoading(true); 
    setErr(null);
    try {
      // --- FETCH ---
      // TODO(4b): build URL with query param (ONE LINE)
      const url = `${API_BASE}/pokemon?limit=${limit}`;

      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // --- TRANSFORM ---
      // TODO(4c): pull names array from data.results
      type PokemonResult = { name: string; url: string };
      const names: string[] = (data.results ?? []).map((x: PokemonResult) => x.name);
      // TODO(4d): client filter names by q (ONE LINE)
      const filtered = q ? names.filter((n) => n.includes(q.toLowerCase())) : names;
      // TODO(4e): save filtered array to state (ONE LINE)
      setItems(filtered);
    } catch (e) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr('Unknown error');
      }
}
 finally {
      // TODO(4g): set loading false (ONE LINE)
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      {/* TODO(5): Title element (ONE LINE) */}
      <Title level={3}>Mini Demo: AntD + API Params via .env</Title>
      <p>Type a filter and choose a limit (query param), then click Fetch.</p>

      <Space align="start" style={{ marginBottom: 12 }}>
        {/* TODO(6a): Input for q (ONE LINE) */}
        <Input
          placeholder="filter (e.g., pi, char)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ width: 260 }}
        />
        {/* InputNumber is optional; included for numeric param demo */}
        <InputNumber min={1} max={1000} value={limit} onChange={(v) => setLimit(Number(v ?? 10))} />

        {/* TODO(6b): Button to run fetchData (ONE LINE) */}
        <Button type="primary" onClick={fetchData}>Fetch</Button>
      </Space>

      {loading && <Spin />}
      {err && <Alert type="error" message={err} style={{ marginBottom: 12 }} />}

      {/* TODO(7): conditional Empty vs List block (PASTE 5-7 lines) */}
      {(!loading && !err && items.length === 0) ? (
        <Empty description="No data" />
      ) : (
        <List
          bordered
          dataSource={items}
          renderItem={(name) => <List.Item>{name}</List.Item>}
        />
      )}
    </div>
  );
}