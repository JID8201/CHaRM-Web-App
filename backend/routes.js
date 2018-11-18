import { Router } from 'express'
const router = Router()
import { getGraphData, getDateRange, getYearCSV } from './controllers/recycling'
import { create, login, getUser } from './controllers/users'
import passport from 'passport'
require('./configs/passport')

router.post('/register', create)
router.post('/login', login)


router.post('/recycling')
router.get('/recycling', passport.authenticate('jwt', {session: false}), getDateRange)
router.get('/graph-data', passport.authenticate('jwt', {session: false}), getGraphData)
router.get('/yearcsv', getYearCSV) // unprotected until I can figure out how to download with headers
router.get('/user', passport.authenticate('jwt', {session: false}),  getUser)

if (process.env.NODE_ENV === 'development') {
  router.use(function(err, req, res) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })

}

// production error handler
// no stacktraces leaked to user
// router.use(function(err, req, res) {
//   res.status(err.status || 500)
//   res.render('error', {
//     message: err.message,
//     error: {}
//   })
// })

module.exports = router
