<template>
	<div v-if="auth.currentUser">
		<button class="px-3 py-2 text-gray-700 text-xs font-semibold tracking-wide rounded-lg border border-teal-400 hover:text-white hover:bg-teal-400 mx-1" @click="logout">Log Out</button>
	</div>
</template>

<script>
import { auth } from '../../providers/Fire';

export default {
	name: 'Logout',
	data() {
		return {
			username: '',
			password: '',
			auth,
		};
	},
	methods: {
		async logout() {
			try {
				await auth.signOut();
				window.user = null;
				this.$router.push('/login');
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>
