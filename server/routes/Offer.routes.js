import { Router } from 'express';
import * as OfferController from '../controllers/Offer.controller';
import paramValidation from '../../config/param-validation';
import validate from 'express-validation';
const router = new Router();


// Add a new Post
router.route('/').post(validate(paramValidation.addOffer), OfferController.addOffer);

// Get one Offer by id
router.route('/:id').get(OfferController.getOneOffer);

// Delete an Offer by id
router.route('/:id').delete(OfferController.deleteOffer);

// Edit an Offer
router.route('/:id').put(OfferController.editOffer);

// Get all Offers
router.route('/').get(OfferController.getOffers);


router.param('id', OfferController.loadOffer);
export default router;
