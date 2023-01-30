// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjCNMoUHor57x8GjpU1CkMQU0VXmpgleI",
  authDomain: "indeed-cli.firebaseapp.com",
  projectId: "indeed-cli",
  storageBucket: "indeed-cli.appspot.com",
  messagingSenderId: "224720128905",
  appId: "1:224720128905:web:1c0917e68d6486d135ef58",
  measurementId: "G-NELJKPH99G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
export const storagee=getStorage(app)