# open-weatherAPI

import the postman collection file.

The .env file is given for quick setup

to install modules 
npm install
and then 
npm start

#forecast api
here the mandatory query parameters are lat & long which is required to get the weather details of that particular location.
This will give the forecast of days and time 
http://localhost:7777/location?lat=?&long=?

#weather api
here an extended query parameter is add to show the current details like Humidity, temperature, weather type, etc.
This will add an extra node to the response json of current weather details and should be call only when boolean is true like current=1.
http://localhost:7777/location?lat=?&long=?&current=1
