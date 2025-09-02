import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALOFlLa2IgTT8T382tNaxT-HYWpONiHps",
    authDomain: "lab-management-system-f1d68.firebaseapp.com",
    projectId: "lab-management-system-f1d68",
    storageBucket: "lab-management-system-f1d68.firebasestorage.app",
    messagingSenderId: "876250070738",
    appId: "1:876250070738:web:380f65aa360bc5d057370b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app )
export const db = getFirestore(app);