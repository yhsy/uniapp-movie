<template>
	<view class="m-cover">
		<!-- 电影封面预览页 -->
		<view class="img-warpper">
			<!-- <image src="../../static/imgs/poster/justice.png" class="img-cover" mode=""></image> -->
			<!-- 图片模式:宽度不变，高度自适应 -->
			<image :src="cover" class="img-cover" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover: ''
			}
		},
		onLoad(params){
			// 获取上一个页面传入的参数
			const { cover } = params;
			
			this.cover = cover;
			
			// 通过Api设置导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000",
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import "./cover.scss"
</style>
