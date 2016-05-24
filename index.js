let watch = require('watch');

let path = 'C:\\Users\\ethycol\\Documents\\tmp';

watch.createMonitor(path, function (monitor) {
    monitor.on("created", function (f, stat) {
        console.log(f);
    });
});