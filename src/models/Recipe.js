import { db } from '../providers/Fire';

export class Recipe {
	genre = null;

	constructor(name, user_id = null) {
		this.name = name;
		this.user_id = user_id || window.user.id || null;
		console.log(this);
	}

	save() {}

	static async create(name = null, mealApiDTO = null) {
		let recipe = null;
		if (name) recipe = new Recipe(name);
		// Get name from mealApi Object
		else
			recipe = new Recipe({
				name: mealApiDTO.strMeal,
			});
		return db.ref('recipes').push(recipe);
	}

	static async delete(recipe) {
		return db.ref('recipes/' + recipe['.key']).remove();
	}

	static async getAll() {
		try {
			const uid = window.user.id;
			const ref = await db.ref('recipes');

			// Need to implement the user id in the relationship
			// const snapshot = await ref.equalTo(uid, 'uid').once('value');
			const snapshot = await ref.once('value');

			console.log(snapshot.toJSON());
			
			return snapshot.toJSON();

		} catch (error) {
			console.log('Error occured whuile fetching.', error);
		}
	}
}
