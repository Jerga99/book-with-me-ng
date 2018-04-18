const config = require("../config");
const User = require("../models/user");
const jwt = require('jwt-simple');
const {normalizeErrors} = require("../helpers/mongoose-helper");


exports.signup = function(req, res, next){
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const passwordConf = req.body.passwordConfirmation;

  if(password !== passwordConf) {
    return res.status(422).send({errors: [{title: 'Invalid Password', detail: "Password is not same as confirmation"}] });
  }

  if(!email || !password){
    return res.status(422).send({errors: [{title: 'Data Missing', detail: "Provide email and password"}] });
  }

 // See if user with given email exists
 User.findOne({email: email}, function(err, existingUser){
  if(err){
    //this will eventually be handled by your error handling middleware in case of next()
    return res.status(422).send({errors: normalizeErrors(err.errors) });
  }

  // If a user with email does exist, return an error
  if(existingUser){
    return res.status(422).send({errors: [{title: 'Invalid Email', detail: "Email is in use"}] }); //Umprocesable entity
  }
  // If a user with email; does not exist , create and save user record
  const user = new User({
    username: username,
    email: email,
    password: password
  });

  user.save(function(err){
    if(err) return res.status(422).send({errors: normalizeErrors(err.errors) });

    // Respond to request indicating the user was created
    return res.json({registered: true});
   });
 });
}

exports.signin = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) return res.status(422).send({errors: [{title: 'Missing Data', detail: "Provide email and password"}] });

  User.findOne({email: email}, function(err, user) {
    if (err) return res.status(422).send({errors: normalizeErrors(err.errors) });
    if (!user) return res.status(422).send({errors: [{title: 'Invalid User', detail: "User doesnt exist"}] });

    if (user.isSamePassword(password)) {
      return res.json({token: jwt.encode({userId: user.id, email: user.email, username: user.username}, config.SECRET), email: user.email})
    } else {
      return res.status(422).send({errors: [{title: 'Wrong Data', detail: "Wrong email or password"}] });
    }
  })
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization || '';

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user){
      if (err) return res.status(422).send({errors: normalizeErrors(err.errors) });

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return res.status(422).send({errors: [{title: 'Not Authorized', detail: "You are not authorized"}] });
      }
    });
  } else {
    return res.status(422).send({errors: [{title: 'Not Authorized', detail: "You are not authorized"}] });
  }
}

function parseToken(token) {
  if (token.includes('Bearer')) {
    return jwt.decode(token.split(' ')[1], config.SECRET)
  }

  return token;
}
