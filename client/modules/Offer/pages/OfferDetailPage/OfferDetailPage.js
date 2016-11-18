import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from '../../components/OfferListItem/OfferListItem.css';

// Import Actions
import { fetchOffer } from '../../OfferActions';

// Import Selectors
import { getOffer } from '../../OfferReducer';

export function OfferDetailPage(props) {
  return (
    <div>
      <Helmet title={props.offer.name} />
      <div className={`${styles['single-offer']} ${styles['offer-detail']}`}>
        <h3 className={styles['offer-title']}>{props.offer.name}</h3>
        <p className={styles['author-name']}> {props.offer.amount}</p>
        <p className={styles['offer-desc']}>{props.offer.maximumRides}</p>
      </div>
      <p className={styles['offer-action']}>
        <a href="#" onClick={props.onDelete}><FormattedMessage id="deleteOffer" /></a>
        <span className={styles['item-space']}></span>
        <Link to={`/offers/${props.offer.id}/edit`} >
          <FormattedMessage id="editOffer" />
        </Link>
      </p>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
OfferDetailPage.need = [params => {
  return fetchOffer(params.id);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  console.log(props.params);
  return {
    offer: getOffer(state, props.params.id),
  };
}

OfferDetailPage.propTypes = {
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    maximumRides: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
};

export default connect(mapStateToProps)(OfferDetailPage);
