var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var moment = require('moment');

var meetingsData = [];

var content = fs.readFileSync('/home/ubuntu/workspace/week5/m05.txt');
var $ = cheerio.load(content);
$('tbody tr').filter(function (i, el) {
        return $(this).attr('style') == 'margin-bottom:10px'
    })
    .each(function (i, elem) {
        var thisMeeting = new Object;
        thisMeeting.branch = $(elem).find('td').eq(0).contents().eq(1).text().trim()
        thisMeeting.name = $(elem).find('td').eq(0).contents().eq(4).text().trim()
        thisMeeting.address = new Object;
        thisMeeting.address.line1 = $(elem).find('td').eq(0).contents().eq(6).text().trim().split(",")[0]
        thisMeeting.address.line2 = $(elem).find('td').eq(0).contents().eq(6).text().trim().split(",")[1]
        thisMeeting.address.line3 = $(elem).find('td').eq(0).contents().eq(8).text().trim().split('NY')[0]
        thisMeeting.address.city = 'New York'
        thisMeeting.address.zip = $(elem).find('td').eq(0).contents().eq(8).text().trim().split('NY')[1]

        thisMeeting.events = []
        thisMeeting.details = $(elem).find('td').eq(0).find('.detailsBox').text().trim()
        //can't get wheelchair to work

        var apiKey = process.env.GMAKEY

        var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + thisMeeting.address.line1.split(' ').join('+') + '&key=' + apiKey;

        request(apiRequest, function (err, resp, body) {
            if (err) { throw err; }
            var temp = {}
            thisMeeting.address.latLong = JSON.parse(body).results[0].geometry.location;
        });
        
        $(elem).find('td').find(':contains("From")').each(function (i, el) {
            var temp = {};
            temp.weekDay = $(el).contents().text().replace('s From', "")
            //had to redo this section, but now it works!
            $(el).filter(function () {
                temp.beginTime = $(this.nextSibling).text().trim();
                temp.beginTimeMoment = parseInt(moment(temp.beginTime, "h:mm A").format("H"))
            });

            $(el).next().filter(function () {
                temp.endTime = $(this.nextSibling).text().trim();

            })

            $(el).next().next().next().filter(function () {
                // $(el).nextUntil('<br>').filter(function () {
                temp.meetingType = $(this.nextSibling).text().trim()
            })

            $(el).next().next().next().next().next().filter(function () {
                temp.meetingSpecial = $(this.nextSibling).text().trim();

            })

            thisMeeting.events.push(temp);
        })


        setTimeout(function () {
            meetingsData.push(thisMeeting)
            // console.log(meetingsData)
            fs.writeFileSync('/home/ubuntu/workspace/week5/output.txt', JSON.stringify(meetingsData))
        }, 5000)


    })





//Here I try to request the http file and then run cheerio through and then select tags.
// request('http://visualizedata.github.io/datastructures/data/m05.html', function (error, response, body) {
//     var $ = cheerio.load(body);
//     async.eachSeries(body, function(value,callback){
//         // if (!error && response.statusCode == 200) {
//          $('td h4').each(function(i, elem) {
//             empty.push($(elem).text());
//             });
//             callback();
//         // }
//         // else {console.error('request failed')}
//         }, function(){
//         console.log(empty);
//     });
// });
