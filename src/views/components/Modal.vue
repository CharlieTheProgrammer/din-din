<template>
	<div>
		<transition name="modal">
			<div class="modal-mask fixed top-0 left-0 w-full h-full">
				<div class="modal-wrapper">
					<div class="modal-container bg-white rounded shadow-md p-4 m-3">
						<div class="modal-header">
							<slot name="header">
								default header
							</slot>
						</div>

						<div class="modal-body">
							<slot name="body">
								default body
							</slot>
						</div>

						<div class="modal-footer">
							<slot name="footer">
								default footer
								<button class="block" @click="$emit('close')">
									OK
								</button>
							</slot>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'Modal',
};
</script>

<style lang="css" scoped>
.modal-mask {
	z-index: 9998;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	transition: all 0.3s ease;
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 20px 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
