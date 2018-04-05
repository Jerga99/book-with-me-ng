const keys = require("../keys");
const User = require("../models/user");


exports.signup = function(req, res, next){
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const passwordConf = req.body.passwordConfirmation;

  if(password !== passwordConf) {
    return res.status(422).send({error: "Password is not same as confirmation password!"});
  }

  if(!email || !password){
    return res.status(422).send({error: "You must provide email and password!"});
  }

 // See if user with given email exists
 User.findOne({email: email}, function(err, existingUser){
  if(err){
    //this will eventually be handled by your error handling middleware
    return res.status(422).send({errors: err.errors});
  }

  // If a user with email does exist, return an error
  if(existingUser){
    return res.status(422).send({error: "Email is in use"}); //Umprocesable entity
  }
  // If a user with email; does not exist , create and save user record
  const user = new User({
    username: username,
    email: email,
    password: password
  });

  user.save(function(err){
    if(err) return res.status(422).send({errors: err.errors});

    // Respond to request indicating the user was created
    return res.json({registered: true});
   });
 });
}
