import { Node } from './node.js'
import { Way } from './way.js'

// takes parsed JSON data from Overpass API
export function parseOSMdata(data){
	const nodes = new Map()
	data.elements.filter( el => el.type == 'node' ).forEach( el => {
		let node = new Node(el)
		nodes.set(node.id,node)
	} )
	const ways = new Map()
	data.elements.filter( el => el.type == 'way' ).forEach( el => {
		let way = new Way(el,nodes)
		ways.set(way.id,way)
	} )
	return { 
		nodes: [ ...nodes.values() ], 
		ways: [ ...ways.values() ]
	}
}
