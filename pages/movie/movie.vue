<template>
	<view>
		这是电影预告片的详情页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(params){
			// debugger;
			// 获取上一个页面传入的参数
			const { trailerId } = params;
			console.log(trailerId);
		},
		methods: {
			
		}
	}
</script>

<style>
	@import ("./movie.scss");
</style>
