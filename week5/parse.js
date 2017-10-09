var fs = require('fs');

var dbName = 'AAMeetings';
var collName = 'meetings';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function (err, db) {
    if (err) { return console.dir(err); }

    var collection = db.collection(collName);

    // Select three Citibike stations
    collection.aggregate([
            { $unwind: "$events" },

            { $match: { "events.weekDay": "Tuesday" } },
            {
                $project: {
                    branch: 1,
                    name: 1,
                    address: 1,
                    events: 1,
                    details: 1,
                    timeMore: { $gt: ["$events.beginTimeMoment", 16] }
                }
            },
            { $match: { "timeMore": true } }



                        ])

        .toArray(function (err, docs) {
            if (err) { console.log(err) }

            else {
                console.log("Writing", docs.length, "documents as a result of this aggregation.");
                fs.writeFileSync('mongo_aggregation_result1.JSON', JSON.stringify(docs, null, 4));
            }
            db.close();

        });

}); //MongoClient.connect
