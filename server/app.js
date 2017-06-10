const express = require('express');
//const morgan = require('morgan');
const path = require('path');
var fs = require('fs')

const apiRoutes = require('../routes/api')
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var secrets = require('./client-secret-web.json')
var google = require('googleapis')
var gmail = google.gmail('v1');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var token = token = fs.readFileSync(__dirname + '/../uploads/access-token', 'utf8');
var scope =  ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/gmail.modify']
const app = express();
// Setup logger
//app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
  //app.use(cookieParser());
  app.use(bodyParser());
//app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize())
//app.use(passport.session());
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//  // User.findById(id, function(err, user) {
//     done(err, {id:3, name:'me', cool: true});
//  // });
// });
passport.use(new GoogleStrategy({
    clientID: secrets.web.client_id, //GOOGLE_CLIENT_ID,
    clientSecret:secrets.web.client_secret, // GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:9000/auth/google/callback' //"http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // var args = [...arguments]
    // args.forEach(function(a,i) {
    //     console.log('*********')
    //     console.log(`argument # ${i} `, a)
    // });
    fs.writeFile(__dirname + '/../uploads/access-token', accessToken, (err)=>{
        if (err){
            return done(err, null)//,{accessToken})
        }
        else{
            console.log('wrote token')
            return done(null, profile,{accessToken})
        }
    })
  }
));
app.get('/login', (req, res) => {
  res.json({loginPage: true});
})
app.get('/tester', (req, res) => {
  console.log('redirect from tester')
  res.json({tester: 'youzzhere'});
})
app.get('/auth/google',
  passport.authenticate('google', { session:false, scope }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { session:false, failureRedirect: '/login' }),
  function(req, res) {
   // console.log('redirect from callback', req.user)
    res.redirect('/');
  });
app.get('/justatest', 
 // passport.authenticate('google', { session:false, scope}),// failureRedirect: '/login', successRedirect:'/tester', scope }),
  function(req, resp) {
     // console.log('user', req.user)
    //   var token
    // //var subjectsList = []
    //   if (fs.existsSync(__dirname + '/../uploads/access-token')) {
    //     //console.log('path found')
    //     token = fs.readFileSync(__dirname + '/../uploads/access-token', 'utf8');
    // }
    
    //if(!token){ console.log('badtoken', token); return res.redirect('/auth/google')}
    var draftsPromise = getListDraftIds().then(function(ids){
        return Promise.all(ids.map(getDraftSubject))
    })

    draftsPromise
    .then(function(data){
        resp.json(data)
    })
    .catch(function(error){
        console.log('error in catch', error)
    })
 });
function getListDraftIds(){
    return new Promise(function(resolve, reject){
        gmail.users.drafts.list({
            access_token: token, //tokens.access_token,
            userId: 'me'
            }, function(err, res){
            if(err){console.log('MYERROR',err);reject(err)}
            var ids = res.drafts.map(function(d){return d.id})
            resolve(ids)
        });  
    })
  //console.log('xxxx', x)
}
function getDraftSubject(id, index){
    
    return new Promise(function(resolve, reject){
        //console.log('gmail','token', gmail, token)
        gmail.users.drafts.get({
            access_token: token, //tokens.access_token,
            userId: 'me',
            id: id
         }, function(err, res){
             if(err){throw new Error(err)}
             var subjects = res.message.payload.headers.filter((header) => {
                 return header.value != undefined && header.name === 'Subject'
                })
                if(subjects.length && subjects[0].value != undefined){
                    var subject = subjects[0].value || `empty-${index}`
                    //resolve({subject})
                     resolve({subject, id})
                }
                else{
                    var subject =`missing-${index}`
                    resolve({subject, id})
                }
    
    })
    })
}
module.exports = app;