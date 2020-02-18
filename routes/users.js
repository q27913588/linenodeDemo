var express = require('express');
var router = express.Router();

 
 

/* GET users listing. */
router.get('/', function(req, res) {
var admin = require("firebase-admin");
console.log(admin);
let db = admin.firestore();
let docRef = db.collection('users').doc('alovelace');
let setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

 res.send('Hello World!');


});

module.exports = router;
