const csv = require('fast-csv')
const Recycling = require('mongoose').model('Recycling')

module.exports.create = (req, res, next) => {
  if (!req.body.items) {
    return res.status(422).json({ msg: 'the recycled item(s) must be include' })
  }
  if (!req.body.zip) {
    return res.status(422).json({ msg: 'The zip code is required' })
  }

  Recycling.create({
    items: req.body.items,
    zip: req.body.zip,
  }, (err, _) => {
    if (err) {
      console.error(err)
      return next(err)
    } else {
      return res.status(201).json({ msg: 'Recycling data successfully created' })
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
        console.error(err)
        return next(err)
      } else {
        return res.status(200).json({ recycling: result })
      }
    })
  } else { // fail safe
    Recycling.aggregate([{ $unwind: '$items' }], (err, result) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        return res.status(200).json({ recycling: result })
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
        console.error(err)
        return next(err)
      } else {
        return res.status(200).json({ recycling: results })
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
        console.error(err)
        return next(err)
      } else {
        return res.status(200).json({ recycling: results })
      }
    })
  }
}

module.exports.getYearCSV = (req, res, next) => {
  if (!req.query.year) {
    return res.status(422).json({ msg: 'Please select which year of data to download' })
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
        csvStream.end()
        console.error(err)
        return next(err)
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
