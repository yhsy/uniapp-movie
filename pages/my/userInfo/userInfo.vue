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
									<!-- <image src="../../../static/imgs/icons/default-face.png" class="img-avatar" mode=""></image> -->
									<image :src="info.faceImage" class="img-avatar" mode=""></image>
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
					
				<view>
					<view class="item-info" @click="goEditInfo(1)">
						<view class="tit">昵称</view>
						<view>
							<view class="img-warp">
								<view class="text">
									<!-- admin01 -->
									{{info.nickname}}
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view>
					<view class="item-info"  @click="goEditInfo(2)">
						<view class="tit">生日</view>
						<view>
							<view class="img-warp">
								<view class="text">
									<!-- 1990-01-01 -->
									{{info.birthday}}
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view>
					<view class="item-info"  @click="goEditInfo(3)">
						<view class="tit">性别</view>
						<view>
							<view class="img-warp">
								<view class="text">
									<!-- 男 -->
									{{info.sex===1 ? '男' : '女'}}
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
			<view class="item-menu" @click="clearStorage()">
				清理缓存
			</view>
			<view class="item-menu" @click="loginOut()">
				退出登录
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		
		onLoad() {
			if(uni.getStorageSync('globalUser')){
				// 获取登录的信息(本地Localstorege里)
				const userInfo = uni.getStorageSync('globalUser');
				
				// 登录成功状态
				if(userInfo){
					this.info = userInfo;
				}
			} else {
				// 跳转到登录页
				uni.navigateTo({
					url: '../../login/login'
				})
			}
		},
		data() {
			return {
				info: {}
			};
		},
		methods:{
			// 清理缓存
			clearStorage(){
				// // 清理本地所有缓存
				// uni.clearStorageSync();
				// // 跳转到登录页
				// uni.switchTab({
				// 	url: '../../index/index'
				// })
				uni.showToast({
					title: '清理缓存成功',
					duration:2000,
					icon: 'success'
				})
			},
			// 退出登录
			loginOut(){
				uni.showLoading()
				// 清理登录信息缓存
				uni.removeStorageSync('globalUser');
				// 跳转到首页
				// uni.switchTab({
				// 	url: '../../index/index'
				// })
				// 跳转到登录页
				uni.navigateTo({
					url: '../../login/login'
				})
				setTimeout(()=>{
					uni.hideLoading()
				},1000)
			},
			goEditInfo(type){
				uni.navigateTo({
					url:'editUserInfo/editUserInfo?type=' + type
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './userInfo.scss'
</style>
