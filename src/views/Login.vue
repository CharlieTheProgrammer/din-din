<template>
	<default-layout>
		<div class="flex justify-center items-center h-full">
			<div class="w-full lg:w-1/2 xl:w-2/5 h-full md:h-auto">
				<div class="relative z-30 max-w-md mx-auto px-4 py-8 lg:px-8 lg:py-10 shadow-md bg-gray-100 md:rounded-lg h-full md:h-auto">
					<div>
						<div class="flex items-baseline justify-between">
							<h1 class="text-xl lg:text-2xl font-bold text-gray-800 tracking-wider">
								Login
							</h1>
							<router-link to="/register" class="text-sm text-right text-gray-500 hover:text-gray-700" title="Create new account">Register</router-link>
						</div>
						<p class="tracking-wide text-sm mt-4">
							With your valid account to continue.
						</p>
					</div>
					<ValidationObserver v-slot="{ handleSubmit }">
						<form class="mt-6 lg:mt-8" @submit.prevent="handleSubmit(login)">
							<div class="space-y-4">
								<span class="text-red-500 text-xs" v-show="loginError">Your login information was not recognized. Please try again.</span>
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
										type="submit"
										class="w-full inline-flex items-center justify-center rounded-lg overflow-hidden px-4 py-3 bg-indigo-600 text-white transition ease-out duration-300 uppercase font-semibold hover:bg-indigo-700 focus:outline-none"
										@click="submitted = true"
									>
										continue
									</button>
								</div>
							</div>
						</form>
					</ValidationObserver>
					<div class="flex items-center justify-center py-4 xl:py-6 text-xs">
						<span class="w-14 border-b border-gray-500"></span> <span class="px-2">or with</span> <span class="w-14 border-b border-gray-500"></span>
					</div>
					<div class="flex justify-center space-x-2">
						<button
							type="button"
							class="inline-flex items-center rounded-lg overflow-hidden p-2 bg-gray-800 transition ease-out duration-300 focus:outline-none hover:bg-gray-700"
							@click="loginWithGoogle"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-6 w-6 inline">
								<title>Login with Google</title>
								<path
									d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
									fill="#fbbb00"
								></path>
								<path
									d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
									fill="#518ef8"
								></path>
								<path
									d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
									fill="#28b446"
								></path>
								<path
									d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
									fill="#f14336"
								></path>
							</svg>
						</button>
						<button
							type="button"
							class="inline-flex items-center rounded-lg overflow-hidden p-2 bg-gray-800 transition ease-out duration-300 focus:outline-none hover:bg-gray-700"
							@click="loginWithFacebook"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 291.319 291.319" class="h-6 w-6 inline">
								<title>Login with Facebook</title>
								<path d="M145.659 0c80.45 0 145.66 65.219 145.66 145.66 0 80.45-65.21 145.659-145.66 145.659S0 226.109 0 145.66C0 65.219 65.21 0 145.659 0z" fill="#3b5998"></path>
								<path
									d="M163.394 100.277h18.772v-27.73h-22.067v.1c-26.738.947-32.218 15.977-32.701 31.763h-.055v13.847h-18.207v27.156h18.207v72.793h27.439v-72.793h22.477l4.342-27.156h-26.81v-8.366c0-5.335 3.55-9.614 8.603-9.614z"
									fill="#fff"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</default-layout>
</template>

<script>
import { firebase, auth } from '../providers/Fire';

export default {
	name: 'Login',
	data() {
		return {
			username: '',
			password: '',
			submitted: false,
			loginError: '',
		};
	},
	methods: {
		async login() {
			try {
				await auth.signInWithEmailAndPassword(this.username, this.password);
				this.loginError = false;
				this.$router.push('/dashboard');
			} catch (error) {
				if (error.code === 'auth/wrong-password') {
					this.loginError = true;
				}
				console.log(error);
			}
		},
		async loginWithGoogle() {
			try {
				const provider = new firebase.auth.GoogleAuthProvider();
				await auth.signInWithPopup(provider);
				this.loginError = false;
			} catch (error) {
				if (error.code === 'auth/wrong-password') {
					this.loginError = true;
				}
				console.log(error);
			}
		},
		async loginWithFacebook() {
			try {
				const provider = new firebase.auth.FacebookAuthProvider();
				await auth.signInWithPopup(provider);
				this.loginError = false;
			} catch (error) {
				if (error.code === 'auth/wrong-password') {
					this.loginError = true;
				}
				console.log(error);
			}
		},
	},
};
</script>
