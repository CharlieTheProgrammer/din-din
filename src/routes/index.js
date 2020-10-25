import Vue from 'vue';
import VueRouter from 'vue-router';

// Import 'pages'
import Login from '../views/Login';
import Register from '../views/Register';
import Landing from '../views/Landing';
import Dashboard from '../views/Dashboard';
import Recipes from '../views/Recipes';
import Recipe from '../views/Recipe';
import MenuOfTheWeek from '../views/components/MenuOfTheWeek';

// Other imports
import { firebase } from '../providers/Fire';

Vue.use(VueRouter);

let router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'landing',
			component: Landing,
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/recipes/:id',
			name: 'recipe',
			component: Recipe,
			meta: {
				requiresAuth: true,
			},
			props: (route) => ({
				recipe: {},
				...route.params
			})
		},
		{
			path: '/recipes',
			name: 'recipes',
			component: Recipes,
			meta: {
				requiresAuth: true,
			}
		},
		{
			path: '/weekly-menu',
			name: 'weekly-menu',
			component: MenuOfTheWeek,
			meta: {
				requiresAuth: true,
			}
		}
	],
});

// Nav Guards
router.beforeEach(async (to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	if (requiresAuth && !(await firebase.getCurrentUser())) {
		next('login');
	} else {
		next();
	}
});

export default router;
