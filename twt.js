const path = require('path');
const fse = require('fs-extra');
const watch = require('watch');
const argv = require('minimist')(process.argv.slice(2));
const Chance = require('chance'),
      chance = new Chance();

const Twitter = require('twitter');
const easyimg = require('easyimage');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
//const transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

const wordList =
  ["Colada",
   "Palm Tree",
   "Traffic",
   "Croqueta",
   "Hurricane",
   "Panther",
   "Dolphin",
   "Manitee",
   "Flamingo",
   "Ice Cream",
   "Seaweed",
   "Mahi-mahi",
   "Boat",
   "Mango",
   "305",
   "Party",
   "Coconut",
   "Congas"];

//let randomizedList = chance.pickset(wordList, 3)
//let [firstWord, secondWord, thirdWord] = randomizedList;

let currentUserWindows = process.env['USERPROFILE'];
let tiltBrushDirectory = '\\Documents\\Tilt Brush\\Snapshots';
let backupDirectory = '\\Documents\\tiltBrushBackup'

// Twitter Setup
let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Command line args setup
if (argv.n === undefined || argv.e === undefined) {
  console.log('Please input all the arguments:')
  console.log('-n for name, and -e for email')
  return false
}
let firstName = argv.n;
let email = argv.e;
//let twitterHandle = argv.t;
// console.log(argv)

// setup e-mail data with unicode symbols
//var mailOptions = {
//    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//    to: email , // list of receivers
//    subject: '#BecksUrbanCanvas✔', // Subject line
//    html: '<b>Hello world 🐴</b>' // html body
//};

// send mail with defined transport object
//transporter.sendMail(mailOptions, function(error, info){
//    if(error){
//        return console.log(error);
//    }
//    console.log('Message sent: ' + info.response);
//});

// Initialization

let consoleTestMessage = `#beckurbancanvas Design Challenge with ${email}.`
// debug
console.log(consoleTestMessage);

// debug
let workingPath = `${currentUserWindows}${tiltBrushDirectory}`;
// console.log(workingPath)
let backupPath = `${currentUserWindows}${backupDirectory}`;
let backupPathUser = `${backupPath}\\${argv.n}`;

fse.ensureDir(backupPathUser, (err) => {
  if (err != null) return;
  console.log("creating user directory") // => null
  // dir has now been created, including the directory it is to be placed in
})
// console.log(backupPathUser);

// console.log("Reading missles");

let becksHash = 'BecksKey.png';
let becksKey = 'BecksKey.png';
let testImage = 'image.jpg';

//cropping image for watermark
easyimg.rescrop({
     src: testImage, dst: 'testEdited.jpg',
     width:500, height:500,
     cropwidth:300, cropheight:300,
     x:0, y:0
  }).then(
  function(image) {
     console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
  },
  function (err) {
    console.log(err);
  }
);
