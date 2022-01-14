let http = require('http')
// ngrok for http tunnel
const ngrok = require('ngrok')
// importing firebase admin
const { credential } = require('firebase-admin')
const { initializeApp } = require('firebase-admin/app')
const {
	getFirestore,
	Timestamp,
	FieldValue,
} = require('firebase-admin/firestore')

// location of the service account json file downloaded from the firebase console
var serviceAccount = require('I:\\Sleep-windows\\firebase.json')

// starting the firebase admin skd
initializeApp({
	credential: credential.cert(serviceAccount),
	databaseURL: 'your url',
})

// the firestore database
const db = getFirestore()

// the server
let server = http.createServer(function (req, res) {
	// POST request
	if (req.method === 'POST') {
		// Initialize Firebase
		// console.log('sleeping..💤💤')
		// code for putting the pc to sleep
		var ffi = require('ffi-napi')
		var powrprof = ffi.Library('powrprof.dll', {
			SetSuspendState: ['int', ['int', 'int', 'int']],
		})
		function invokeStandby() {
			powrprof.SetSuspendState(0, 0, 0)
		}
		invokeStandby()
		// console.log('sleeped')
	}
	// GET request
	if (req.method === 'GET') {
		// console.log('GET')
		// Just some data to inform app that the pc is on
		res.end(JSON.stringify({ payload: true }))
	} else {
		res.writeHead(405, { 'Content-Type': 'text/plain' })
		res.end('Method Not Allowed\n')
	}
})

// starting the server
server.listen(8443)

// starting ngrok tunnel
async function getUrl() {
	let token = 'your key'
	await ngrok.authtoken(token)
	const url = await ngrok.connect({
		addr: '8443',
	})
	// putting the url on the firestore database
	if (url) {
		db.collection('url').doc('url').set({ url: url })
	}
	// console.log(url)
}
// running the funtion
getUrl()
