import { useEffect, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { bbox2geojson } from './bboxOps.js'
import { width, height } from './constants.js'

const padding = 40
const dPad = padding*2

export default function SVGMap({osmData,bbox}){
	const [ { proj }, setProjection ] = useState({proj:geoMercator()})
	const pathGen = geoPath(proj)
	useEffect(()=>{
		if(!bbox) return;
		setProjection( ({proj}) => {
			return { proj: proj.fitExtent(
				[[-width/2,-height/2],[width/2,height/2]],
				bbox2geojson(bbox)
			) }
		} )
	},[bbox])
	return (
		<svg viewBox={`${-(width+dPad)/2}, ${-(height+dPad)/2}, ${width+dPad}, ${height+dPad}`}
			width={width+2*padding} height={height+2*padding}>
			{ osmData && 
				<g className="nodes">
					{osmData.nodes.map( ({id,lon,lat}) => {
						let [x,y] = proj([lon,lat])
						return <circle key={id} cx={x} cy={y} r={3}/>
					} )}
				</g>
			}
			{ osmData && 
				<g className="edges">
					{osmData.edges.map( ({source,target},i) => {
						let [x1,y1] = proj([source.lon,source.lat])
						let [x2,y2] = proj([target.lon,target.lat])
						return (
							<path key={i}
								stroke="grey" strokeWidth="1px"
								d={`M${x1} ${y1} L${x2} ${y2}`}
							/>
						)
					} )}
				</g>
			}
			{ bbox && 
				<path d={pathGen(bbox2geojson(bbox))} 
					style={{fill:'none',stroke:'red'}}/>
			}
		</svg>
	)
}
