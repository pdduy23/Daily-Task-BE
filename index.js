const express = require("express");
var admin = require("firebase-admin");

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => console.log("Connected " + PORT));

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_JSON)),
  // The database URL depends on the location of the database
  databaseURL: process.env.LINK_DATABASE,
});

var db = admin.database();
var ref = db.ref(process.env.DATABASE_REFERENCE);

app.get("/", function (req, res) {
  ref.once("value", function (snapshot) {
    res.send(snapshot.val());
  });
});
