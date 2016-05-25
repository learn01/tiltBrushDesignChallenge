let watch = require('watch');
let argv = require('minimist')(process.argv.slice(2));
let fse = require('fs-extra');
let R = require('ramda');

let path = 'C:\\Users\\ethycol\\Documents\\tmp';
let backPath = 'C:\\Users\\ethycol\\Documents\\backtmp'
let fName = argv.n;
let email = argv.e;
let twitter = argv.t;

// used for debugging
// console.log(`Name is ${fName}, email is ${email}, and twitter is ${twitter}`);


// walk the directory for all the items
let items = []; // files, directories, symlinks, etc
fse.walk(path)
  .on('data', (item) => 
    items.push(item.path))
  .on('end', () => {
    let newItems = R.tail(items);
    // let curriedPath = fse.move('')
    R.forEach(console.dir, newItems); }// => [ ... array of files]
  )


// Move files ***********

// let moveFiles = (oldPath, newPath, err) =>  
//     fse.move(oldPath, newPath, (err) => {
//         if (err) return console.error(err)
//         console.log("success!")
//     })

// let curriedMoveFiles = R.curry(moveFiles);


// Move files ***********

watch.createMonitor(path, (monitor) =>
    monitor.on("created", (f, stat) =>
        console.log(f)));
        
// let Twitter = require('twitter');

// let client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

// client.post('statuses/update', {status: 'I Love VR, cli test @willieavendano'},  (error, tweet, response) => {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });