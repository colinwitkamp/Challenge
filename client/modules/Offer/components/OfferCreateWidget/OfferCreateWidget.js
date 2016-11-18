import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './OfferCreateWidget.css';
import { toggleAddOffer } from '../../../App/AppActions';
export class OfferCreateWidget extends Component {

  addOffer = () => {
    const nameRef = this.refs.name;
    const amountRef = this.refs.amount;
    const maximumRidesRef = this.refs.maximumRides;
    if (nameRef.value && amountRef.value && maximumRidesRef.value) {
      this.props.addOffer(nameRef.value, amountRef.value, maximumRidesRef.value);
      nameRef.value = amountRef.value = maximumRidesRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddOffer ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewOffer" /></h2>
          <input placeholder={this.props.intl.messages.name} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.amount} className={styles['form-field']} type = "number" ref="amount" />
          <input placeholder={this.props.intl.messages.maximumRides} className={styles['form-field']} type = "number" ref="maximumRides" />
          <a className={styles['offer-cancel-button']} href="#" onClick={this.props.toggleAddOfferSection}><FormattedMessage id="cancel" /></a>
          {" "}
          <a className={styles['offer-submit-button']} href="#" onClick={this.addOffer}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

OfferCreateWidget.propTypes = {
  toggleAddOfferSection: PropTypes.func.isRequired,
  addOffer: PropTypes.func.isRequired,
  showAddOffer: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(OfferCreateWidget);
