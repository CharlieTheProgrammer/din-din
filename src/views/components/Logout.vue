<template>
	<div v-if="auth.currentUser">
		<button class="px-3 py-2 text-teal-600 text-xs font-semibold tracking-wide rounded-lg border border-teal-600 hover:text-white hover:bg-teal-600 mx-1" @click="logout">Log Out</button>
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
