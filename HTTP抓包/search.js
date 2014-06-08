/**
 * Created by kotot on 2014/6/3.
 */
var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var cheerio = require("cheerio");


read('./source');

function sentPost(file,filename){
    var post = qs.stringify({
        __VIEWSTATE: '/wEPDwUKLTI0MDAwODAzNmQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgYFCGNiTGluZUJSBQhjYkluZGVudAULY2JFbmNvZGVTdHIFDmNiRW5jb2RlTnVtYmVyBQljYk1vdmVTdHIFDmNiUmVwbGFjZU5hbWVzx+jWd0duLwh/3gnmBZ8kuacXY36TUge+X7Xi/g4jrZ4=',
        __EVENTVALIDATION: '/wEdAAsoYZM+5e3GxmTzNJ/SXo0fESCFkFW/RuhzY1oLb/NUVB2nXP6dhZn6mKtmTGNHd3PN+DvxnwFeFeJ9MIBWR693/0+kJGcigziRf+JnyYP3ngWOnPKUhxuCfOKb0tlvVuly5juiFHJSf6q9cXRA/+LsCzkidEk0Y8qCyJLcOKXNoEywswNt0lfddYqrIj/HYv1fNaBSlQ4gCFEJtbofwBY37hv76BH8vu7iM4tkb8en1QDKJJvXeVau9tK1NzWhT8nFcsVTijD5Rp5smiJLtqWo',
        TextBox1: 'var a = "hello world!";' + file,
        TextBox2: '',
        Button1: 'Obfuscate',
        cbEncodeStr: 'on',
        cbEncodeNumber: 'on',
        cbMoveStr: 'on',
        cbReplaceNames: 'on',
        TextBox3: '^_get_^_set_^_mtd_'
    });

    var req = http.request({
        host: 'www.javascriptobfuscator.com',
        port: 80,
        path: '/',
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Content-Length": post.length,
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "zh-cn",
            "Cache-Control": "no-cache",
            "Connection": "Keep-Alive",
            "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)",
            "X-Requested-With": "XMLHttpRequest"
        }
    }, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        }).on('end',function(){
            $ = cheerio.load(body);

            console.log( $('#TextBox2').text());
            write($('#TextBox2').text(),filename);
        });
        res.on('end', function () {
            //console.log(body);
        });
    });
    req.write(post);
    req.end();
}

function read(dir) {
    var files = fs.readdirSync(dir);

    for (var i = 0; i < files.length; i++) {
        var file = fs.readFileSync('./source/' + files[i], "utf8");
        //console.log(files[i]);
        sentPost(file,files[i]);
    }

}

function write(text,filename){

        fs.writeFile('obfuscated/'+filename, text, function (err) {
            if (err) throw err;
            console.log('It\'s saved!  '+filename);
        });

    console.log(text);
}

