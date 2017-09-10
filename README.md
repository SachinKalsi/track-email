# Track email
This app lets you know if the emails you've sent have been read or not
# Prerequisites
Node JS (>6.9)
# How to execute ?
1. Set up env variables (i.e., EMAIL & PASSWORD of your gmail account)
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
