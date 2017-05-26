import {mergeJsonObject} from '../../assets/js/function.js';

const state = {
	header: {
		title: ''
	},
	initiative: 0, //是否主动断开连接
	createroom: false, //
	user: JSON.parse(localStorage.getItem('user')), //用户信息
	roomset: null  //进入房间详情页储存
};
const getters = {
	getheader: state => {
		return state.header
	},
	getinitiative: state => {
		return state.initiative
	},
	getcreateroom: state => {
		return state.createroom
	},
	getuser: state => {
		return state.user
	},
	getroomset: state => {
		return state.roomset
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
		state.createroom = i;
	},
	setuser (state, option) {
		state.user =  mergeJsonObject(state.user, option);
  		localStorage.setItem('user', JSON.stringify(state.user));
	},
	setroomset (state, option) {
		state.roomset = option;
	}
};

export default {
	state,
	getters,
	mutations
}
