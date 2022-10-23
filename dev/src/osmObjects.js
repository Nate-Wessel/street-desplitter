class OSMobject {
	#id; #tags; #type;
	constructor(id,type,tags){
		this.#id = id
		this.#tags = tags
		this.#type = type
	}
	get id(){ return this.#id }
}

export class Node extends OSMobject {
	#lon; #lat;
	constructor({id,type,lat,lon,tags}){
		super(id,type,tags)
		this.#lat = lat
		this.#lon = lon
	}
	get coordinates(){ return [ this.#lon, this.#lat ] }
}

export class Way extends OSMobject {
	#nodeIDs;
	constructor({id,type,nodes,tags}){
		super(id,type,tags)
		this.#nodeIDs = nodes
	}
	get nodes(){
		return this.#nodeIDs
	}
}

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
				coordinates: [ this.#a.coordinates, this.#b.coordinates ]
			}
		}
	}
}
