import Vue from 'vue';
import VueRouter from 'vue-router';

// Import 'pages'
import Login from '../views/Login';
import Register from '../views/Register';
import Landing from '../views/Landing';
import Dashboard from '../views/Dashboard';

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
			name: '/dashboard',
			component: Dashboard,
			meta: {
				requiresAuth: true,
			},
		},
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
