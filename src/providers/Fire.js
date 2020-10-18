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
const authentication = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const auth = () => authentication.signInWithPopup(provider);

authentication.onAuthStateChanged((user, err) => {
	if (user) {
		console.log('Logged in sucessfully', user);
	} else {
		console.log('AN error occurred with login.', err);
		authentication.signOut();
	}

});

export { db, auth };
