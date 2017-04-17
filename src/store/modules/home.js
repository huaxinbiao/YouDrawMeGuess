
const state = {
	header: {
		title: ''
	}
};
const getters = {
	getheader: state => {
		return state.header
	}
};
const mutations = {
	setheader (state, option) {
		state.header = option;
	}
};

export default {
	state,
	getters,
	mutations
}
