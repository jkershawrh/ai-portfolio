import type { PortfolioItem, QuickstartDomain } from '@/types/PortfolioTypes'

const DOMAINS: QuickstartDomain[] = [
  'governance',
  'inference',
  'agents',
  'reasoning',
  'observability',
  'domain',
]

function spaceEvenly(count: number, width: number): number[] {
  if (count === 0) return []
  if (count === 1) return [width / 2]
  const gap = width / (count + 1)
  return Array.from({ length: count }, (_, i) => gap * (i + 1))
}

export function computeLayout(
  items: PortfolioItem[],
  canvasWidth: number,
): Map<string, { x: number; y: number }> {
  const pos = new Map<string, { x: number; y: number }>()

  const sovereignty = items.filter((i) => i.type === 'sovereignty')
  const platforms = items.filter((i) => i.type === 'platform')
  const middle = items.filter(
    (i) => i.type === 'product' || i.type === 'hardware' || i.type === 'oss',
  )
  const quickstarts = items.filter((i) => i.type === 'quickstart')

  // Sovereignty -- centered at y=50
  for (const item of sovereignty) {
    pos.set(item.id, { x: canvasWidth / 2, y: 50 })
  }

  // Platforms -- horizontal band at y=230
  const platX = spaceEvenly(platforms.length, canvasWidth)
  platforms.forEach((item, i) => {
    pos.set(item.id, { x: platX[i], y: 230 })
  })

  // Products / hardware / OSS -- horizontal band at y=430
  const midX = spaceEvenly(middle.length, canvasWidth)
  middle.forEach((item, i) => {
    pos.set(item.id, { x: midX[i], y: 430 })
  })

  // Quickstarts -- grouped by domain into columns at y=630+
  const colGap = canvasWidth / 7
  DOMAINS.forEach((domain, colIdx) => {
    const col = quickstarts.filter((i) => i.domain === domain)
    const cx = colGap * (colIdx + 1)
    col.forEach((item, row) => {
      pos.set(item.id, { x: cx, y: 630 + row * 70 })
    })
  })

  return pos
}
