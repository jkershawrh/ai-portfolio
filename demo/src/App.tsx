import Header from './components/Header'
import StackCanvas from './components/StackCanvas'
import DetailPanel from './components/DetailPanel'
import LayerFilter from './components/LayerFilter'
import CategoryToggle from './components/CategoryToggle'
import Legend from './components/Legend'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, paddingTop: 48, position: 'relative' }}>
        <StackCanvas />
        <DetailPanel />
        <LayerFilter />
        <CategoryToggle />
        <Legend />
      </div>
    </div>
  )
}
