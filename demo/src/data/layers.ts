import type { StackLayer } from '@/types/PortfolioTypes'

export const LAYERS: StackLayer[] = [
  { id: 0, name: 'L0', title: 'Hardware Trust',           color: '#0066cc', description: 'Cryptographic attestation from the CPU. Your compute is yours.' },
  { id: 1, name: 'L1', title: 'Platform',                 color: '#004080', description: 'OpenShift, RHEL AI, Confidential Containers. Your platform is yours.' },
  { id: 2, name: 'L2', title: 'Inference Infrastructure', color: '#006644', description: 'Model serving, routing, scheduling, placement. Your models run where you say.' },
  { id: 3, name: 'L3', title: 'Agent Runtime',            color: '#336600', description: 'Nano/micro/macro cascades, A2A, MCP, hardware-tiered dispatch.' },
  { id: 4, name: 'L4', title: 'Intelligence & Reasoning', color: '#997700', description: 'Hypothesis-driven reasoning, stability scoring, consensus, structured output.' },
  { id: 5, name: 'L5', title: 'Governance & Trust',       color: '#cc0000', description: 'Agent authority, adversarial falsification, identity, certification, immutable ledger.' },
  { id: 6, name: 'L6', title: 'Observability',            color: '#663399', description: 'Anomaly detection, drift detection, SLO forecasting, closed-loop feedback.' },
  { id: 7, name: 'L7', title: 'Experience & Operations',  color: '#555555', description: 'Operator consoles, compliance reporting, domain applications.' },
]

export const LAYER_MAP = Object.fromEntries(LAYERS.map(l => [l.id, l]))
