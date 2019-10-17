<template>
	<view class="m-cover">
		<!-- 电影封面预览页 -->
		<view class="img-warpper">
			<!-- <image src="../../static/imgs/poster/justice.png" class="img-cover" mode=""></image> -->
			<!-- 图片模式:宽度不变，高度自适应 -->
			<image 
				:src="cover" 
				class="img-cover" 
				mode="widthFix"
				@longpress="touchOperation()"
			></image>
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
			// 手指按住-操作菜单
			touchOperation(){
				// 显示操作菜单(下面弹出)
				uni.showActionSheet({
					// 菜单列表(最多6个)
					itemList: ["下载图片","菜单2","菜单3"],
					// 点击菜单事件
					success:  (res) => {
						// 获取菜单的索引
						const tIndex = res.tapIndex + 1;
						
						console.log('选中了第' + (tIndex + 1) + '个按钮');
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./cover.scss"
</style>
