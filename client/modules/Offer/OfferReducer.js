import { ADD_OFFER, EDIT_OFFER, ADD_OFFERS, DELETE_OFFER } from './OfferActions';

// Initial State
const initialState = { data: [] };

const OfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OFFER :
      return {
        data: [action.offer, ...state.data],
      };
    case EDIT_OFFER:
      let data = state.data;
      let prevOffer = state.data.filter(offer => offer.id === action.offer.id)[0];

      if (prevOffer) {
        const index = state.data.indexOf(prevOffer);
        state.data[index] = action.offer;
        return {
          data: [...state.data]
        };
      } else {
        return state;
      }
    case ADD_OFFERS :
      return {
        data: action.offers,
      };

    case DELETE_OFFER :
      return {
        data: state.data.filter(offer => offer.id !== action.id),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all offers
export const getOffers = state => state.offers.data;

// Get offer by id
export const getOffer = (state, id) => state.offers.data.filter(offer => offer.id === id)[0];

// Export Reducer
export default OfferReducer;
