/**
 * Created by dev on 11/16/16.
 */
import Joi from 'joi';

export default {
  addOffer: {
    body: {
      name: Joi.string().required(),
      amount: Joi.number().required(), 
      maximumRides: Joi.number().required()
    }
  }
};
