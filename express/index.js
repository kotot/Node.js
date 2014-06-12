var express = require('express');
var ejs = require('ejs');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

app.set('port',3000);
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views','./views');
app.set('view option',{layout:false});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({secret : 'donald'}));

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert">' + err + '</div>';
    next();
});

app.get('/', routes.index);
app.all('/login', notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', authentication);
app.get('/logout', routes.logout);
app.get('/home', authentication);
app.get('/home', routes.home);

function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error='请先登陆';
        return res.redirect('/login');
    }
    next();
}
function notAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error='已登陆';
        return res.redirect('/');
    }
    next();
}

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});