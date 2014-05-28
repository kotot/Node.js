/**
 * Created by kotot on 2014/5/26.
 */

var net = require('net');
var count = 0;
var user = {};
var server = net.createServer(function(conn){
    conn.write('welcom!\r\n'+ count + ' other people are connected!\r\n');
    count++;
    conn.setEncoding('utf8');
    var nickname;

    conn.on('data',function(data){
        if(!nickname) {
            if (user[data]) {
                conn.write('already used!\r\n');
                return;
            }
            else {
                nickname = data;
                user[nickname] = conn;
                for(var i in user){
                    user[i].write( nickname + '  join in the room!\r\n');
                }
            }
        }
        else{
            for(var i in user){
                user[i].write(nickname+':'+data+'\r\n');
            }
        }
    });
    conn.on('close',function(){
        count--;
    });
    console.log('new connection!');
});

server.listen(3000,function(){
    console.log('server listening on 3000');
});