const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-routermodel');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 27);
  user.password = hash;

  Users.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(err => {
    res.status(500).json({
      message: 'Sorry you cannot be added because you arent cool enough.', err
    });
  });
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

  Users.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome ${user.username}!`
      });
      console.log(token)
    }else{
      res.status(401).json({
        message: "I dont even know you"
      });
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

function generateToken(user){
  const payload = {
    username: user.username,
    subject: user.id,
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}


module.exports = router;
