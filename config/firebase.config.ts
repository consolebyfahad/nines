import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmvUjwArN5r5kgxf6_hyT6_yHBjR9vRd8",
  authDomain: "the-nines-d6358.firebaseapp.com",
  projectId: "the-nines-d6358",
  storageBucket: "the-nines-d6358.appspot.com",
  messagingSenderId: "1098864889350",
  appId: "your-app-id",
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with persistence
export const auth = getAuth(app);

export default app;
