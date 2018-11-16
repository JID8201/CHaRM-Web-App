import { Router } from 'express'
const router = Router()
import { getGraphData, getDateRange, getYearCSV } from './controllers/recycling'
import { create, login } from './controllers/users'
import passport from 'passport'
require('./configs/passport')

router.post('/register', create)
router.post('/login', login)


router.post('/recycling')
router.get('/recycling', passport.authenticate('jwt', {session: false}), getDateRange)
router.get('/graph-data', passport.authenticate('jwt', {session: false}), getGraphData)
router.get('/yearcsv', passport.authenticate('jwt', {session: false}), getYearCSV)


// if (process.env.NODE_ENV === 'development') {

//   router.use(function(err, req, res) {
//     res.status(err.status || 500)
//     res.render('error', {
//       message: err.message,
//       error: err
//     })
//   })

// }

// // production error handler
// // no stacktraces leaked to user
// router.use(function(err, req, res) {
//   res.status(err.status || 500)
//   res.render('error', {
//     message: err.message,
//     error: {}
//   })
// })

// rewrite this later
router.use((req, res, next) => {
  if (res.locals.data) {
    let response = Object.assign({}, res.locals.data, {
      'success': 'true'
    })
    return res.status(200).json(response)
  } else if (res.locals.error) { // Any errors thrown are be handled below
    let statusCode = res.locals.error.code || 500
    let response = Object.assign({}, res.locals.error, {
      'status': 'error'
    })
    return res.status(statusCode).json(response)
  } else {
    // not every error should be a generic 500 error!!!!!!!!!!!!
    console.error('generic server error')
    return res.status(500).json({
      'status': 'error',
      'code': 500,
      'msg': 'Internal Server Error'
    })
  }
})

module.exports = router
