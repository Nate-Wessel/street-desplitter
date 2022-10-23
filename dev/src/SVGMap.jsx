import { useEffect, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { bbox2geojson } from './bboxOps.js'
import { width, height, padding } from './constants.js'

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
			width={width+2*padding} height={height+2*padding}
			style={{backgroundColor:"#0001"}}>
			{ osmData && 
				<g className="nodes">
					{osmData.nodes.map( node => {
						let [x,y] = proj(node.coordinates)
						return (
							<circle key={node.id} 
								cx={x} cy={y} r={3} 
								fill="#F008" stroke="crimson"
							/>
						)
					} )}
				</g>
			}
			{ osmData && 
				<g className="edges">
					{osmData.edges.map( segment => {
						return (
							<path key={segment.id}
								stroke="grey" strokeWidth="1px"
								d={pathGen(segment.originalGeometry)}
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
