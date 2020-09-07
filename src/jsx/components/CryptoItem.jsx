import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const CryptoItem = inject('CryptoStore')(
	observer((props) => {
		const { CryptoStore, coin, currency } = props;

		let priceSign = 'zł';
		switch (currency) {
			case 'USD':
				priceSign = '$';
				break;
			case 'EUR':
				priceSign = '€';
				break;
			case 'PLN':
				priceSign = 'zł';
				break;
			default:
				break;
		}

		const coinLogo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`;
		const coinPriceGraph7d = `https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${coin.id}.png`;

		return (
			<div className="col-12 my-1 list-item">
				<div className="row mx-0 py-2 align-items-center list-item-cointainer">
					<div className="col-lg col-1 d-flex flex-column text-center">
						<span>{coin.cmc_rank}</span>
					</div>

					<div className="col-lg col-5 d-flex align-items-center">
						<img src={coinLogo} alt="Coin Logo" className="img-fluid mr-2" />
						{coin.symbol}
					</div>

					<div className="col-lg col-6 d-flex align-items-center text-center">
						<p className="mb-0">
							<span>{parseFloat(coin.quote[currency].price).toFixed(2)}</span>
							<span className="ml-1">{priceSign}</span>
						</p>
					</div>

					<div className="col-lg col-6 d-flex text-center">
						<p
							className={`mb-0 color-${
								coin.quote[currency].percent_change_24h > 0 ? 'green' : 'red'
							}`}
						>
							<span>{coin.quote[currency].percent_change_24h}%</span>
							<i
								className={`ml-1 fas fa-arrow-${
									coin.quote[currency].percent_change_24h > 0 ? 'up' : 'down'
								}`}
							/>
						</p>
					</div>

					<div className="col-lg col-6 d-flex align-items-center">
						<img src={coinPriceGraph7d} className="img-fluid" alt="Coin Sparkline" />
					</div>

					<div className="col-lg col-6">
						<Link
							className="btn btn-more"
							to={coin.slug.toString()}
							onClick={() => CryptoStore.setInfo(coin.id, coin.slug)}
						>
							more
						</Link>
					</div>
				</div>
			</div>
		);
	})
);

CryptoItem.propTypes = {
	coin: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	currency: PropTypes.string.isRequired
};

export default CryptoItem;
