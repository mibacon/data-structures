// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('/home/ubuntu/workspace/week2/m05.txt');

// load `content` into a cheerio object
//$ has both methods from cheerio and also contents from 'content' variable
var $ = cheerio.load(content);

// print names of thesis students
var box = $('td').filter(function(i, el) {
  return $(this).attr('style') == 'border-bottom:1px solid #e3e3e3; width:260px';
}).contents().not('b').not('h4').not('.detailsBox').not('span').text()

// var box1 = box.each(function(i,el){
//     $(this).first()
//     console.log($(el).text())
// })
var box1=box.replace(/\([^)]*\)/g,'')
var box2 = box1.replace(/^\s+|\s+$|\s+(?=\s)/g,'')

fs.writeFileSync('/home/ubuntu/workspace/week2/output.txt',box2)

console.log(box2)
// console.log(box.text())

// print project titles
// $('.project .title').each(function(i, elem) {
//     console.log($(elem).text());
// });