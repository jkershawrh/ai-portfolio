import React from 'react'

export default function Header() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 48, zIndex: 100,
      background: 'var(--surface-1)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12,
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%', background: 'var(--rh-red)',
        boxShadow: '0 0 8px var(--rh-red)',
      }} />
      <span style={{
        fontSize: 14, fontWeight: 700, fontFamily: "'Red Hat Display', sans-serif",
      }}>AI Sovereignty Portfolio</span>
      <span style={{
        fontSize: 11, color: 'var(--text-disabled)', fontFamily: "'Red Hat Mono', monospace",
      }}>48 repos across jkershawrh + rhpds</span>
    </div>
  )
}
