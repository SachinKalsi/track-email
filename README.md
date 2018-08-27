# Track email
This app lets you know if the emails you've sent have been read or not
# Prerequisites
Node JS (>6.9)

Gmail Account

MongoDB
# How it works ?

Embed a tiny (1x1 resolution preferably) image inside the body of the email, with a unique URL (or Unique ID) pointing to our server
& send it to the user. Whenever the user opens the email which we sent, the browser tries to render the image by calling the unique URL. Whenever the Unique URL hits our server, we can log the details such as timestamp & also we can trigger some actions if required. And this confirms that the user has read the Email which we sent

# How to execute ?
1. Set up env variables by creating .env file (under project folder i.e., under `track-email`) with the following contents
	 * NODE_ENV=development
	 * LOGGER_LEVEL=silly
	 * PORT=3000
	 * MONGO_URL=mongodb://localhost/email_tracker
	 * EMAIL=<YOUR_FROM_EMAIL_ADDRESS>
	 * PASSWORD=<YOUR_PASSWORD>
	 * URL=http://localhost:3000/
	 * IMAGE_NAME=image.jpg
2. Go to https://www.google.com/settings/security/lesssecureapps & enable less secure apps.
3. ```npm install & npm start``` The server is running on the port 3000 (as mentioned in env file)
# Send email
- API: http://localhost:3000/
- METHOD: POST
- BODY PARAMS: subject, to, html
- CONTENT TYPE: application/json
# Example
  ```
  {
	"subject": "Subject Line",
	"to": "sachinkalsi15@gmail.com",
	"html": "<b>Hi Sachin, This application is really helping me a lot. Thank You So Much.</b>"
 }
```
