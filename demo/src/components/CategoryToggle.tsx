import React from 'react'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

export default function CategoryToggle() {
  const { showProducts, showHardware, showOss, toggleProducts, toggleHardware, toggleOss } = usePortfolioStore()

  const toggles = [
    { label: 'Red Hat Products', active: showProducts, onClick: toggleProducts, color: 'var(--node-product)' },
    { label: 'Intel Hardware', active: showHardware, onClick: toggleHardware, color: 'var(--node-hardware)' },
    { label: 'OSS Projects', active: showOss, onClick: toggleOss, color: 'var(--node-oss)' },
  ]

  return (
    <div style={{
      position: 'fixed', top: 56, right: 12, zIndex: 100,
      display: 'flex', gap: 6,
    }}>
      {toggles.map(t => (
        <button
          key={t.label}
          onClick={t.onClick}
          style={{
            border: `1px solid ${t.active ? t.color : 'var(--border)'}`,
            borderRadius: 6, padding: '5px 12px',
            fontSize: 10, fontWeight: 600, fontFamily: "'Red Hat Mono', monospace",
            background: t.active ? t.color + '22' : 'var(--surface-1)',
            color: t.active ? t.color : 'var(--text-dim)',
            cursor: 'pointer', letterSpacing: 0.5, transition: 'all 0.15s',
          }}
        >{t.label}</button>
      ))}
    </div>
  )
}
