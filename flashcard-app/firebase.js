import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDUwISpPCrk5VIVaQ7N7-351eK14a3cWRs",
  authDomain: "flashcard-app-3b554.firebaseapp.com",
  projectId: "flashcard-app-3b554",
  storageBucket: "flashcard-app-3b554.firebasestorage.app",
  messagingSenderId: "121085847250",
  appId: "1:121085847250:web:4a42eb0022053365b62f0b"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };