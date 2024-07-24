// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDfOzxh-3mjmK9nJov_9Rsi61NwJOlw3Ao",
	authDomain: "travelmate-c2202.firebaseapp.com",
	projectId: "travelmate-c2202",
	storageBucket: "travelmate-c2202.appspot.com",
	messagingSenderId: "215963269218",
	appId: "1:215963269218:web:25044c6d139e0c3f10793b",
	measurementId: "G-VZFBSC7BXL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);


// firebase login

// firebase init

// "site": "travel-mate",

// firebase deploy --only hosting:travel-mate