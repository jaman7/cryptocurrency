import { observable, configure, action, runInAction, computed } from 'mobx';
import axios from 'axios';
import { BASE_URL } from './Constants';

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com';
axios.defaults.responseType = 'json';

// const apikey1 = 'be427fb0-0832-4e6a-bef0-4cf024b4682b';
const apikey2 = '4b205c10-c500-41ff-8450-8219c8c4554f';

configure({
	enforceActions: 'observed'
});

class CryptoStore {
	@observable coins = [];

	@observable coinBTCData = null;

	@observable history = [];

	@observable isLoadingCoins = true;

	@observable loadingCoinDetails = true;

	@observable currency = 'PLN';

	@observable selectedCoin = null;

	@observable baseURL = BASE_URL;

	@action async fetchCoinData() {
		try {
			this.isLoadingCoins = true;
			this.coins = [];
			const response = await axios.get(
				`/v1/cryptocurrency/listings/latest?convert=${this.currency}`,
				{
					headers: { 'X-CMC_PRO_API_KEY': apikey2 }
				}
			);
			const getCoins = response.data;

			runInAction(() => {
				if (response.status === 200) {
					this.coins = getCoins.data;
					this.isLoadingCoins = false;
				}
			});
		} catch (error) {
			console.log('err');
		}
	}

	@action async fetchSingleCoin(coinId) {
		const slug = coinId.toString();
		try {
			this.loadingCoinDetails = true;
			const response = await axios.get(
				`/v1/cryptocurrency/quotes/latest?slug=${slug}&convert=${this.currency}`,
				{
					headers: { 'X-CMC_PRO_API_KEY': apikey2 }
				}
			);
			const getCoins = response.data;

			const responseAdditional = await axios.get(`/v1/cryptocurrency/info?slug=${slug}`, {
				headers: { 'X-CMC_PRO_API_KEY': apikey2 }
			});

			const additionalData = responseAdditional.data.data;
			const index = Object.keys(additionalData);

			runInAction(() => {
				this.selectedCoin = getCoins.data[index];
				this.selectedCoin.logo = additionalData[index].logo;
				this.selectedCoin.description = additionalData[index].description;
				this.loadingCoinDetails = false;
			});
		} catch (error) {
			console.log('err');
		}
	}

	@action async fetchSingleCoinBTCPrice(coinId) {
		const slug = coinId.toString();
		try {
			const response = await axios.get(
				`/v1/cryptocurrency/quotes/latest?slug=${slug}&convert=BTC`,
				{
					headers: { 'X-CMC_PRO_API_KEY': apikey2 }
				}
			);

			const getBtcCoin = response.data.data;
			const index = Object.keys(getBtcCoin);

			runInAction(() => {
				if (response.status === 200) {
					this.coinBTCData = getBtcCoin[index];
				}
			});
		} catch (error) {
			console.log('err');
		}
	}

	@action setInfo = (id, slug) => {
		this.history = [];
		this.history = { id, slug };
	};

	@action selectCurrency = (selectedCurrency) => {
		this.currency = selectedCurrency;
		this.fetchCoinData();
		if (this.selectedCoin) {
			this.fetchSingleCoin(this.selectedCoin.slug);
		}
	};

	@computed get percentChangeClass() {
		if (this.selectedCoin)
			return this.selectedCoin.quote[this.currency].percent_change_24h > 0 ? 'green' : 'red';
		return 'red';
	}
}

const store = new CryptoStore();

export default store;
