import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface ProductNodeData {
  label: string;
  nodeType: 'product' | 'hardware' | 'oss';
  description: string;
  selected: boolean;
  dimmed: boolean;
}

const typeConfig: Record<
  ProductNodeData['nodeType'],
  { color: string; label: string }
> = {
  product:  { color: '#0066cc', label: 'RED HAT' },
  hardware: { color: '#37a3a3', label: 'INTEL' },
  oss:      { color: '#63993d', label: 'OSS' },
};

const ProductNode: React.FC<{ data: ProductNodeData }> = ({ data }) => {
  const { label, nodeType, description, selected, dimmed } = data;
  const cfg = typeConfig[nodeType];

  return (
    <>
      <div
        style={{
          background: 'var(--surface-1)',
          border: selected ? `1px dashed ${cfg.color}` : '1px dashed var(--border)',
          borderLeft: `3px solid ${cfg.color}`,
          borderRadius: 10,
          width: 160,
          padding: '8px 10px',
          opacity: dimmed ? 0.3 : 1,
          transform: selected ? 'scale(1.04)' : 'scale(1)',
          transition: 'opacity 0.25s ease, transform 0.2s ease, border-color 0.2s ease',
        }}
      >
        <div
          style={{
            fontFamily: "'Red Hat Mono', monospace",
            fontSize: 9,
            fontWeight: 600,
            color: cfg.color,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 3,
          }}
        >
          {cfg.label}
        </div>

        <div
          style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontFamily: "'Red Hat Text', sans-serif",
            fontSize: 10,
            color: 'var(--text-dim)',
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
};

export default React.memo(ProductNode);
