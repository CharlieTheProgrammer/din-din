import { db } from '../providers/Fire';

export class Recipe {
	genre = null;
	
	constructor(name) {
		this.name = name;
		
		// When we create a new recipe, we should also save it?
	}

	static create(name) {
		// need to wire up DB functions here
		let recipe = new Recipe(name);
		db.collection('recipes').add()
	}


}
