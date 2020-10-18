import * as firebase from 'firebase/app';



const authentication = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default () => authentication.signInWithPopup(provider);
