import { Recipe } from './Recipe';
import { WeeklyMenu } from './WeeklyMenu';

// Model mapping. This is used to map firebase collection names to model class name
const Models = {
	recipe: Recipe,
	weeklymenu: WeeklyMenu,
};

export { Models };
