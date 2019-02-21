require('dotenv').config();

const admin = require('firebase-admin');

// console.log('Fetching the Google Firebase service account key JSON file contents...');
const serviceAccount = require("./firebase-sak.json");

module.exports = (forLocation) => {

  console.info("-> Connecting to Firebase...");
  
  // console.log('Initialising the app with a Google Firebase service account, granting admin privileges...');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB__FIREBASE_DB_URL
  });

  console.info(`-> ...connected to Firebase ${forLocation}`)

  return admin;

}