var request = require('request');
var github_token = require('./secrets');
var fs = require('fs');

function downloadImageByURL(url, filePath) {

request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
}


function getRepoContributors(repoOwner, repoName, cb) {


    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': github_token['GITHUB_TOKEN']
        }
    };

    request(options, function(err, res, body) {
        var jsonObject = JSON.parse(body);
        cb(err, jsonObject);
  });
}
var everythingsFine = process.argv.length >= 4;
if (everythingsFine) {
getRepoContributors(process.argv[2], process.argv[3], function(err, contributors) {
console.log("Errors:", err);
   for (var i = 0; i < contributors.length; i++) {
    var contributor = contributors[i];
    var avatar_url = contributor.avatar_url
    var filePath = "avatars/" + contributor.login + ".jpg";
    downloadImageByURL(avatar_url, filePath);
    }
});
} else {
    console.log('Enter a valid argument');
}

