//include request and cheerio
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//Base Url for (A's)
var base_url = "http://archive.fortune.com/magazines/fortune/fortune500_archive/letters/A.html";

//make request using base url
request(base_url, function(err,resp,html){
  var info = [];      //array to store data
  //if no error
  if(!err){
    $ = cheerio.load(html); //load html into cheerio
    //select all items with class tablerow
    $('#tablerow').each(function(i, elem){
      //console.log($(elem).children().first().text());
      //console.log($(elem).children().eq(1).text());

      //push the info into the array first item is company and second is years
      info.push({
        company: $(elem).children().first().text().trim(),
        years: $(elem).children().eq(1).first().text().trim()
      });
    });

    var json = JSON.stringify(info, null, 2);

    fs.writeFile('fortune.json', json, 'utf8',function(err){
      if(err){
        console.log("Write Error: " + err);
      }
    });

    //loop through array to print
    for(var x=0;x<info.length;x++){
      console.log("---------------------------");
      console.log("Company: " + info[x].company);
      console.log("Years: " + info[x].years + "\n");
    }
  }
});
