import { db } from '../providers/Fire';

import { BaseModel } from './BaseModel';

export class Recipe extends BaseModel {
	// genre;

	constructor({ name = arguments[0], user_id = arguments[1] }) {
		super();

		this.name = name;
		this.user_id = user_id || window.user.id;
	}
}
