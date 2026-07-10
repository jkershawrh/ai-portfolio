import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface PlatformNodeData {
  label: string;
  org: string;
  layer: number;
  layerColor: string;
  description: string;
  connectionCount: number;
  selected: boolean;
  dimmed: boolean;
}

const PlatformNode: React.FC<{ data: PlatformNodeData }> = ({ data }) => {
  const {
    label,
    org,
    layer,
    layerColor,
    connectionCount,
    selected,
    dimmed,
  } = data;

  return (
    <>
      <div
        style={{
          background: 'var(--surface-1)',
          border: selected ? '1px solid var(--node-platform)' : '1px solid var(--border)',
          borderLeft: '3px solid var(--node-platform)',
          borderRadius: 10,
          width: 200,
          padding: '10px 12px',
          opacity: dimmed ? 0.3 : 1,
          transform: selected ? 'scale(1.04)' : 'scale(1)',
          transition: 'opacity 0.25s ease, transform 0.2s ease, border-color 0.2s ease',
        }}
      >
        <div
          style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {label}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "'Red Hat Mono', monospace",
              fontSize: 9,
              color: 'var(--text-dim)',
              background: 'var(--surface-2)',
              padding: '1px 5px',
              borderRadius: 4,
            }}
          >
            {org}
          </span>

          <span
            style={{
              fontFamily: "'Red Hat Mono', monospace",
              fontSize: 9,
              fontWeight: 600,
              color: '#fff',
              background: layerColor,
              padding: '1px 6px',
              borderRadius: 8,
              lineHeight: '16px',
            }}
          >
            L{layer}
          </span>
        </div>

        <div
          style={{
            fontFamily: "'Red Hat Mono', monospace",
            fontSize: 9,
            color: 'var(--text-disabled)',
          }}
        >
          {connectionCount} quickstart{connectionCount !== 1 ? 's' : ''}
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default React.memo(PlatformNode);
