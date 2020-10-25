<template>
	<default-layout>
		<div class="flex flex-1 justify-center md:items-center min-h-full">
			<div class="w-full min-h-full lg:w-1/2 xl:w-2/5 md:h-auto">
				<div class="relative z-30 max-w-md mx-auto px-4 py-8 lg:px-8 lg:py-10 shadow-md bg-white md:rounded-lg h-full md:h-auto">
					<div>
						<div class="flex items-baseline justify-between">
							<h1 class="text-xl lg:text-2xl font-bold text-gray-800 tracking-wider">
								Register
							</h1>
							<router-link to="/login" class="text-sm text-right text-gray-500 hover:text-gray-700" title="Login with existing account">Login</router-link>
						</div>
						<p class="tracking-wide text-sm mt-4">
							To access all our amazing features!
						</p>
					</div>
					<ValidationObserver v-slot="{ handleSubmit }">
						<form class="mt-6 lg:mt-8" @submit.prevent="handleSubmit(register)">
							<div class="space-y-4">
								<span class="text-red-500 text-xs" v-show="loginError">{{ loginError }}</span>
								<div class="block">
									<ValidationProvider name="username" rules="required|email" v-slot="{ touched, failed }">
										<div class="relative bg-gray-50 rounded border border-gray-500 px-2 transition-all ease-out duration-300 focus-within:bg-gray-800 focus-within:border-gray-400">
											<label for="username" class="absolute top-0 px-1 lg:text-sm transform transition-all ease-out duration-300 translate-y-3 text-gray-500" v-show="!username"
												>Enter your email or phone number</label
											>
											<input id="username" type="text" autocomplete="off" value="" class="relative w-full bg-transparent outline-none px-1 py-3 z-10" v-model="username" />
										</div>
										<span class="text-red-500 text-xs" v-show="(submitted || touched) && failed">Please enter a valid email or phone number</span>
									</ValidationProvider>
								</div>
								<div class="block">
									<ValidationProvider name="password" rules="required" v-slot="{ touched, failed }">
										<div class="relative bg-gray-50 rounded border border-gray-500 px-2 transition-all ease-out duration-300 focus-within:bg-gray-800 focus-within:border-gray-400">
											<label for="password" class="absolute top-0 px-1 lg:text-sm transform transition-all ease-out duration-300 translate-y-3 text-gray-500" v-show="!password"
												>Enter your password</label
											>
											<input id="password" type="text" autocomplete="off" value="" class="relative w-full bg-transparent outline-none px-1 py-3 z-10" v-model="password" />
										</div>
										<span class="text-red-500 text-xs" v-show="(submitted || touched) && failed">Please enter a valid email or phone number</span>
									</ValidationProvider>
								</div>

								<div class="py-3">
									<button
										@click="submitted = true"
										type="submit"
										class="w-full inline-flex items-center justify-center rounded-lg overflow-hidden px-4 py-3 bg-indigo-600 text-white transition ease-out duration-300 uppercase font-semibold hover:bg-indigo-700 focus:outline-none"
									>
										continue
									</button>
								</div>
							</div>
						</form>
					</ValidationObserver>
				</div>
			</div>
		</div>
	</default-layout>
</template>

<script>
import { auth } from '../providers/Fire';

export default {
	name: 'Login',
	data() {
		return {
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			email: '',
			submitted: false,
			loginError: false,
		};
	},
	methods: {
		async register() {
			try {
				const credentials = await auth.createUserWithEmailAndPassword(this.username, this.password);
				this.loginError = false;
				this.$router.push('/dashboard');
			} catch (error) {
				if (error.code.includes('auth')) {
					this.loginError = error.message;
				}
				console.log(error);
			}
		},
	},
};
</script>
