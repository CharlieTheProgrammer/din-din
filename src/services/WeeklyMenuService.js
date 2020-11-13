import { db, auth } from "../providers/Fire";
// I could import recipe and then do new WeeklyMenu() in createWeeklyMenu.
// However, Delaney advises simply leaving unfilled properties missing.
// When searching on Firebase, this will be equivalent to false. Additionally, this
// saves data.

const modelName = "weekly-menu";

const WeeklyMenuService = {
  createWeeklyMenu: async weekly_menu => {
    const user = await auth.currentUser;
    return db.collection(modelName).add({
      ...weekly_menu,
      user_id: user.uid
    });
  },

  getWeeklyMenuById: async weekly_menu_id => {
    const doc = await db
      .collection(modelName)
      .doc(weekly_menu_id)
      .get();
    return doc.exists ? doc.data() : false;
  },

  updateWeeklyMenu: async (weekly_menu, weekly_menu_id) => {
    return db
      .collection(modelName)
      .doc(weekly_menu_id)
      .set(weekly_menu);
  },

  deleteWeeklyMenu: async weekly_menu_id => {
    return db
      .collection(modelName)
      .doc(weekly_menu_id)
      .delete();
  }
};

export default WeeklyMenuService;
