import app from 'firebase/app'
import 'firebase/auth'

const config = {
	apiKey: "AIzaSyCXDVvT03bqOL4qvHhMzB47b44Et26C634",
    authDomain: "memorama-e5c78.firebaseapp.com",
    projectId: "memorama-e5c78",
    storageBucket: "memorama-e5c78.appspot.com",
    messagingSenderId: "322802238636",
    appId: "1:322802238636:web:3ec562494e5195a697cb09"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
	}

	login() {
		return app
        .auth()
        .signInWithPopup(new app.auth.GoogleAuthProvider())
        .catch(this.handleAuthError);
	}

	handleAuthError(error){
        console.log(error)
    }

	logout() {
		return this.auth.signOut()
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
		
	} 

	getCurrentUsername() {
		return this.auth.currentUser
	}

}

export default new Firebase();