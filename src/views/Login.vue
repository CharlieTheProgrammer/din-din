<template>
	<div>
		<button @click="login">Login</button>
		<button @click="logout">Log Out</button>
	</div>
</template>

<script>
import { auth } from '../providers/Fire';

export default {
	name: 'Login',
	data() {
		return {
			user: null,
		};
	},
	methods: {
		async login() {
      try {
        this.user = await auth();
      } catch (error) {
        console.log(error);
      }
		},
		logout() {
			auth.lo
		},
	},
};
</script>
