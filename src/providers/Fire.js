import * as firebase from 'firebase/app';
import 'firebase/auth';
// This one is smaller than firestore, but both add a lot. Stock is 89 KB
// 499.70 KB vs 633.43 KB
import 'firebase/database';

var firebaseConfig = {
	apiKey: process.env.VUE_APP_API_KEY,
	authDomain: process.env.VUE_APP_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_DATABASE_URL,
	projectId: process.env.VUE_APP_PROJECT_ID,
	storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

//
firebase.getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			unsubscribe();
			window.user = {
				id: user.uid,
				email: user.email,
				displayName: user.displayName
			};
			resolve(user);
		}, reject);
	});
};

export { firebase, db, auth };
