const request = require("request");

// Making a request
// Note: Most of the time we will be making request to an API unlike the example here
request("http://www.google.com", function(error, response, body){
    if(error){ // Happens when we don't get a response from a server because the url doesn't exist or request timeout or something else
        console.log("Something went wrong!");
        console.log(error);
    }
    else if(response.statusCode == 200){
        // Things worked!
        console.log(body); // Prints the HTML of Google's Homepage
    }
});