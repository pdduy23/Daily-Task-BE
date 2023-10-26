const express = require("express");
var admin = require("firebase-admin");
var serviceAccount = require("./firebase.json");

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => console.log("Connected " + PORT));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://dailytask-98b6d-default-rtdb.firebaseio.com/",
});

var db = admin.database();
var ref = db.ref("dailytaskqq2610");

app.get("/", function (req, res) {
  ref.once("value", function (snapshot) {
    res.send(snapshot.val());
  });
});
