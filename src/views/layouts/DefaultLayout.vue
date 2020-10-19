<template>
	<div class="flex flex-col border border-green-500 h-screen p-2 text-gray-800 md:p-4">
		<header>
			<h1>Dinner Randomizer</h1>
			<nav class="flex justify-between">
				<router-link to="/">Home</router-link>
				<router-link to="/login" v-show="auth.currentUser || $route.path !== '/login'">Login</router-link>
				<Logout></Logout>
			</nav>
		</header>

    <main class="flex-1">
      <slot/>
    </main>

		<footer>
			@ Charlie the Programmer
		</footer>
	</div>
</template>

<script>
import {auth} from '../../providers/Fire';

export default {
	name: 'Default-Layout',
	data() {
		return {
			auth
		}
	},
	mounted() {
		setTimeout(() => {
			// This function is not async. If it runs before firebase is initialized, it will return null.
			// What we need to do is hook it up to the authstatechange function, but then the question becomes,
			// 
			console.log(auth.currentUser);
		}, 2000)
	}
};
</script>
