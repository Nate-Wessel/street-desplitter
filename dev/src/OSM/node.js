import { Element } from './element.js'

export class Node extends Element {
	#lon; #lat; 
	#ways = new Map();
	constructor({id,type,lat,lon,tags}){
		super(id,type,tags)
		this.#lat = lat
		this.#lon = lon
	}
	get coordinate(){ return [ this.#lon, this.#lat ] }
	isPartOf(element){ this.#ways.set(element.id,element) }
}
