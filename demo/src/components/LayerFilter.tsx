import React from 'react'
import { LAYERS } from '@/data/layers'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

export default function LayerFilter() {
  const { activeLayer, setActiveLayer } = usePortfolioStore()

  return (
    <div style={{
      position: 'fixed', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 100,
      display: 'flex', gap: 4, background: 'var(--surface-1)', border: '1px solid var(--border)',
      borderRadius: 8, padding: 4,
    }}>
      <button
        onClick={() => setActiveLayer(null)}
        style={{
          ...btnStyle,
          background: activeLayer === null ? 'var(--rh-red)' : 'transparent',
          color: activeLayer === null ? '#fff' : 'var(--text-dim)',
        }}
      >ALL</button>
      {LAYERS.map(layer => (
        <button
          key={layer.id}
          onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
          style={{
            ...btnStyle,
            background: activeLayer === layer.id ? layer.color : 'transparent',
            color: activeLayer === layer.id ? '#fff' : 'var(--text-dim)',
            borderColor: activeLayer === layer.id ? layer.color : 'transparent',
          }}
          title={layer.title}
        >L{layer.id}</button>
      ))}
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  border: '1px solid transparent', borderRadius: 4, padding: '4px 10px',
  fontSize: 10, fontWeight: 700, fontFamily: "'Red Hat Mono', monospace",
  cursor: 'pointer', letterSpacing: 1, transition: 'all 0.15s',
}
