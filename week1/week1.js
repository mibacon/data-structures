var request = require('request');
var fs = require('fs');
var num = 1;




var loc = 'http://visualizedata.github.io/datastructures/data/m0' + num + '.html';
request(loc, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    for (var i=0; i<10; i++){
       fs.writeFileSync('/home/ubuntu/workspace/week1/data/m0' + num+ '.txt', body);
      num ++
    }
  }  
  else {console.error('request failed')}
})

