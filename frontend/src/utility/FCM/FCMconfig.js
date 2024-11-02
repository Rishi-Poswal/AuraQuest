import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { sendFCMtokenToServer } from "./allowNotification";


const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_SDK)  

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
console.log(messaging);

  
export {app, messaging};