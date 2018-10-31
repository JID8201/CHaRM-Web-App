 const Recycling = require('mongoose').model('Recycling');

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
        type: req.body.type,
        zip: req.body.zip,
        amount: req.body.amount,
        notes: req.body.notes ? req.body.notes : []
    }, (err, result) => {
        if (err) {
            res.locals.error = {
                status: 500, 
                msg: 'error: ' + err
            };
            return next();
        } else {
            res.locals.data = {
                recycling: result,
                msg: 'Recycling data successfully added'
            };
            return next();
        }
    })
 }