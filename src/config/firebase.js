import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: "AIzaSyBkZnJK00qqzOpR9qjQy-F_gRD6PfM13gs",
	authDomain: "xavior-9a453.firebaseapp.com",
	projectId: "xavior-9a453",
	storageBucket: "xavior-9a453.appspot.com",
	messagingSenderId: "24134937168",
	appId: "1:24134937168:web:4fe642b76d9cfbc0b53f55",
	measurementId: "G-DGYBX013RB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
