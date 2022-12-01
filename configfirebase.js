const firebase = require("firebase-admin");
const { getFirestore} = require('firebase-admin/firestore');


var serviceAccount = require("./key.json");



firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
})



