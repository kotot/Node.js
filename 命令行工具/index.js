/**
 * Created by kotot on 2014/5/26.
 */

var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;

fs.readdir(process.cwd(), function (err, files) {
    console.log(' ');

    if (!files.length) {
        return console.log(' No files to show! ');
    }

    console.log(' select which file or directory you want it see \n');

    function file(i) {
        var filename = files[i];
        var stats = [];
        fs.stat('.' + '/' + filename, function (err, stat) {
            stats[i] = stat;
            if (stat.isDirectory()) {
                console.log('    ' + i + '  \\' + filename );
            }
            else {
                console.log('    ' + i + '  ' + filename );
            }
            if (++i == files.length) {
                read();
            }
            else {
                file(i);
            }
        });
    }
    function read(){
        stdout.write('enter your choice:');
        stdin.resume();
        stdin.on('data',option);
    }
    function option(data){
        var filename = files[Number(data)];
        if(!filename){
            stdout.write('enter your choice');
        }
        else{
            stdin.pause();
            fs.readFile('./' + filename,'utf8',function(err,data){
                console.log(data);
            });
        }
    }
    file(0);
});