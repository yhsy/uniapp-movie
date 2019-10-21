<template>
	<view class="page g-box">
		<!-- 用户信息页 -->
		<view class="g-hd">
			<view class="m-hd">
				<view>
					<view class="item-info avatar-info">
						<view class="tit">头像</view>
						<view>
							<view class="img-warp">
								<view class="">
									<image src="../../../static/imgs/icons/default-face.png" class="img-avatar" mode=""></image>
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
					
				<view>
					<view class="item-info">
						<view class="tit">昵称</view>
						<view>
							<view class="img-warp">
								<view class="text">
									admin01
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view>
					<view class="item-info">
						<view class="tit">生日</view>
						<view>
							<view class="img-warp">
								<view class="text">
									1990-01-01
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view>
					<view class="item-info">
						<view class="tit">性别</view>
						<view>
							<view class="img-warp">
								<view class="text">
									男
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
			
		
		<view class="m-ft">
			<view class="item-menu">
				清理缓存
			</view>
			<view class="item-menu">
				退出登录
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import './userInfo.scss'
</style>
