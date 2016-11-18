/**
 * Created by dev on 11/17/16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import {browserHistory} from 'react-router';
// ...


// Import Style
import styles from '../../components/OfferListItem/OfferListItem.css';
import OfferEditWdiget from '../../components/OfferEditWidget/OfferEditWidget';
// Import Actions
import { fetchOffer, addOfferRequest, editOfferRequest, fetchOffers, deleteOfferRequest } from '../../OfferActions';

// Import Selectors
import { getOffer } from '../../OfferReducer';

class OfferEditPage extends Component{

  handleEditOffer = (id, name, amount, maximumRides) => {
    this.props.dispatch(editOfferRequest({ id, name, amount, maximumRides }));
    browserHistory.push(`/offers/${this.props.offer.id}`);
  };

  handleCancelEditOffer = () => {
    browserHistory.goBack();
  }

  render() {
    const props = this.props;
    return (
      <div>
        <Helmet title={props.offer.name} />
        <h2>Edit Offer</h2>
        <OfferEditWdiget offer={props.offer} editOffer = {this.handleEditOffer} cancel = {this.handleCancelEditOffer}></OfferEditWdiget>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
OfferEditPage.need = [params => {
  return fetchOffer(params.id);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  console.log(props.params);
  return {
    offer: getOffer(state, props.params.id),
  };
}

OfferEditPage.propTypes = {
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    maximumRides: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
};

export default connect(mapStateToProps)(OfferEditPage);
