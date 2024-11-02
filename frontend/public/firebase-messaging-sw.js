importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');


const firebaseConfig = {
    apiKey: "AIzaSyC2mPHON7QBEm5DhZkavR3kYt8bWgKNjTg",
    authDomain: "auraquest-baaa5.firebaseapp.com",
    projectId: "auraquest-baaa5",
    storageBucket: "auraquest-baaa5.firebasestorage.app",
    messagingSenderId: "222254789252",
    appId: "1:222254789252:web:e07003882238a4388f08d1",
    measurementId: "G-NZVVWFVQ6Y"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

