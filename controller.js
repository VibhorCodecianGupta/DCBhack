var express = require('express');
var router = express.Router();
var request = require ('request');

router.get('/',function(req,res){
  res.send('hello');
});

var options = { method: 'POST',
  url: 'https://preproduction.signzy.tech/api/v2/patrons/login',
  headers:
   { accept: '*/*',
     'content-type': 'application/json',
     'accept-language': 'en-US,en;q=0.8' },
  body: { username: 'dcbtest2', password: '9GAyXbUGgfnTR35iqqeqKS5HcSTX8lDlLSeQBYd4' },
  json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

  var options = { method: 'POST',
    url: 'https://preproduction.signzy.tech/api/v2/patrons/59b2b774e2c05333a656fb5d/identities',
    headers:
     { authorization: '9GAyXbUGgfnTR35iqqeqKS5HcSTX8lDlLSeQBYd4',
       accept: '*/*',
       'content-type': 'application/json',
       'accept-language': 'en-US,en;q=0.8' },
    body:
     { type: 'individualPan',
       callbackUrl: 'https://localhost:3000',
       email: 'vibhordelgupta@gmail.com',
       images: [ 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Allenton_Hippo_QR_Code.jpg' ] },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

  var options = { method: 'POST',
  url: 'https://preproduction.signzy.tech/api/v2/snoops',
  headers:
   { accept: '*/*',
     'content-type': 'application/json',
     'accept-language': 'en-US,en;q=0.8' },
  body:
   { service: 'Identity',
     itemId: '59b466f2a7f6d833b89f57be',
     accessToken: 'buc1btmliiny33fcboy5pnwmilp37suo4zxi2cginu4ucy2e29k0834mu0c80uyxo4rt3xr',
     task: 'decodeQR',
     essentials: { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Allenton_Hippo_QR_Code.jpg' } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(error);

  //console.log(body);
});

//id : 4mSio8TzFjyZZL72VTpIld8VFG8xf1CxBrFFiA6u7UY3fJwikyUuNq9ogFk9mcpA
//"accessToken": "buc1btmliiny33fcboy5pnwmilp37suo4zxi2cginu4ucy2e29k0834mu0c80uyxo4rt3xr"
//"id": "59b466f2a7f6d833b89f57be"
module.exports = router;
