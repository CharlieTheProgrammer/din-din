<template>
	<div v-if="auth.currentUser">
		<button class="px-3 py-2 bg-red-600 text-white" @click="logout">Log Out</button>
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
				this.$router.push('/login');
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>
