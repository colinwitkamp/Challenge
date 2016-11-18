import React, { PropTypes } from 'react';

// Import Components
import OfferListItem from './OfferListItem/OfferListItem';

function OfferList(props) {
  return (
    <div className="listView">
      {
        props.offers.map(offer => (
          <OfferListItem
            offer={offer}
            key={offer.id}
            onDelete={() => props.handleDeleteOffer(offer.id)}
          />
        ))
      }
    </div>
  );
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    maximumRides: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  })).isRequired,
  handleDeleteOffer: PropTypes.func.isRequired,
};

export default OfferList;
