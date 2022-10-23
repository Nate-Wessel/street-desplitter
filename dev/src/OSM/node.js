import { Element } from './element.js'

export class Node extends Element {
	#lon; #lat;
	constructor({id,type,lat,lon,tags}){
		super(id,type,tags)
		this.#lat = lat
		this.#lon = lon
	}
	get coordinate(){ return [ this.#lon, this.#lat ] }
}
