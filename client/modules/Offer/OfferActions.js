import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_OFFER = 'ADD_OFFER';
export const ADD_OFFERS = 'ADD_OFFERS';
export const DELETE_OFFER = 'DELETE_OFFER';
export const EDIT_OFFER = 'EDIT_OFFER';
// Export Actions
export function addOffer(offer) {
  return {
    type: ADD_OFFER,
    offer,
  };
}

export function editOffer(offer) {
  return {
    type: EDIT_OFFER,
    offer,
  };
}

export function addOfferRequest(offer) {
  return (dispatch) => {
    return callApi('offer', 'post', offer).then(res => dispatch(addOffer(res)));
  };
}

export function editOfferRequest(offer) {
  return (dispatch) => {
    return callApi(`offer/${offer.id}`, 'put', offer).then(res => dispatch(editOffer(res)));
  };
}

export function addOffers(offers) {
  return {
    type: ADD_OFFERS,
    offers,
  };
}

export function fetchOffers() {
  return (dispatch) => {
    return callApi('offer').then(res => {
      dispatch(addOffers(res));
    });
  };
}

export function fetchOffer(id) {
  return (dispatch) => {
    return callApi(`offer/${id}`).then(res => dispatch(addOffer(res)));
  };
}

export function deleteOffer(id) {
  return {
    type: DELETE_OFFER,
    id
  };
}

export function deleteOfferRequest(id) {
  return (dispatch) => {
    return callApi(`offer/${id}`, 'delete').then(() => dispatch(deleteOffer(id)));
  };
}
