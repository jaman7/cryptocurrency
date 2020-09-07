import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

@inject('CryptoStore')
@observer
class Nav extends Component {
	render() {
		const { CryptoStore } = this.props;

		const handleClick = (selectedCurrency) => {
			CryptoStore.selectCurrency(selectedCurrency);
		};

		const listCurrency = ['USD', 'EUR', 'PLN'];

		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-main-dark sticky-top">
				<Link className="navbar-brand" to={`/${CryptoStore.baseURL}`}>
					<img
						alt="Sample CryptoCoin API"
						className="img-fluid img-icon-todo"
						src="img/todo.png"
					/>
					Sample CryptoCoin API
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to={`/${CryptoStore.baseURL}`}>
								<i className="fas fa-home" />
							</Link>
						</li>

						{listCurrency.map((list, i) => {
							return (
								<li className="nav-item" key={uuid()}>
									<span
										role="button"
										tabIndex={i}
										className={`nav-link${
											list === CryptoStore.currency ? ' active' : ''
										}`}
										onClick={() => handleClick(list)}
										onKeyDown={() => handleClick(list)}
									>
										{list}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		);
	}
}

Nav.wrappedComponent.propTypes = {
	CryptoStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Nav;
