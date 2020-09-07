import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const Footer = inject('CryptoStore')(
	observer((props) => {
		const { CryptoStore } = props;

		return (
			<footer className="footer">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 py-3 panel">
							<Link className="footer-link" to={`/${CryptoStore.baseURL}`}>
								<img src="img/todo.png" alt="logo" className="img-fluid logo" />
							</Link>

							<p className="text-small mb-0">© 2020</p>
						</div>
					</div>
				</div>
			</footer>
		);
	})
);

Footer.wrappedComponent.propTypes = {
	CryptoStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Footer;
