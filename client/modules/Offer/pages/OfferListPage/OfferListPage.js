import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import OfferList from '../../components/OfferList';
import OfferCreateWidget from '../../components/OfferCreateWidget/OfferCreateWidget';

// Import Actions
import { addOfferRequest, editOfferRequest, fetchOffers, deleteOfferRequest } from '../../OfferActions';
import { toggleAddOffer } from '../../../App/AppActions';

// Import Selectors
import { getShowAddOffer } from '../../../App/AppReducer';
import { getOffers } from '../../OfferReducer';

class OfferListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchOffers());
  }

  toggleAddOfferSection = () => {
    this.props.dispatch(toggleAddOffer());
  };

  handleDeleteOffer = offer => {
    if (confirm('Do you want to delete this offer')) { // eslint-disable-line
      this.props.dispatch(deleteOfferRequest(offer));
    }
  };

  handleAddOffer = (name, amount, maximumRides) => {
    this.props.dispatch(toggleAddOffer());
    this.props.dispatch(addOfferRequest({ name, amount, maximumRides }));
  };

  render() {
    return (
      <div>
        <OfferCreateWidget addOffer={this.handleAddOffer} showAddOffer={this.props.showAddOffer} toggleAddOfferSection={this.toggleAddOfferSection}/>
        <OfferList handleDeleteOffer={this.handleDeleteOffer} offers={this.props.offers} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
OfferListPage.need = [() => { return fetchOffers(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddOffer: getShowAddOffer(state),
    offers: getOffers(state),
  };
}

OfferListPage.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    maximumRides: PropTypes.number.isRequired,
  })).isRequired,
  showAddOffer: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

OfferListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(OfferListPage);
