<template>
	<div class="flex flex-col justify-center">
		<canvas id="canvas" v-show="pictureTaken"></canvas>
		<video id="webcam" autoplay playsinline width="640" height="480" v-show="!pictureTaken"></video>

		<button class="rounded px-4 py-2 bg-yellow-400 text-white mt-4" @click="retakePicture" v-if="pictureTaken">Retake Picture</button>
		<button class="rounded px-4 py-2 bg-green-400 text-white mt-4" @click="takePicture" v-else>Take Picture</button>
	</div>
</template>

<script>
import Webcam from 'webcam-easy';

export default {
	name: 'Camera',
	data() {
		return {
			webcam: {},
			pictureTaken: false,
			picture: ""
		};
	},
	mounted() {
		this.initWebcam();
	},
	methods: {
		async initWebcam() {
			const webcamElement = document.getElementById('webcam');
			const canvasElement = document.getElementById('canvas');
			this.webcam = new Webcam(webcamElement, 'user', canvasElement);

			try {
				await this.webcam.start();
			} catch (error) {
				console.log(err);
			}
		},
		takePicture() {
			this.pictureTaken = true;
			this.picture = this.webcam.snap();
			this.webcam.stop();
		},
		retakePicture() {
			this.pictureTaken = false;
			this.webcam.start();
		},
		uploadImage() {},
	},
};
</script>
