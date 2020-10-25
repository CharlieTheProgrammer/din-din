import Vue from 'vue';
import App from './App.vue';
import router from './routes';

import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import isObject from 'lodash/isObject';

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import * as validationRules from './providers/Validations';

import { rtdbPlugin } from 'vuefire';
import { Models } from './models';

import './assets/css/index.css';

// Globally Register Components
const requireComponent = require.context(
	// The relative path of the components folder
	'./views',
	// Whether or not to look in subfolders
	true,
	// The regular expression used to match base component filenames
	/[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
	// Get component config
	const componentConfig = requireComponent(fileName);

	// Get PascalCase name of component
	const componentName = upperFirst(
		camelCase(
			// Gets the file name regardless of folder depth
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	);

	// Register component globally
	Vue.component(
		componentName,
		// Look for the component options on `.default`, which will
		// exist if the component was exported with `export default`,
		// otherwise fall back to module's root.
		componentConfig.default || componentConfig
	);
});

// Serialize function for vuefire
// This will run through data returned from firebase and convert it to the appropriate model
const serialize = (snapshot) => {
	const modelName = snapshot.ref.parent.key; // This will  get "recipe"
	const value = snapshot.val();
	// if the value is a primitive, we create an object instead and assign the .value
	let doc = isObject(value) ? value : Object.defineProperty({}, '.value', { value });

	if (!Models[modelName]) throw Error(`Model name '${modelName}' not found. Check the spelling and/or confirm the model is registered correctly.`);
	return Models[modelName].turnOneIntoModel(doc, snapshot.key);
};

Vue.use(rtdbPlugin, { serialize });

Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
	render: (h) => h(App),
	router,
}).$mount('#app');
