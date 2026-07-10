import React from 'react';
import { Handle, Position } from '@xyflow/react';

const pulseKeyframes = `
@keyframes sovereigntyPulse {
  0%   { box-shadow: 0 0 8px rgba(238, 0, 0, 0.3), 0 0 16px rgba(238, 0, 0, 0.1); }
  50%  { box-shadow: 0 0 18px rgba(238, 0, 0, 0.6), 0 0 36px rgba(238, 0, 0, 0.25); }
  100% { box-shadow: 0 0 8px rgba(238, 0, 0, 0.3), 0 0 16px rgba(238, 0, 0, 0.1); }
}
`;

const SovereigntyNode: React.FC<{ data: Record<string, unknown> }> = () => {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div
        style={{
          background: 'var(--surface-1)',
          border: '2px solid var(--rh-red)',
          borderRadius: 14,
          width: 400,
          padding: '32px 24px',
          textAlign: 'center',
          animation: 'sovereigntyPulse 3s ease-in-out infinite',
        }}
      >
        <div
          style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}
        >
          AI Sovereignty
        </div>
        <div
          style={{
            fontFamily: "'Red Hat Text', sans-serif",
            fontSize: 13,
            color: 'var(--text-dim)',
            marginTop: 8,
          }}
        >
          Run AI on your own terms
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default React.memo(SovereigntyNode);
