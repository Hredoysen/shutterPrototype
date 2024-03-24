// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2P0ln-cMtcg9MK7rYmQDrGUhAqTIdF9Y",
    authDomain: "react-auth-base-8a308.firebaseapp.com",
    projectId: "react-auth-base-8a308",
    storageBucket: "react-auth-base-8a308.appspot.com",
    messagingSenderId: "475659793270",
    appId: "1:475659793270:web:9a20d3351f4a3d35418057"
};

// Initialize Firebase
export const FireApp = initializeApp(firebaseConfig);


export const auth = getAuth(FireApp)