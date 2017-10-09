// npm install mongodb
var fs = require('fs');
var request = require('request');

// IN MONGO exists a database `citibike` with a collection `stations`
var dbName = 'AAMeetings'; // name of Mongo database (created in the Mongo shell)
var collName = 'meetings'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data on citibike stations
// Insert the list of citibike stations (contained in an array) in the Mongo collection

var events = fs.readFileSync('/home/ubuntu/workspace/week5/output.txt')
var parsed = JSON.parse(events)


request(parsed, function (error, response, body) {
    // var meetingData = JSON.parse(body);
    // console.log(dbName)

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {
        if (err) { return console.dir(err); }

        var collection = db.collection(collName);

        //     // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(parsed);

        db.close();
        // })
    }); //MongoClient.connect

}); //request
