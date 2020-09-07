import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';

import CoinMarketInfo from './CoinMarketInfo';
import CoinValueInfo from './CoinValueInfo';

@inject('CryptoStore')
@observer
class CryptoItemDetails extends Component {
	componentDidMount = () => {
		const { CryptoStore } = this.props;
		const pathName = window.location.pathname.split('/');
		const pathNameLen = pathName.length - 1;
		const slug = pathName[pathNameLen];

		const coinslug = CryptoStore.history.length ? CryptoStore.history.slug : slug;

		CryptoStore.fetchSingleCoin(coinslug);
		CryptoStore.fetchSingleCoinBTCPrice(coinslug);
	};

	render() {
		const { CryptoStore } = this.props;

		return (
			<div className="container">
				<div className="row">
					{!CryptoStore.loadingCoinDetails ? (
						<>
							<div className="col-12 col-md-6 py-3">
								<div className="d-flex align-items-center">
									<img
										src={CryptoStore.selectedCoin.logo}
										alt="coin logo"
										className="img-fluid mr-2"
									/>
									<h1 className="coin-head mb-0">
										{CryptoStore.selectedCoin.name} (
										{CryptoStore.selectedCoin.symbol}) #
										{CryptoStore.selectedCoin.cmc_rank}
									</h1>
								</div>
							</div>

							<div className="col-12 col-md-6 py-3">
								<CoinValueInfo
									btc={CryptoStore.coinBTCData}
									currency={CryptoStore.currency}
									coin={CryptoStore.selectedCoin}
								/>
							</div>

							<CoinMarketInfo
								currency={CryptoStore.currency}
								coin={CryptoStore.selectedCoin}
							/>

							<div className="col-12 py-3">
								<h6>About {CryptoStore.selectedCoin.name}</h6>
								<ReactMarkdown source={CryptoStore.selectedCoin.description} />
								<p>{CryptoStore.selectedCoin.description.toString()}</p>
							</div>
						</>
					) : (
						<div className="col-12 container-react-logo" role="presentation">
							<span className="react-logo" role="presentation">
								<span className="nucleo" role="presentation" />
							</span>
						</div>
					)}
				</div>
			</div>
		);
	}
}

CryptoItemDetails.wrappedComponent.propTypes = {
	CryptoStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default CryptoItemDetails;
