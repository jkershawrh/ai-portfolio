import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import { PORTFOLIO } from '@/data/portfolio'
import { LAYER_MAP } from '@/data/layers'

const TYPE_LABELS: Record<string, string> = {
  sovereignty: 'NARRATIVE',
  platform: 'PLATFORM',
  quickstart: 'QUICKSTART',
  product: 'RED HAT PRODUCT',
  hardware: 'INTEL HARDWARE',
  oss: 'OSS PROJECT',
}

const TYPE_COLORS: Record<string, string> = {
  sovereignty: 'var(--rh-red)',
  platform: 'var(--node-platform)',
  quickstart: 'var(--text-dim)',
  product: 'var(--node-product)',
  hardware: 'var(--node-hardware)',
  oss: 'var(--node-oss)',
}

export default function DetailPanel() {
  const { selectedId, setSelected } = usePortfolioStore()
  const item = selectedId ? PORTFOLIO.find(p => p.id === selectedId) : null

  const connections = item?.feedsInto
    ? item.feedsInto.map(id => PORTFOLIO.find(p => p.id === id)).filter(Boolean)
    : []

  const feeders = item
    ? PORTFOLIO.filter(p => p.feedsInto?.includes(item.id))
    : []

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            position: 'fixed', top: 48, right: 0, bottom: 0, width: 320, zIndex: 90,
            background: 'var(--surface-1)', borderLeft: '1px solid var(--border)',
            padding: 20, overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{
                fontSize: 9, fontWeight: 700, fontFamily: "'Red Hat Mono', monospace",
                color: TYPE_COLORS[item.type], letterSpacing: 1.5, textTransform: 'uppercase',
                marginBottom: 4,
              }}>{TYPE_LABELS[item.type]}</div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Red Hat Display', sans-serif" }}>
                {item.name}
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: 'none', border: 'none', color: 'var(--text-dim)',
                fontSize: 18, cursor: 'pointer', padding: 4,
              }}
            >x</button>
          </div>

          <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {item.description}
          </div>

          {item.layer >= 0 && LAYER_MAP[item.layer] && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'var(--surface-2)', borderRadius: 6, padding: '8px 12px',
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: 3,
                background: LAYER_MAP[item.layer].color,
              }} />
              <span style={{
                fontSize: 11, fontFamily: "'Red Hat Mono', monospace", color: 'var(--text-dim)',
              }}>Layer {item.layer}: {LAYER_MAP[item.layer].title}</span>
            </div>
          )}

          {item.intel && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--rh-teal-dim)', borderRadius: 4, padding: '4px 10px',
              alignSelf: 'flex-start',
            }}>
              <span style={{
                fontSize: 10, fontWeight: 700, fontFamily: "'Red Hat Mono', monospace",
                color: 'var(--rh-teal)',
              }}>{item.intel}</span>
            </div>
          )}

          {item.org !== 'redhat' && item.org !== 'intel' && item.org !== 'upstream' && (
            <div style={{
              fontSize: 10, fontFamily: "'Red Hat Mono', monospace", color: 'var(--text-disabled)',
            }}>
              {item.org === 'rhpds' ? 'rhpds/' : 'jkershawrh/'}{item.id}
            </div>
          )}

          {connections.length > 0 && (
            <div>
              <div style={{
                fontSize: 9, fontWeight: 700, fontFamily: "'Red Hat Mono', monospace",
                color: 'var(--rh-red)', letterSpacing: 1.5, marginBottom: 6,
              }}>FEEDS INTO</div>
              {connections.map(c => c && (
                <div
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  style={{
                    padding: '6px 10px', borderRadius: 4, cursor: 'pointer',
                    background: 'var(--surface-2)', marginBottom: 4,
                    fontSize: 12, color: 'var(--text-secondary)',
                    transition: 'background 0.15s',
                  }}
                >{c.name}</div>
              ))}
            </div>
          )}

          {feeders.length > 0 && (
            <div>
              <div style={{
                fontSize: 9, fontWeight: 700, fontFamily: "'Red Hat Mono', monospace",
                color: 'var(--rh-green)', letterSpacing: 1.5, marginBottom: 6,
              }}>FED BY ({feeders.length})</div>
              {feeders.map(f => (
                <div
                  key={f.id}
                  onClick={() => setSelected(f.id)}
                  style={{
                    padding: '6px 10px', borderRadius: 4, cursor: 'pointer',
                    background: 'var(--surface-2)', marginBottom: 4,
                    fontSize: 12, color: 'var(--text-secondary)',
                    transition: 'background 0.15s',
                  }}
                >{f.name}</div>
              ))}
            </div>
          )}

          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', textAlign: 'center', padding: '8px 16px',
                borderRadius: 6, border: '1px solid var(--border)',
                fontSize: 12, fontFamily: "'Red Hat Mono', monospace",
                color: 'var(--text-secondary)', textDecoration: 'none',
                transition: 'border-color 0.15s',
                marginTop: 'auto',
              }}
            >View on GitHub</a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
