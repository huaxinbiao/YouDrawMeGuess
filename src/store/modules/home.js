
const state = {
	header: {
		title: ''
	},
	initiative: 0, //是否主动断开连接
	createroom: false //创建房间
};
const getters = {
	getheader: state => {
		return state.header
	},
	getinitiative: state => {
		return state.initiative
	},
	getcreateroom: state => {
		return state.initiative
	}
};
const mutations = {
	setheader (state, option) {
		state.header = option;
	},
	setinitiative (state, i) {
		state.initiative = i;
	},
	setcreateroom (state, i) {
		state.initiative = i;
	}
};

export default {
	state,
	getters,
	mutations
}
