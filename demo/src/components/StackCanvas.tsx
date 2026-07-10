import React, { useMemo, useCallback, useEffect } from 'react'
import { ReactFlow, Background, type Node, type Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { PORTFOLIO } from '@/data/portfolio'
import { LAYER_MAP } from '@/data/layers'
import { computeLayout } from '@/lib/layout'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import SovereigntyNode from './SovereigntyNode'
import PlatformNode from './PlatformNode'
import QuickstartNode from './QuickstartNode'
import ProductNode from './ProductNode'

const nodeTypes = {
  sovereignty: SovereigntyNode,
  platform: PlatformNode,
  quickstart: QuickstartNode,
  product: ProductNode,
}

const CANVAS_WIDTH = 2400

export default function StackCanvas() {
  const { selectedId, activeLayer, showProducts, showHardware, showOss, setSelected, setActiveLayer, resetFilters } = usePortfolioStore()

  const positions = useMemo(() => computeLayout(PORTFOLIO, CANVAS_WIDTH), [])

  const visibleItems = useMemo(() => {
    return PORTFOLIO.filter(item => {
      if (item.type === 'product') return showProducts
      if (item.type === 'hardware') return showHardware
      if (item.type === 'oss') return showOss
      return true
    })
  }, [showProducts, showHardware, showOss])

  const selectedItem = selectedId ? PORTFOLIO.find(p => p.id === selectedId) : null
  const highlightedIds = useMemo(() => {
    if (!selectedItem) return null
    const ids = new Set<string>([selectedItem.id])
    if (selectedItem.feedsInto) selectedItem.feedsInto.forEach(id => ids.add(id))
    PORTFOLIO.forEach(p => {
      if (p.feedsInto?.includes(selectedItem.id)) ids.add(p.id)
    })
    return ids
  }, [selectedItem])

  const nodes: Node[] = useMemo(() => {
    return visibleItems.map(item => {
      const pos = positions.get(item.id) ?? { x: 0, y: 0 }
      const layer = LAYER_MAP[item.layer]
      const layerColor = layer?.color ?? '#555'

      const isDimmed = (activeLayer !== null && item.layer !== activeLayer && item.type !== 'sovereignty') ||
                       (highlightedIds !== null && !highlightedIds.has(item.id))
      const isSelected = selectedId === item.id

      const connectionCount = item.type === 'platform'
        ? PORTFOLIO.filter(p => p.feedsInto?.includes(item.id)).length
        : 0

      let nodeType = item.type as string
      if (item.type === 'hardware' || item.type === 'oss') nodeType = 'product'

      return {
        id: item.id,
        type: nodeType,
        position: pos,
        data: {
          label: item.name,
          org: item.org,
          layer: item.layer,
          layerColor,
          description: item.description,
          intel: item.intel,
          domain: item.domain ?? '',
          nodeType: item.type,
          connectionCount,
          selected: isSelected,
          dimmed: isDimmed,
        },
      }
    })
  }, [visibleItems, positions, selectedId, activeLayer, highlightedIds])

  const edges: Edge[] = useMemo(() => {
    const result: Edge[] = []

    PORTFOLIO.filter(p => p.type === 'platform' && p.id !== 'ai-sovereignty').forEach(platform => {
      result.push({
        id: `sovereignty-${platform.id}`,
        source: 'ai-sovereignty',
        target: platform.id,
        style: { stroke: '#ee000044', strokeWidth: 1.5 },
        animated: true,
      })
    })

    visibleItems.forEach(item => {
      if (!item.feedsInto) return
      item.feedsInto.forEach(targetId => {
        const isHighlighted = highlightedIds?.has(item.id) && highlightedIds?.has(targetId)
        result.push({
          id: `${item.id}-${targetId}`,
          source: item.id,
          target: targetId,
          style: {
            stroke: isHighlighted ? '#ee0000' : '#ffffff18',
            strokeWidth: isHighlighted ? 2 : 1,
          },
          animated: isHighlighted,
        })
      })
    })

    return result
  }, [visibleItems, highlightedIds])

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelected(selectedId === node.id ? null : node.id)
  }, [selectedId, setSelected])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelected(null); setActiveLayer(null) }
      if (e.key === 'r' || e.key === 'R') resetFilters()
      const num = parseInt(e.key)
      if (!isNaN(num) && num >= 0 && num <= 7) setActiveLayer(activeLayer === num ? null : num)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeLayer, setSelected, setActiveLayer, resetFilters])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={onNodeClick}
      onPaneClick={() => setSelected(null)}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      proOptions={{ hideAttribution: true }}
      nodesConnectable={false}
      elementsSelectable={false}
      minZoom={0.2}
      maxZoom={2}
    >
      <Background color="#1e1e1e" gap={30} />
    </ReactFlow>
  )
}
