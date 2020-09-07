import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedNumber } from 'react-intl';

function CoinDetail(props) {
	const { headerString, value, currency, isCurrency, coinSymbol } = props;

	return (
		<>
			<div className="col-12 col-sm-6 col-md-3 py-3">
				<h6 className="detail-coin-head text-center">{headerString}</h6>
				<h6 className="text-center">
					<IntlProvider locale="pl">
						<FormattedNumber
							value={value}
							style={isCurrency ? 'currency' : undefined}
							minimumFractionDigits={0}
							maximumFractionDigits={0}
							currency={isCurrency ? currency : undefined}
						/>
					</IntlProvider>
					<span> &gt; {coinSymbol || ''}</span>
				</h6>
			</div>
		</>
	);
}

CoinDetail.propTypes = {
	headerString: PropTypes.string.isRequired,
	value: PropTypes.number,
	currency: PropTypes.string,
	isCurrency: PropTypes.bool,
	coinSymbol: PropTypes.string
};

CoinDetail.defaultProps = {
	value: null,
	currency: 'PLN',
	coinSymbol: 'BTC',
	isCurrency: true
};

export default CoinDetail;
