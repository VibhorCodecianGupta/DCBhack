var express = require('express');
var router = express.Router();
var request = require ('request');
const driver = require('bigchaindb-driver')
var yodlee = require('yodlee-transactions');

router.get('/',function(req,res){
  res.send('hello');
});


// =======================ADHAAR VERIFICATION==================================================
router.post('/adhaar',function(req,res){
  var final = {
    "uid":"868949908204",
    "name":"Nikhil Kumar Mishra",
    "yob":"1997",
    "pincode":"110044"
  }

  var options1 = { method: 'POST',
  url: 'https://preproduction.signzy.tech/api/v2/patrons/login?access_token=9GAyXbUGgfnTR35iqqeqKS5HcSTX8lDlLSeQBYd4',
  headers:
  { accept: '*/*',
    'content-type': 'application/json',
    'accept-language': 'en-US,en;q=0.8' },
  body: { username: 'dcbtest2', password: '9GAyXbUGgfnTR35iqqeqKS5HcSTX8lDlLSeQBYd4' },
  json: true };


  request(options1, function(error, res, body){
    if(error) throw new Error(error);
    //userId = body.userId;
    id = body.id;
    // console.log(id);
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


      request(options2, function(error, res, body){
      if(error) throw new Error(error);
      var itemId = body.id;
      var accessToken = body.accessToken;
      console.log('done 2');
      // console.log(body);


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
          { uid: req.body.uid,
            name: req.body.name,
            yob: req.body.yob,
            pincode: req.body.pincode } },
      json: true };

      request(options3, function(error, res, final){
        if(error) //throw new Error(error);
        console.log('done 3');
        // console.log(final);
      });
    });
  });
  res.send(final);
});

// ====================++CREATING BLOCK FOR THE USER============================

  router.post('/createBlock',function(req,res){
    // console.log(req.body)
    const alice = new driver.Ed25519Keypair()
    const conn = new driver.Connection(
      'https://test.ipdb.io/api/v1/',
      { app_id: 'fe7513d8',
      app_key: '3f4f3fee4d753c54adf3477c63cb8ca5' })

    const tx = driver.Transaction.makeCreateTransaction(
      req.body,
      null,
      [ driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(alice.publicKey))],
      alice.publicKey)
    const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
    console.log(txSigned)
    conn.postTransaction(txSigned)
    .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
      .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
      .then(res.send(txSigned))
  })




// ============================+YODLEEE DATA AGGREGATION+=================================
  router.post('/yodlee',function(req,res){
    var cobrandUser = ""; //example format in sbCobxxxxx
    var cobrandPassword = ""; //format is xxxx-xxx-xxx-xxx-xxxx the number of x is not accurate
    var userName = ""; //example formats are sbMemxxxxx
    var userPassword = ""; //example formate are in sbMemxxxxx
    var cobSessionToken = "";
    var userSessionToken = "";
    var accounts = [];
    
    
    function generateCobToken(cobrandUser, cobrandPassword){
      return yodlee.getCobSession(cobrandUser, cobrandPassword)
        .then(function(data){
          var dataObj = JSON.parse(data);
          cobSessionToken = dataObj.session.cobSession;
          return cobSessionToken;
        });
    }
    
    function generateUserToken(userName, userPassword){
      return function(cobSessionToken){
        return yodlee.getUserSession(cobSessionToken, userName, userPassword)
          .then(function(user){
            var userObj = JSON.parse(user);
            userSessionToken = userObj.session.userSession;
            return userSessionToken;
          });
      }
    }
    
    function getAccounts() {
      return yodlee.getAccounts(cobSessionToken, userSessionToken)
        .then(function(data){
          var dataObj = JSON.parse(data);
          accounts = [] //clearing it out kind of
          for (var k in dataObj){
            if (dataObj.hasOwnProperty(k)){
              accounts.push(dataObj[k]);
            }
          }
        })
    }
    
    function getTransactions(accountId, fromDate, toDate) {
      return yodlee.getTransactions(cobSessionToken, userSessionToken, accountId, fromDate, toDate)
        .then(function(data){
          return JSON.parse(data);
        })
    }
    
    function getCategorySpending(transactionObj) {
      return yodlee.getCategorySpending(transactionObj);
    }
    
    //Running here
    generateCobToken(cobrandUser, cobrandPassword)
      .then(generateUserToken(userName, userPassword))
      .then(function(){
        getAccounts();
        getTransactions()
          .then(getCategorySpending);
      })
  })



//id : 4mSio8TzFjyZZL72VTpIld8VFG8xf1CxBrFFiA6u7UY3fJwikyUuNq9ogFk9mcpA
//"accessToken": "buc1btmliiny33fcboy5pnwmilp37suo4zxi2cginu4ucy2e29k0834mu0c80uyxo4rt3xr"
//"id": "59b466f2a7f6d833b89f57be"
module.exports = router;
