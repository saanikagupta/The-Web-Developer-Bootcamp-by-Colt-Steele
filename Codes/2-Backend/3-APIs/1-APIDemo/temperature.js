const request = require("request");

request("http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=b305195054cb55cd4e9c6bfa1d4eb342&units=metric", function(error, response, body){
    if(!error && response.statusCode == 200){
        const parsedData = JSON.parse(body);
        // console.log("Temperature in Delhi: " + parsedData["main"]["temp"] + " degrees celsius");
        
        // Using template literal to embed dynamic data using variables in the string
        // Pay attention to backticks
        console.log(`Temperature in Delhi: ${parsedData["main"]["temp"]} degrees celsius`);
    }
});