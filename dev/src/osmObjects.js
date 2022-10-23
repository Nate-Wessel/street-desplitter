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
	get lon(){ return this.#lon }
	get lat(){ return this.#lat }
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
	get originalGeometry(){
		return {
			type: 'Feature',
			geometry: {
				type: 'LineString',
				coordinates: [
					[ this.#a.lon, this.#a.lat ],
					[ this.#b.lon, this.#b.lat ]
				]
			}
		}
	}
}
