/**
 * Created by dev on 11/16/16.
 */
import { Router } from 'express';
import Offer from './Offer.routes';
import Offers from './Offers.routes';
import post from './post.routes';

const router = new Router();

router.use('/offer', Offer);
router.use('/offers', Offers);
router.use('/posts', post);

export default router;
