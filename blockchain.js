module.exports = function (blockchain){
	const driver = require('bigchaindb-driver')


	const alice = new driver.Ed25519Keypair()
	const conn = new driver.Connection(
		'https://test.ipdb.io/api/v1/',
		{ app_id: 'fe7513d8',
		app_key: '3f4f3fee4d753c54adf3477c63cb8ca5' })

	const tx = driver.Transaction.makeCreateTransaction(
		{ UID: '1233513131351' },
		null,
		[ driver.Transaction.makeOutput(
			driver.Transaction.makeEd25519Condition(alice.publicKey))],
		alice.publicKey)
	const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
	console.log(txSigned)
	conn.postTransaction(txSigned)
	.then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
    .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
}