export type NodeCategory = 'sovereignty' | 'platform' | 'quickstart' | 'product' | 'hardware' | 'oss'

export type QuickstartDomain =
  | 'governance'
  | 'inference'
  | 'agents'
  | 'reasoning'
  | 'observability'
  | 'domain'

export interface PortfolioItem {
  id: string
  name: string
  type: NodeCategory
  org: 'jkershawrh' | 'rhpds' | 'redhat' | 'intel' | 'upstream'
  layer: number
  domain?: QuickstartDomain
  description: string
  url?: string
  feedsInto?: string[]
  poweredBy?: string[]
  intel?: string
}

export interface StackLayer {
  id: number
  name: string
  title: string
  color: string
  description: string
}
