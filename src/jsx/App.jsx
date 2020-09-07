import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import CryptoList from './components/CryptoList';
import Nav from './components/Nav';
import CryptoItemDetails from './components/CryptoItemDetails';
import Footer from './components/Footer';

@inject('CryptoStore')
@observer
class App extends Component {
	render() {
		const { CryptoStore } = this.props;

		return (
			<>
				<Router>
					<Nav />
					<Switch>
						<Route path={`/${CryptoStore.baseURL}`} exact component={CryptoList} />
						<Route path={`/${CryptoStore.baseURL}:id`} component={CryptoItemDetails} />
					</Switch>
					<Footer />
				</Router>
			</>
		);
	}
}

App.wrappedComponent.propTypes = {
	CryptoStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default App;
