import { DateTime } from "../providers/DateTime";
import { BaseModel } from "./BaseModel";

export class Recipe extends BaseModel {
  // genre;

  constructor({ name = arguments[0], user_id = arguments[1], note = arguments[2], created_at = null }) {
    super();

    this.name = name;
    this.user_id = user_id || window.user.id;
    created_at
      ? (this.created_at = created_at)
      : (this.created_at = DateTime()
          .utc()
          .format());
    this.note = note || "";
  }
}
