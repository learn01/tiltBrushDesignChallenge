let path = require('path');
let fse = require('fs-extra');
let watch = require('watch');
let argv = require('minimist')(process.argv.slice(2));

let Twitter = require('twitter');


let currentUserWindows = process.env['USERPROFILE'];
let tiltBrushDirectory = '\\Documents\\tmp';
let backupDirectory = '\\Documents\\tiltBrushBackup'

// Twitter Setup
let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Command line args setup
if (argv.n === undefined || argv.e === undefined || argv.t === undefined) {
  console.log('Please input all the arguements:') 
  console.log('-e for email, -n for name, and -t for twitter handle')
  return false
}
let firstName = argv.n;
let email = argv.e;
let twitterHandle = argv.t;
// console.log(argv)

// Initialization

let twitterMessage = `Realize your imagination @${twitterHandle} .`
// debug
console.log(twitterMessage);

// debug
let workingPath = `${currentUserWindows}${tiltBrushDirectory}`;
console.log(workingPath)
let backupPath = `${currentUserWindows}${backupDirectory}`;
let backupPathUser = `${backupPath}\\${argv.n}`;

fse.ensureDir(backupPathUser, (err) => {
  if (err != null) return;
  console.log("creating user directory") // => null
  // dir has now been created, including the directory it is to be placed in
})
console.log(backupPathUser);

console.log("Reading missles");

watch.createMonitor(workingPath, (monitor) =>
    monitor.on("created", (filePath, stat) => {
      
      
      
      // Send through twitter
      let data = require('fs').readFileSync(filePath);
      client.post('media/upload', {media: data}, (error, media, response) => {
        if (!error) {
          // Lets tweet it
          let status = {
            status: twitterMessage,
            media_ids: media.media_id_string // Pass the media id string
          }
          // Post to twitter
          client.post('statuses/update', status, (error, tweet, response) => {
            if (!error) {
              console.log(tweet);
            }
          });

        }
      });
      
      
      // Backup files to directory subsystem
      let currentFileSrc = path.parse(filePath);
      let backupLocation = backupPathUser + '\\' + currentFileSrc.base;
      // console.log(backupLocation)
      fse.move(filePath, backupLocation, (err) => {
        if (err) return console.error(err)
        console.log(`Successfully moved ${currentFileSrc.base} to ${backupLocation}`)
      });
      // **************************************
      
    }));
        

