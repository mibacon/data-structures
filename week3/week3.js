var request = require('request');
var fs = require('fs');// npm install request
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY


var addresses = fs.readFileSync('/home/ubuntu/workspace/week2/output.txt').toString().split('\t')

console.log(addresses[0])
var meetingsData = [];

//eachSeries in the async module iterates over an array and operates on each item in the array in series

async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    console.log(apiRequest)
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        thisMeeting.formatAddress = JSON.parse(body).results[0].formatted_address;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 1000);
}, function() {
    console.log(meetingsData);
    fs.writeFileSync('/home/ubuntu/workspace/week3/output.txt',JSON.stringify(meetingsData), 'utf-8')
});

