import { db } from "../providers/Fire";
import map from "lodash/map";
import { DateTime } from "../providers/DateTime";

export class BaseModel {
  constructor() {}

  getKey() {
    return this[".key"];
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
    return Object.defineProperty(model, ".key", {
      value: id,
      enumerable: false,
      configurable: true
    });
  }

  /**
   * Returns a count of the number of documents in a collection
   */
  static async count() {
    try {
      const modelName = this.name.toLowerCase();
    } catch (error) {
      console.log("Error occured while performing operation", error);
    }
  }

  /**
   * Deletes one document from collection
   */
  static async deleteOne(doc) {
    try {
      const modelName = this.name.toLowerCase();
      return db
        .collection(modelName)
        .doc(doc[".key"])
        .remove();
    } catch (error) {
      console.log("Error occured while performing operation", error);
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
        if (key === "id") {
          var result = await db
            .collection(modelName)
            .doc(id)
            .get();
          return this.turnOneIntoModel(result.data(), value);
        } else var snapshot = await db.collection(modelName);
      } else {
        var snapshot = await db.collection(modelName).get();
      }
      return this.turnAllIntoModels(snapshot.data());
    } catch (error) {
      console.log("Error occured while performing operation", error);
    }
  }

  static async where(field, operand, value) {
    try {
      const modelName = this.name.toLowerCase();
      // Field is an array, then parse and add multiple where
      // if (isArray(field)) {

      // } else {

      // }
      return db.collection(modelName).where(field, operand, value);
    } catch (error) {}
  }

  /**
   * Finds one document from collection
   */
  static async findOne() {
    try {
      const modelName = this.name.toLowerCase();
    } catch (error) {
      console.log("Error occured while performing operation", error);
    }
  }

  /**
   * Inserts one or many documents into a collection
   * @param docs Array
   */
  static async insert(docs) {
    try {
      const modelName = this.name.toLowerCase();
      let promises = docs.map(item => db.collection(modelName).push(docs));
      return Promise.all(promises);
    } catch (error) {
      console.log("Error occured while performing operation", error);
    }
  }

  /**
   * Inserts one document in a collection
   */
  static async insertOne(doc) {
    try {
      const modelName = this.name.toLowerCase();
      return db.collection(modelName).add({ ...doc });
    } catch (error) {
      console.log("Error occured while performing operation", error);
    }
  }

  /**
   * Updates one or many documents in a collection
   */
  static async update(doc) {
    try {
      const modelName = this.name.toLowerCase();
    } catch (error) {
      console.log("Error occured while performing operation", error);
    }
  }

  /**
   * Updates one document in a collection
   */
  static async updateOne(doc) {
    try {
      if (!doc[".key"]) throw Error("Cannot update due to missing key.", doc);
      const modelName = this.name.toLowerCase();
      return db
        .collection(modelName)
        .doc(doc[".key"])
        .set(doc);
    } catch (error) {
      console.log("Error occured while performing operation", error);
    }
  }
}
