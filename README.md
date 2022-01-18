# Sleep-windows
Sleep your pc from anywhere
Installation:
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

How this works:
1. I created a react-native app with a simple button.
![Screenshot_20220118-172052_SleepApp](https://user-images.githubusercontent.com/68942390/149933495-301c761f-066d-48e3-a056-8e540739009c.png)
3. Created node js server for putting pc to sleep when we receive any post requests. (this just works on the local network)
4. I used `ngrok` to create a tunnel. (now if I `POST` a request on that URL my pc goes to sleep)
5. And installed that `server.ts` file as windows service in pc. so whenever my pc starts of wakes up from the sleep server.ts start an HTTP server and generate a new tunnel URL. then saves it to firestore database.
6. when I open my app in the phone it gets the tunnel URL from the firestore and when pressing the button it sends a `POST` request on that URL and PC goes to sleep💤💤

