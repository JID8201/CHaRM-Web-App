const csv = require('fast-csv')
const Recycling = require('mongoose').model('Recycling')

module.exports.create = (req, res, next) => {
  if (!req.body.items) {
    return next(new Error('the recycled items must be included'))
  }
  if (!req.body.zip) {
    return next(new Error('zip code is required'))
  }

  Recycling.create({
    items: req.body.items,
    zip: req.body.zip,
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
  if (req.query.startDate && req.query.endDate) {
    const start = new Date(req.query.startDate)
    const end = new Date(req.query.endDate)
    end.setUTCHours(23,59,59,999)
    Recycling.aggregate([
      {
        $match: {
          created_at: {'$gte': start, '$lte': end}
        },
      },
      {
        $unwind: '$items'
      }
    ], (err, result) => {
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
  } else { // fail safe
    Recycling.aggregate([{ $unwind: '$items' }], (err, result) => {
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
  }
}

module.exports.getGraphData = (req, res, next) => {
  if (req.query.startDate && req.query.endDate) {
    const start = new Date(req.query.startDate)
    const end = new Date(req.query.endDate)
    end.setUTCHours(23,59,59,999)
    Recycling.aggregate([
      {
        $match: {
          created_at: {'$gte': start, '$lte': end}
        },
      },
      {
        $unwind: '$items'
      },
      {
        $group: { _id: { items: '$items.type'}, amount: { $sum: '$items.amount' } }
      }
    ], (err, results) => {
      if (err) {
        res.locals.error = {
          status: 500,
          msg: 'error: ' + err
        }
        return next()
      } else {
        res.locals.data = {
          recycling: results
        }
        return next()
      }
    })
  } else {
    Recycling.aggregate([
      {
        $unwind: '$items'
      },
      {
        $group: { _id: { items: '$items.type'}, amount: { $sum: '$items.amount' } }
      }
    ], (err, results) => {
      if (err) {
        res.locals.error = {
          status: 500,
          msg: 'error: ' + err
        }
        return next()
      } else {
        res.locals.data = {
          recycling: results
        }
        return next()
      }
    })
  }
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
    .aggregate([
      {
        $match: {
          created_at: {'$gte': start, '$lte': end}
        },
      },
      {
        $unwind: '$items'
      }
    ], (err, result) => {
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
          Type: entry.items.type,
          Zip : entry.zip,
          Amount : entry.items.amount,
          Notes: entry.items.notes,
          Timestamps: entry.created_at
        })
      }
      csvStream.end()
    })
}
