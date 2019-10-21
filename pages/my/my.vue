<template>
	<view class="page-block g-box">
		<!-- 我的页面 -->
		<!-- 		
			<view class="g-hd">
				<view class="m-hd">
					<view class="">
						<image src="../../static/imgs/icons/default-face.png"  class="img-avatar" v-if="logins"></image>
						<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="img-avatar" v-else></image>
					</view>
					<view class="info">
						<view class="info-wrap">
							<view class="nickname" v-if="logins">admin01</view>
							<view class="username" v-if="logins">账号:admin01</view>
							<navigator url="../login/login"  v-else>
								<view class="nickname">
								登录/注册
								</view>
							</navigator>
						</view>
					</view>
					<view>
						<image src="../../static/imgs/icons/settings.png" class="icon-setting" v-if="logins"></image>
					</view>
				</view>
			</view>
		-->
		<view class="g-hd">
			<view class="m-hd">
				<view class="">
					<image :src="info.faceImage"  class="img-avatar" v-if="logins"></image>
					<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="img-avatar" v-else></image>
				</view>
				<view class="info">
					<view class="info-wrap">
						<view class="nickname" v-if="logins">{{info.nickname}}</view>
						<view class="username" v-if="logins">账号:{{info.username}}</view>
						<navigator url="../login/login"  v-else>
							<view class="nickname">
							登录/注册
							</view>
						</navigator>
					</view>
				</view>
				<view>
					<image src="../../static/imgs/icons/settings.png" class="icon-setting" v-if="logins"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logins: false,
				info: {}
			}
		},
		// 页面载入
		onLoad() {
			if(uni.getStorageSync('globalUser')){
				// 获取登录的信息(本地Localstorege里)
				const userInfo = uni.getStorageSync('globalUser');
				
				// 登录成功状态
				if(userInfo){
					this.info = userInfo;
					// 登录成功状态
					this.logins = true;
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import './my.scss'
</style>
