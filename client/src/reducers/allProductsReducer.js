
export default (state = [], action) => {

	switch (action.type) {
		case 'PRODUCTS':
			return  action.useWhatProducts
		default:
			return  state;
	}
};