export class Element {
	#id; #tags; #type;
	constructor(id,type,tags){
		this.#id = id
		this.#tags = tags
		this.#type = type
	}
	get id(){ return this.#id }
}
