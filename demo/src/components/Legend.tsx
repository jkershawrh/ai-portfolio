import React from 'react'

const LEGEND_ITEMS = [
  { label: 'Platform', color: 'var(--node-platform)', style: 'solid' },
  { label: 'Quickstart', color: 'var(--text-dim)', style: 'solid' },
  { label: 'Red Hat Product', color: 'var(--node-product)', style: 'dashed' },
  { label: 'Intel Hardware', color: 'var(--node-hardware)', style: 'dashed' },
  { label: 'OSS Project', color: 'var(--node-oss)', style: 'dashed' },
]

export default function Legend() {
  return (
    <div style={{
      position: 'fixed', bottom: 12, left: 12, zIndex: 100,
      display: 'flex', gap: 12, background: 'var(--surface-1)',
      border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px',
    }}>
      {LEGEND_ITEMS.map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 12, height: 8, borderRadius: 2,
            border: `2px ${item.style} ${item.color}`,
            background: item.style === 'solid' ? item.color + '33' : 'transparent',
          }} />
          <span style={{
            fontSize: 9, fontFamily: "'Red Hat Mono', monospace",
            color: 'var(--text-disabled)', letterSpacing: 0.5,
          }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
