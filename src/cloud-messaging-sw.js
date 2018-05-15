importScripts('https://www.gstatic.com/firebasejs/5.0.1/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '214874254840'
})

const messaging = firebase.messaging();