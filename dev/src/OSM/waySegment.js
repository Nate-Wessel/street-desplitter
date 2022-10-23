export class WaySegment {
	#way; #a; #b;
	constructor(way,sourceNode,targetNode){
		this.#way = way
		this.#a = sourceNode
		this.#b = targetNode
	}
	get id(){ return `w${this.#way.id} from n${this.#a.id} to n${this.#b.id}` }
	get originalGeometry(){
		return {
			type: 'Feature',
			geometry: {
				type: 'LineString',
				coordinates: [ this.#a.coordinate, this.#b.coordinate ]
			}
		}
	}
}
