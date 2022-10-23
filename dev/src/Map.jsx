import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiYmlrZTc1NiIsImEiOiJjbDdseG1jamowMjN2M3ZsbG5ydWMxZW5tIn0.Y6y8LKCuOhdk2qQimIXFww'
import Select from 'react-select'
import { cases } from './testCases.js'
import { getOsmData } from './getOSM.js'
import { bounds2bbox } from './bboxOps.js'
import SVGMap from './SVGMap.jsx'
import { width, height, padding } from './constants.js'
import { parseOSMdata } from './OSM/parse.js'

var map;

export default function Map(){
	const container = useRef()
	const [ testCase, setTestCase ] = useState(cases[0])
	const [ bbox, setBbox ] = useState(undefined)
	const [ osmData, setOsmData ] = useState(undefined)

	useEffect(() => {
		map = new mapboxgl.Map({
			container: container.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: testCase.center,
			zoom: testCase.zoom,
			attributionControl: false
		})
		setBbox(bounds2bbox( map.getBounds() ))
		map.on('move',()=>{
			setBbox(bounds2bbox( map.getBounds() ))
		})
	},[])
	useEffect(()=>{
		map.setZoom(testCase.zoom)
		map.setCenter(testCase.center)
	},[testCase])
	
	return (
		<div style={{maxWidth:`${width}px`}}>
			<Select 
				value={testCase}
				options={cases.map(c=>({value:c,...c}))}
				onChange={setTestCase}
			/>
			<br/>
			<div ref={container} className="map-container"
				style={{
					height:`${height}px`,
					width:`${width}px`,
					margin:`${padding}px`
				}}/>
			<br/>
			<button onClick={()=>updateData(bbox)}>
				get data
			</button><br/>
			<br/>
			<SVGMap {...{osmData,bbox}}/>
		</div>
	)
	function updateData(bbox){
		getOsmData(bbox).then( data => setOsmData( parseOSMdata(data) ) )
	}
}
