var Service = require('node-windows').Service

// Create a new service object
var svc = new Service({
	name: 'SleepNodeServer',
	description: 'it will sleep the pc',
	script: 'I:\\Sleep-windows\\Server\\server.ts',
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
	svc.start()
})

svc.install()
