import { Element } from './element.js'
import { WaySegment } from './waySegment.js'

export class Way extends Element {
	#nodes;
	#segments;
	constructor({id,type,nodes,tags},nodeMap){
		super(id,type,tags)
		this.#nodes = nodes.map( id => {
			const node = nodeMap.get(id)
			node.isPartOf(this)
			return node
		} )
		this.#segments = this.#nodes.map( (node,i) => {
			if( i == 0 ) return;
			return new WaySegment(this,this.#nodes[i-1],this.#nodes[i])
		} ).filter(v=>v)
	}
	get nodes(){
		return this.#nodes.map(n=>n.id)
	}
	get segments(){
		return this.#segments
	}
	get firstNode(){ return this.#nodes.at(0) }
	get lastNode(){ return this.#nodes.at(-1) }
	get oneWay(){ return this.tags?.oneway == 'yes' }
	get name(){ return this.tags?.name }
}
