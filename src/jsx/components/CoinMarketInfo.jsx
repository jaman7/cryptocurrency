import React from 'react';
import { PropTypes } from 'prop-types';

import CoinDetail from './CoinDetail';

function CoinMarketInfo(props) {
	const { coin, currency } = props;

	const Details = [
		{
			value: coin.quote[currency].market_cap,
			name: 'Market cap'
		},
		{
			value: coin.quote[currency].volume_24h,
			name: 'Volume 24h'
		},
		{
			value: coin.circulating_supply,
			name: 'Circulating supply'
		},
		{
			value: coin.max_supply,
			name: 'Max supply'
		}
	];

	return (
		<>
			{Details.map((item) => (
				<CoinDetail
					value={item.value}
					currency={currency}
					headerString={item.name}
					isCurrency
				/>
			))}
		</>
	);
}

CoinMarketInfo.propTypes = {
	coin: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	currency: PropTypes.string.isRequired
};

export default CoinMarketInfo;
