# Sleep-windows
Sleep your pc from anywhere
1. Create a firebase project and get `google-services.json` file and place it in `android` folder
2. now get firebase service account file

**To generate a private key file for your service account:**

	1.  In the Firebase console, open  **Settings >  [Service Accounts](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)**.
	    
	2.  Click  **Generate New Private Key**, then confirm by clicking  **Generate Key**.
	    
	3.  Securely store the JSON file containing the key.

3. now go to [ngrok ](https://ngrok.com/) and register and grab the api key, put it into server.ts file
4. Grab the url of the database from the service account page ant put that in server.ts file
5. open server folder in terminal and run `yarn` then run `node install.ts` to install the server as windows services
6. open terminal in app folder and run `yarn => yarn dev`  to open into your phone
7. do not forget to change the security rules of the firestore database.😅
8. Now create apk file and enjoy.

