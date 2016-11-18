import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './OfferListItem.css';

function OfferListItem(props) {
  return (
    <div className={styles['single-offer']}>
      <h3 className={styles['offer-title']}>
        <Link to={`/offers/${props.offer.id}`} >
          {props.offer.name}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.offer.name}</p>

      <p className={styles['offer-desc']}><FormattedMessage id="amount" />: {props.offer.amount}</p>
      <p className={styles['offer-desc']}><FormattedMessage id="maximumRides" />: {props.offer.maximumRides}</p>

      <p className={styles['offer-action']}>
        <a href="#" onClick={props.onDelete}><FormattedMessage id="deleteOffer" /></a>
        <span className={styles['item-space']}></span>
        <Link to={`/offers/${props.offer.id}/edit`} >
          <FormattedMessage id="editOffer" />
        </Link>
      </p>

      <hr className={styles.divider} />
    </div>
  );
}

OfferListItem.propTypes = {
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    maximumRides: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OfferListItem;
