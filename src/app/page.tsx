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
