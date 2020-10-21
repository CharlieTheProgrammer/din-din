import { db } from '../providers/Fire';
import map from 'lodash/map';

export class BaseModel {
	constructor(modelName) {
		this.name = 'recipes';
	}

	getKey() {
		return this['.key'];
	}

	async save() {
		if (this.getKey()) {
			return this.constructor.updateOne(this);
		} else {
			return this.constructor.insertOne(this);
		}
	}

	async delete() {
		return this.constructor.deleteOne(this);
	}

	static turnAllIntoModels(objArr) {
		return map(objArr, (element, index) => {
			let modelInstance = new this(element);
			return this.addNonEnumerableIdToModel(index, modelInstance);
		});
	}

	static turnOneIntoModel(obj, key) {
		let modelInstance = new this(obj);
		return this.addNonEnumerableIdToModel(key, modelInstance);
	}

	static addNonEnumerableIdToModel(id, model) {
		return Object.defineProperty(model, '.key', {
			value: id,
			enumerable: false,
			configurable: true,
		});
	}

	/**
	 * Returns a count of the number of documents in a collection
	 */
	static async count() {
		try {
			const modelName = this.name.toLowerCase();
		} catch (error) {
			console.log('Error occured while performing operation', error);
		}
	}

	/**
	 * Deletes one document from collection
	 */
	static async deleteOne(doc) {
		try {
			const modelName = this.name.toLowerCase();
			return db.ref(modelName + '/' + doc['.key']).remove();
		} catch (error) {
			console.log('Error occured while performing operation', error);
		}
	}

	/**
	 * Find documents from collection
	 * @param query object
	 */
	static async find(key = null, value = null) {
		try {
			const modelName = this.name.toLowerCase();
			if (key && value) {
				var snapshot = await db
					.ref(modelName)
					.orderByChild(key)
					.equalTo(value)
					.once('value');
			} else {
				var snapshot = await db.ref(modelName).once('value');
			}
			return this.turnAllIntoModels(snapshot.toJSON());
		} catch (error) {
			console.log('Error occured while performing operation', error);
		}
	}

	/**
	 * Finds one document from collection
	 */
	static async findOne() {
		try {
			const modelName = this.name.toLowerCase();
		} catch (error) {
			console.log('Error occured while performing operation', error);
		}
	}

	/**
	 * Inserts one or many documents into a collection
	 * @param docs Array
	 */
	static async insert(docs) {
		try {
			const modelName = this.name.toLowerCase();
			let promises = docs.map((item) => db.ref(modelName).push(docs));
			return Promise.all(promises);
		} catch (error) {
			console.log('Error occured while performing operation', error);
		}
	}

	/**
	 * Inserts one document in a collection
	 */
	static async insertOne(doc) {
		try {
			const modelName = this.name.toLowerCase();
			return db.ref(modelName).push(doc);
		} catch (error) {
			console.log('Error occured while performing operation', error);
		}
	}

	/**
	 * Updates one or many documents in a collection
	 */
	static async update(doc) {
		try {
			const modelName = this.name.toLowerCase();
		} catch (error) {
			console.log('Error occured while performing operation', error);
		}
	}

	/**
	 * Updates one document in a collection
	 */
	static async updateOne(doc) {
		try {
			if (!doc['.key']) throw Error('Cannot update due to missing key.', doc);
			const modelName = this.name.toLowerCase();
			return db.ref(modelName + '/' + doc['.key']).set(doc);
		} catch (error) {
			console.log('Error occured while performing operation', error);
		}
	}
}
