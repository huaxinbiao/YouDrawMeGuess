<template>
	<nav class="mui-bar mui-bar-tab">
        <a v-for="(item, index) in tabbar" class="mui-tab-item" v-bind:class="{'mui-active': index==tabindex}" v-on:tap="navtap(index,item)" href="javascript:;">
            <span class="mui-icon" v-bind:class="item.icon"></span>
            <span class="mui-tab-label">{{item.title}} </span>
        </a>
    </nav>
</template>

<script>
	export default {
		data: function(){
	        return {
	            tabbar:[
	                {
	                	icon:'mui-icon-starhalf',
	                	title:'游戏',
	                	url: '/index/home',
	                	centre: 0
	                },
	                {
	                	icon:'mui-icon-paperplane',
	                	title:'房间',
	                	url: '/index/room',
	                	right: 1
	                },
	                {
	                	icon:'mui-icon-chatbubble',
	                	title:'消息',
	                	url: '/index/room'
                	},
	                {
	                	icon:'mui-icon-navigate',
	                	title:'发现',
	                	url: '/draw'
                	}
	            ],
	            tabindex: 0
	        }
	    },
	    mounted() {
	    	switch (this.$route.name){
	    		case 'home':
	    			this.tabindex = 0;
	    			this.$store.commit('setheader',this.tabbar[0])
	    			break;
	    		case 'room':
	    			this.tabindex = 1;
	    			this.$store.commit('setheader',this.tabbar[1])
	    			break;
	    		case 'news':
	    			this.tabindex = 2;
	    			this.$store.commit('setheader',this.tabbar[2])
	    			break;
	    		case 'find':
	    			this.tabindex = 3;
	    			this.$store.commit('setheader',this.tabbar[3])
	    			break;
	    		default:
	    			this.tabindex = 0;
	    			this.$store.commit('setheader',this.tabbar[0])
	    			break;
	    	}
	    },
	    methods: {
	    	navtap:function(index, item){
	    		this.$store.commit('setheader',item)
	    		this.$router.push(item.url);
	    	}
	    }
	}
</script>

<style>
</style>