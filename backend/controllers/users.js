const User = require('mongoose').model('User')

module.exports.create = (req, res, next) => {
  // this is kinda bad and should be improved
  // we should be able to return all these messages
  // like 'you are missing first name, last name ...
  if (!req.body.firstName) {
    res.locals.error = {
      code: 422,
      msg: 'First name is required'
    }
    return next()
  }
  if (!req.body.lastName) {
    res.locals.error = {
      code: 422,
      msg: 'Last name is required'
    }
    return next()
  }
  if (!req.body.email) {
    res.locals.error = {
      code: 422,
      msg: 'Email is required'
    }
    return next()
  }
  if (!req.body.password) {
    res.locals.error = {
      code: 422,
      msg: 'Password is required'
    }
    return next()
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
        res.locals.error = {
          code: 500,
          msg: 'Something went wrong in the DB'
        }
        return next()
      } else {
        res.locals.data = {
          status: 201,
          user: user.toAuthJSON()
        }
        return next()
      }
    })
  }
}

module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    res.locals.error = {
      code: 422,
      msg: 'Email is required'
    }
    return next()
  }
  if (!req.body.password) {
    req.locals.error = {
      code: 422,
      msg: 'Password is required'
    }
    return next()
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.error(err)
      res.locals.error ={
        code: 500,
        msg: err
      }
      return next()
    }
    if (user && user.validatePassword(req.body.password)) {
      res.locals.data = {
        code: 200,
        user: user.toAuthJSON()
      }
      return next()
    } else {
      res.locals.error = {
        msg: 'Incorrect username or password',
        code: 403
      }
      return next()
    }
  })
}
