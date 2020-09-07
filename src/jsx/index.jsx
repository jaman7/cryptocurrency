import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';
import CryptoStore from './stores/CryptoStore';

const rootID = document.getElementById('root');

const Root = (
	<Provider CryptoStore={CryptoStore}>
		<App />
	</Provider>
);

if (typeof rootID !== 'undefined' && rootID != null) {
	ReactDOM.render(Root, rootID);
}
