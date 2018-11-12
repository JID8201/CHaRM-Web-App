const csv = require('fast-csv')
const Recycling = require('mongoose').model('Recycling')

module.exports.create = (req, res, next) => {
  if (!req.body.type) {
    return next(new Error('type of recycled item is required'))
  }
  if (!req.body.zip) {
    return next(new Error('zip code is required'))
  }
  if (!req.body.amount) {
    return next(new Error('amount of recycled item is required'))
  }

  Recycling.create({
    types: req.body.types,
    zip: req.body.zip,
    amount: req.body.amount,
    notes: req.body.notes ? req.body.notes : []
  }, (err, result) => {
    if (err) {
      res.locals.error = {
        status: 500,
        msg: 'error: ' + err
      }
      return next()
    } else {
      res.locals.data = {
        recycling: result,
        msg: 'Recycling data successfully added'
      }
      return next()
    }
  })
}

module.exports.getDateRange = (req, res, next) => {
  // this is bad, shouldn't throw error should return dates in the given range or all
  // if (!req.query.startDate) {
  //   return next(new Error('Starting date range required'))
  // }
  // if (!req.query.endDate) {
  //   return next(new Error('Ending date range required'))
  // }
  if (!req.query.startDate && !req.query.endDate) {
    Recycling.find({}, (err, result) => {
      if (err) {
        res.locals.error = {
          status: 500,
          msg: 'error: ' + err
        }
        return next()
      } else {
        res.locals.data = {
          recycling: result
        }
        return next()
      }
    })
  } else {
    const start = new Date(req.query.startDate)
    const end = new Date(req.query.endDate)
    Recycling.find({created_at: {'$gte': start, '$lte': end}},
      (err, result) => {
        if (err) {
          // we done fucked up bad
          res.locals.error = {
            status: 500,
            msg: 'error: ' + err
          }
          return next()
        } else {
          res.locals.data = {
            recycling: result
          }
          return next()
        }
      }
    )
  }
}

module.exports.get = (req, res, next) => {
  Recycling.find({}, (err, result) => {
    if (err) {
      res.locals.error = {
        status: 500,
        msg: 'error: ' + err
      }
      return next()
    } else {
      res.locals.data = {
        recycling: result
      }
    }
  })
}

module.exports.getYearCSV = (req, res, next) => {
  if (!req.query.year) {
    return next(new Error('Please select which year of data to download'))
  }

  const csvStream = csv.createWriteStream({
    headers: true
  })

  const year = parseInt(req.query.year)
  const start = new Date(year, 0)
  const end = new Date(year + 1, 0)

  res.setHeader('content-type', 'text/csv')

  csvStream.pipe(res)
  Recycling
    .find({created_at: {'$gte': start, '$lte': end}})
    .exec((err, result) => {
      if (err) {
        res.locals.error = {
          status: 404,
          msg: 'Could not find anything'
        }
        csvStream.end()
        return next()
      }
      let filename = year.toString() + '.csv'
      let header = 'attachment; filename=' + filename
      res.setHeader('Content-disposition', header)

      for (let entry of result) {
        csvStream.write({
          Type: entry.type,
          Zip : entry.zip,
          Amount : entry.amount,
          Notes: entry.notes,
          Timestamps: entry.created_at
        })
      }
      csvStream.end()
    })
}
