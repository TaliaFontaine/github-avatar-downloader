var request = require('request');
var github_token = require('./secrets');
var fs = require('fs');
//Make a function with two parameters for remote image URL and file path
function downloadImageByURL(url, filePath) {
//write HTTP request that downloads the remote image url and pipes the local path for where to persist the file
request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
}

//Write a function that has three parameters: owner of repo, repo name, and callback
function getRepoContributors(repoOwner, repoName, cb) {

//Write an object with key: contributors' url concatenated with owner and name of repo;
//and key: headers containing user agent and github token
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': github_token['GITHUB_TOKEN']
        }
    };
//Parse JSON string into an object
    request(options, function(err, res, body) {
        var jsonObject = JSON.parse(body);
        cb(err, jsonObject);
  });
}
//callback functions

var everythingsFine = process.argv.length >= 4;
if (everythingsFine) {
//Write two command line arguments for repoOwner and repoName that is available in Node using process.argv
getRepoContributors(process.argv[2], process.argv[3], function(err, contributors) {
console.log("Errors:", err);
//Callback function iterates over the results and constructs a file path using login value then passes value and file path to downloadImageByURL
   for (var i = 0; i < contributors.length; i++) {
    var contributor = contributors[i];
    var avatar_url = contributor.avatar_url
    var filePath = "avatars/" + contributor.login + ".jpg";
//downloadImageByURL fetches avatar_url and saves this information to given filePath
    downloadImageByURL(avatar_url, filePath);
    }
});
} else {
    console.log('Enter a repo owner and repo name');
}

