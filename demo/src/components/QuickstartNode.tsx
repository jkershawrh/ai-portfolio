import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface QuickstartNodeData {
  label: string;
  layer: number;
  layerColor: string;
  intel?: string;
  domain: string;
  selected: boolean;
  dimmed: boolean;
}

const QuickstartNode: React.FC<{ data: QuickstartNodeData }> = ({ data }) => {
  const { label, layerColor, intel, domain, selected, dimmed } = data;

  return (
    <>
      <div
        style={{
          background: 'var(--surface-1)',
          border: selected ? `1px solid ${layerColor}` : '1px solid var(--border)',
          borderLeft: `3px solid ${layerColor}`,
          borderRadius: 10,
          width: 170,
          padding: '8px 10px',
          opacity: dimmed ? 0.3 : 1,
          transform: selected ? 'scale(1.04)' : 'scale(1)',
          transition: 'opacity 0.25s ease, transform 0.2s ease, border-color 0.2s ease',
        }}
      >
        <div
          style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 5,
            lineHeight: 1.3,
          }}
        >
          {label}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
          {intel && (
            <span
              style={{
                fontFamily: "'Red Hat Mono', monospace",
                fontSize: 9,
                fontWeight: 600,
                color: '#fff',
                background: 'var(--rh-teal)',
                padding: '1px 5px',
                borderRadius: 4,
                lineHeight: '14px',
              }}
            >
              {intel}
            </span>
          )}
          <span
            style={{
              fontFamily: "'Red Hat Mono', monospace",
              fontSize: 9,
              color: 'var(--text-disabled)',
            }}
          >
            {domain}
          </span>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
};

export default React.memo(QuickstartNode);
