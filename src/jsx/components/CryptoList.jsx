import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

import CryptoItem from './CryptoItem';

@inject('CryptoStore')
@observer
class CryptoList extends Component {
	componentDidMount = () => {
		const { CryptoStore } = this.props;
		CryptoStore.fetchCoinData();
	};

	render() {
		const { CryptoStore } = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					{CryptoStore.isLoadingCoins ? (
						<div className="col-12 container-react-logo" role="presentation">
							<span className="react-logo" role="presentation">
								<span className="nucleo" role="presentation" />
							</span>
						</div>
					) : (
						<div className="container">
							<TransitionGroup component={null}>
								{CryptoStore.coins.map((coin) => {
									return (
										<CSSTransition timeout={500} classNames="fade" key={uuid()}>
											<CryptoItem
												key={coin.id}
												coin={coin}
												currency={CryptoStore.currency}
											/>
										</CSSTransition>
									);
								})}
							</TransitionGroup>
						</div>
					)}
				</div>
			</div>
		);
	}
}

CryptoList.wrappedComponent.propTypes = {
	CryptoStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default CryptoList;
