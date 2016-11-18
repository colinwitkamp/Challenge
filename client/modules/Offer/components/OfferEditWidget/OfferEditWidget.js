import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './OfferEditWidget.css';
export class OfferEditWidget extends Component {
  editOffer = () => {
    const nameRef = this.refs.name;
    const amountRef = this.refs.amount;
    const maximumRidesRef = this.refs.maximumRides;
    if (nameRef.value && amountRef.value && maximumRidesRef.value) {
      this.props.editOffer(this.props.offer.id, nameRef.value, amountRef.value, maximumRidesRef.value);
      nameRef.value = amountRef.value = maximumRidesRef.value = '';
    }
  };

  cancel = () => {
    this.props.cancel();
  }

  render() {
    return (
      <div className={styles['form-content']}>
        <h2 className={styles['form-title']}><FormattedMessage id="editOffer" /></h2>
        <input placeholder={this.props.intl.messages.name} className={styles['form-field']} defaultValue={this.props.offer.name} ref="name" />
        <input placeholder={this.props.intl.messages.amount} className={styles['form-field']} defaultValue={this.props.offer.amount} type = "number" ref="amount" />
        <input placeholder={this.props.intl.messages.maximumRides} className={styles['form-field']} defaultValue={this.props.offer.maximumRides} type = "number" ref="maximumRides" />
        <div className={styles['edit-offer-button-div']}>
          <a className={styles['offer-cancel-button']}  onClick={this.cancel}><FormattedMessage id="cancel" /></a>
          {"     "}
          <a className={styles['offer-submit-button']}  onClick={this.editOffer}><FormattedMessage id="save" /></a>
        </div>
      </div>
    );
  }
}

OfferEditWidget.propTypes = {
  editOffer: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    maximumRides: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};

export default injectIntl(OfferEditWidget);
