var request = require('request');
var github_token = require('./secrets');


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

getRepoContributors("jquery", "jquery", function(err, result) {
console.log("Errors:", err);
   for (var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url);
    }
});

