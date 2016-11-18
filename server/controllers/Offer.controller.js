import Offer from '../models/Offer';
import sanitizeHtml from 'sanitize-html';
import APIError from '../helpers/APIError';
import httpStatus from 'http-status';

export function getSomething(req, res, next, id) {
  return res.status(200).end();
}

export function loadOffer(req, res, next, id) {
  Offer.findById(id, function (err, offer) {
    if (err) {
      return next(err);
    } else {
      if (offer) {
        req.offer = offer;
        next();
      } else {
        next(new APIError(`No Offer found with id: ${id}`));
      }
    }
  });
}

export function addOffer(req, res, next) {

  const newOffer = new Offer({
    name: req.body.name,
    amount: req.body.amount,
    maximumRides: req.body.maximumRides
  });

  newOffer.save((err, saved) => {
    if (err) {
      return next(err);
    }
    res.json(saved);
  });
}

export function getOffers(req, res, next) {
  let limit = req.query.limit;
  let skip = req.query.skip;

  limit = parseInt(limit);
  skip = parseInt(skip);

  let query = Offer.find({});
  if (!isNaN(skip)) {
    query = query.skip(skip);
  } 
  
  if (!isNaN(limit)) {
    query = query.limit(limit);
  }
  
  query.exec((err, aryOffers) => {
      if (err) {
        return next(err);
      } else {
        res.json(aryOffers)
      }
    })
}

export function getOffersWithLimit (req, res, next) {
  let limit = req.params.limit;
  limit = parseInt(limit);
  if (isNaN(limit)) {
    return next('limit should be a number!');
  }

  Offer.find({})
    .limit(limit)
    .exec((err, aryOffers) => {
      if (err) {
        return next(err);
      } else {
        res.json(aryOffers)
      }
    })
}

export function getOneOffer(req, res, next) {
  res.json(req.offer);
}

export function deleteOffer(req, res, next) {
  const offer = req.offer;
  offer.remove((err, removedOffer) => {
    if (err) {
      return next(err);
    } else {
      res.json(removedOffer);
    }
  });
}

export function editOffer(req, res, next) {
  const offer = req.offer;
  if (req.body.name) {
    offer.name = req.body.name;
  }

  if (req.body.amount) {
    offer.amount = req.body.amount;
  }

  if (req.body.maximumRides) {
    offer.maximumRides = req.body.maximumRides;
  }

  offer.save((err, saved) => {
    if (err) {
      return next(err);
    }
    res.json(saved);
  });
}
