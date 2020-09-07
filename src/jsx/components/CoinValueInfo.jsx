/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedNumber } from 'react-intl';
import { inject, observer } from 'mobx-react';

@inject('CryptoStore')
@observer
class CoinValueInfo extends Component {
	render() {
		const { CryptoStore } = this.props;
		const { btc, coin, currency } = this.props;

		const colorek = CryptoStore.percentChangeClass;

		return (
			<>
				<h1 className="coin-head">
					<IntlProvider locale="pl">
						<FormattedNumber
							value={coin.quote[currency].price}
							style="currency"
							currency={currency}
						/>
					</IntlProvider>
					<span className={`ml-1 color-${colorek}`}>
						({coin.quote[currency].percent_change_24h}%)
					</span>
				</h1>

				<p style={{ margin: 0 }}>
					Price change 1h:
					<span
						className={`ml-1 color-${
							coin.quote[currency].percent_change_1h > 0 ? 'green' : 'red'
						}`}
					>
						{coin.quote[currency].percent_change_1h}%
					</span>
				</p>

				<p style={{ margin: 0 }}>
					Price change 7d:
					<span
						className={`ml-1 color-${
							coin.quote[currency].percent_change_7d > 0 ? 'green' : 'red'
						}`}
					>
						{coin.quote[currency].percent_change_7d}%
					</span>
				</p>

				<p style={{ margin: 0 }}>
					<IntlProvider locale="pl">
						<FormattedNumber
							value={btc ? btc.quote.BTC.price : 0}
							minimumFractionDigits={8}
						/>
					</IntlProvider>
					<span className="ml-1">BTC</span>
					<span
						className={`ml-1 color-${
							(btc ? btc.quote.BTC.percent_change_24h : 0) > 0 ? 'green' : 'red'
						}`}
					>
						(
						<IntlProvider locale="pl">
							<FormattedNumber
								value={btc ? btc.quote.BTC.percent_change_24h : 0}
								minimumFractionDigits={2}
							/>
						</IntlProvider>
						%)
					</span>
				</p>
			</>
		);
	}
}

CoinValueInfo.wrappedComponent.propTypes = {
	currency: PropTypes.string.isRequired,
	coin: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	btc: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	CryptoStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

CoinValueInfo.defaultProps = {
	btc: null
};

export default CoinValueInfo;
