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
