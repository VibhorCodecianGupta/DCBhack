var express = require('express');
var router = express.Router();
var request = require ('request');

router.get('/',function(req,res){
  res.send('hello');
});

var options1 = { method: 'POST',
  url: 'https://preproduction.signzy.tech/api/v2/patrons/login?access_token=9GAyXbUGgfnTR35iqqeqKS5HcSTX8lDlLSeQBYd4',
  headers:
   { accept: '*/*',
     'content-type': 'application/json',
     'accept-language': 'en-US,en;q=0.8' },
  body: { username: 'dcbtest2', password: '9GAyXbUGgfnTR35iqqeqKS5HcSTX8lDlLSeQBYd4' },
  json: true };

  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //
  //   console.log(body);
  // });
  //var id = 'abc';

  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //
  //   console.log(body);
  // });
//var itemId = 'abc';

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   console.log(error);

  request(options1, function(error, res, body){
    if(error) throw new Error(error);
    //userId = body.userId;
    id = body.id;
    console.log(id);
    console.log('done 1');

    var options2 = { method: 'POST',
      url: 'https://preproduction.signzy.tech/api/v2/patrons/59b2b774e2c05333a656fb5d/identities',
      headers:
       { authorization: '9GAyXbUGgfnTR35iqqeqKS5HcSTX8lDlLSeQBYd4',
         Authorization: id,
         accept: '*/*',
         'content-type': 'application/json',
         'accept-language': 'en-US,en;q=0.8' },
      body:
       { type: 'individualPan',
         callbackUrl: 'https://localhost:3000',
         email: 'vibhordelgupta@gmail.com',
         images: [ 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Allenton_Hippo_QR_Code.jpg' ] },
      json: true };


    //console.log(body);
    request(options2, function(error, res, body){
      if(error) throw new Error(error);
      var itemId = body.id;
      var accessToken = body.accessToken;
      console.log('done 2');
      console.log(body);

      // var options3 = { method: 'POST',
      // url: 'https://preproduction.signzy.tech/api/v2/snoops',
      // headers:
      //  { accept: '*/*',
      //    'content-type': 'application/json',
      //    'accept-language': 'en-US,en;q=0.8',
      //    //'access_token': 'buc1btmliiny33fcboy5pnwmilp37suo4zxi2cginu4ucy2e29k0834mu0c80uyxo4rt3xr'
      //   },
      // body:
      //  { service: 'Identity',
      //    itemId: itemId,
      //    accessToken: accessToken,
      //    task: 'decodeQR',
      //    essentials: { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Allenton_Hippo_QR_Code.jpg' } },
      // json: true };

      var options3 = { method: 'POST',
  url: 'https://preproduction.signzy.tech/api/v2/snoops',
  headers:
   { accept: '*/*',
     'content-type': 'application/json',
     'accept-language': 'en-US,en;q=0.8' },
  body:
   { service: 'Identity',
     itemId: itemId,
     accessToken: accessToken,
     task: 'verification',
     essentials:
      { uid: '868949908204',
        name: 'Nikhil Kumar Mishra',
        yob: '1997',
        pincode: '110044' } },
  json: true };

      request(options3, function(error, res, body){
        if(error) throw new Error(error);
        console.log('done 3');
        console.log(body);
      });
    });
  });

  //console.log(body);
//});

//id : 4mSio8TzFjyZZL72VTpIld8VFG8xf1CxBrFFiA6u7UY3fJwikyUuNq9ogFk9mcpA
//"accessToken": "buc1btmliiny33fcboy5pnwmilp37suo4zxi2cginu4ucy2e29k0834mu0c80uyxo4rt3xr"
//"id": "59b466f2a7f6d833b89f57be"
module.exports = router;
