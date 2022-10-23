import { Element } from './element.js'
import { WaySegment } from './waySegment.js'

export class Way extends Element {
	#nodes;
	#segments;
	constructor({id,type,nodes,tags},nodeMap){
		super(id,type,tags)
		this.#nodes = nodes.map( id => nodeMap.get(id) )
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
}
