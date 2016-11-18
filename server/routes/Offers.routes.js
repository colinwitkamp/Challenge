/**
 * Created by dev on 11/16/16.
 */
import { Router } from 'express';
import * as OfferController from '../controllers/Offer.controller';

const router = new Router();

// Get offers with limit
router.route('/:limit').get(OfferController.getOffersWithLimit);

export default router;
