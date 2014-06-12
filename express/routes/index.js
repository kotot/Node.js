/**
 * Created by kotot on 2014/6/8.
 */
exports.index = function(req, res){
    res.render('index', { title: 'HOME' });
};
exports.login = function(req, res){
    res.render('login', { title: '用户登陆'});
};
exports.doLogin = function(req, res){
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username===user.username && req.body.password===user.password){
        return res.redirect('/home');
    }
    else{

        req.session.name = 'donald';
        req.session.error='用户名或密码不正确';
        return res.redirect('/login');
    }
};
exports.logout = function(req, res){
    res.redirect('/');
};
exports.home = function(req, res){
    var user={
        username:'admin',
        password:'admin'
    }
    res.render('home', { title: 'Home',user: user});
};