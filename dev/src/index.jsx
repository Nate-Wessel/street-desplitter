import { createRoot } from 'react-dom/client'
import Map from './Map'

const container = document.querySelector('#root')
const root = createRoot(container)
root.render(<App/>)

function App(){
	return (<>
		<h1>Testing/dev code for OSM street merging tool</h1>
		<Map/>
	</>)
}
