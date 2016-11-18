// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_OFFER } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddOffer: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    case TOGGLE_ADD_OFFER:
      return {
        showAddOffer: !state.showAddOffer,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Get showAddPost
export const getShowAddOffer = state => state.app.showAddOffer;


// Export Reducer
export default AppReducer;
