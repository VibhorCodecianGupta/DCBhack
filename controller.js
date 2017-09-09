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

//   var options = { method: 'POST',
//     url: 'https://preproduction.signzy.tech/api/v2/patrons/59b2b774e2c05333a656fb5d/identities',
//     headers:
//      { authorization: '9GAyXbUGgfnTR35iqqeqKS5HcSTX8lDlLSeQBYd4',
//        accept: '*/*',
//        'content-type': 'application/json',
//        'accept-language': 'en-US,en;q=0.8' },
//     body:
//      { type: 'individualPan',
//        callbackUrl: 'localhost:3000',
//        email: 'vibhordelgupta@gmail.com',
//        images: [ 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg' ] },
//     json: true };
//
//   request(options, function (error, response, body) {
//     if (error) throw new Error(error);
//
//     console.log(body);
//   });
//
//   var options = { method: 'POST',
// url: 'https://preproduction.signzy.tech/api/v2/patrons/59b2b774e2c05333a656fb5d/identities',
// headers:
//  { authorization: 'swAVPulL46xx7EbLzroCx4XRGebc0FPlN5iKD2ggyWUNsOQiLTkwt31n4SsUhSBa',
//    accept: '*/*',
//    'content-type': 'application/json',
//    'accept-language': 'en-US,en;q=0.8' },
// body:
//  { type: 'individualPan',
//    callbackUrl: 'https://localhost:3000',
//    email: 'vibhordelgupta@gmail.com',
//    images: [ 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Allenton_Hippo_QR_Code.jpg' ] },
// json: true };
//
// request(options, function (error, response, body) {
// if (error) throw new Error(error);
//
// console.log(body);
// });
//
//   var options = { method: 'POST',
//   url: 'https://preproduction.signzy.tech/api/v2/snoops',
//   headers:
//    { accept: '*/*',
//      'content-type': 'application/json',
//      'accept-language': 'en-US,en;q=0.8' },
//   body:
//    { service: 'Identity',
//      itemId: '59b42952e2c05333a656fb9e',
//      accessToken: 'fk27b8hpg2jnqdx0s7h8cqsemiasx9k5mczho6u75go52ucv7vizuk32esyxhipgfosjdg52vs4i',
//      task: 'decodeQR',
//      essentials: { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Allenton_Hippo_QR_Code.jpg' } },
//   json: true };
//
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   console.log(error);
//
//   //console.log(body);
// });

//id: 'mVpiGvQwn11QGnT6jmqBb9heVgmGL2XSmbl1AWS5t2awaZP6jh6UJrTx40KrhEPr'
module.exports = router;
