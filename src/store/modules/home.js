
const state = {
	header: {
		title: ''
	},
	socket: new io.connect(global.IO, {'reconnect':true,'auto connect':true,'force new connection':true})
};
const getters = {
	getheader: state => {
		return state.header
	},
	getsocket: state => {
		return state.socket
	}
};
const mutations = {
	setheader (state, option) {
		state.header = option;
	},
	setsocket (state, obj) {
		state.socket = obj;
	}
};

export default {
	state,
	getters,
	mutations
}
