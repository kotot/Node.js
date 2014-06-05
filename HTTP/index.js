var qs = require('querystring');
require('http').createServer(function (req, res) {
    if ('/' == req.url) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end([
            '<form method = "POST" action = "/url">',
            '<h1>My form</h1>',
            '<filedset>',
            '<lable>Personal information</lable>',
            '<p>what is your name</p>',
            '<input type = "text" name = "name">',
            '<p><button>Submit</button></p>',
            '</form>'
        ].join(''));
    }
    else {
        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<p>Content-type:' + req.headers['Content-Type'] + '</p>' + '<p>' + qs.parse(body).name + '</p>');
        })
    }

}).listen(3000);