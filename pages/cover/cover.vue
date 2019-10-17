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
					itemList: ["保存图片到本地"],
					// 点击菜单事件
					success:  (res) => {
						// 获取菜单的索引
						const tIndex = res.tapIndex + 1;
						
						// console.log('选中了第' + (tIndex + 1) + '个按钮');
						switch (tIndex){
							// 下载图片功能
							case 1:
								uni.showLoading({
									title: '图片保存中…',
									mask: true
								})
								uni.downloadFile({
									url: this.cover,
									success: (res) => {
										// console.log('下载成功',res)
										// 获取下载的临时路径
										// console.log(res.tempFilePath)
										const tempFilePath = res.tempFilePath;
										// 保存图片到系统相册(只支持微信小程序/安卓/Ios)
										// #ifdef APP-PLUS || MP-WEIXIN
											// filePath:可以是临时文件路径也可以是永久文件路径,不支持网络图片路径
											uni.saveImageToPhotosAlbum({
												filePath: tempFilePath,
												success: (res) => {
													// toast轻提示弹窗
													uni.showToast({
														title: '保存成功',
														duration: 2000
													})
													// console.log('保存到相册成功')
												},
												complete: () => {
													// 隐藏loading
													uni.hideLoading()
												}
											})
										// #endif
									}
									// complete: () => {
									// 	// 隐藏loading
									// 	uni.hideLoading()
									// }
								})
								break;
							default:
								break;
						}
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./cover.scss"
</style>
