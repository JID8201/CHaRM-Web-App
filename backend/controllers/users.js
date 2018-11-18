const User = require('mongoose').model('User')

module.exports.create = (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(422).json({ msg: 'First name is required' })
  }
  if (!req.body.lastName) {
    return res.status(422).json({ msg: 'Last name is required' })
  }
  if (!req.body.email) {
    return res.status(422).json({ msg: 'Email is required' })
  }
  if (!req.body.password) {
    return res.status(422).json({ msg: 'Password is required' })
  }
  if (req.body.email &&
      req.body.firstName &&
      req.body.lastName &&
      req.body.password) {
    const userData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        res.status(201).json({ user: user.toAuthJSON() })
        return next()
      }
    })
  }
}

module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).json({ msg: 'Email is required' })
  }
  if (!req.body.password) {
    return res.status(422).json({ msg: 'Password is required' })
  }

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      return next(err)
    }
    const valid = await user.validatePassword(req.body.password)
    if (user && valid) {
      return res.status(200).json({user: user.toAuthJSON()})
    } else {
      return res.status(401).json({msg: 'Incorrect username or password'})
    }
  })
}

module.exports.getUser = (req, res, _) => {
  if (req.user) return res.status(200).json({ user: req.user })
  else return res.status(401).json({ msg: 'No token provided, please login or register' })
}
