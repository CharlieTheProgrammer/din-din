import { db } from '../providers/Fire';
import { DateTime } from '../providers/DateTime';

import { BaseModel } from './BaseModel';

export class WeeklyMenu extends BaseModel {
	// genre;

	constructor({ items = arguments[0], user_id = arguments[1], created_at = null }) {
		super();

		this.items = items;
		this.weekOfTheYear = DateTime().week();
		this.user_id = user_id || window.user.id;
		// Not able to add this to work globally from BaseModel class, adding here.
		created_at ? this.created_at = created_at : this.created_at = DateTime().utc().format();
	}
}