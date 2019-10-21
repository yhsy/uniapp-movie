<template>
	<view class="page-block">
		<!-- 		<view class="g-bd">
			<view class="avatar">
				<image src="../../static/imgs/icons/default-face.png" class="img-avatar"></image>
			</view>
			<view class="username">
				
			</view>
		</view> -->
		<form @submit="loginForm" class="g-form">
			<view class="m-form">
				<view class="avatar-wrap">
					<image src="../../static/imgs/icons/default-face.png" class="img-avatar"></image>
				</view>
				<view>
					<view class="ipt-box">
						<label>账号:</label>
						<input type="text"  @input="changeUserName" placeholder="请输入账号" class="ipt-username" />
					</view>
				</view>
				<view class="ipt-pwd">
					<view class="ipt-box">
						<label>密码:</label>
						<input type="password" password="true" @input="changePassword" placeholder="请输入密码" class="ipt-username" />
					</view>
				</view>
				<view class="ipt-btn">
					<button type="primary" form-type="submit">注册/登录</button>
				</view>
			</view>
		</form>
		
		<!-- 第三方登录 -->
		<view class="g-third">
			<view class="m-third">
				<!-- #ifdef APP-PLUS || MP-WEIXIN -->
					<view class="tit-wrap">
						<view class="line"></view>
						<view class="tit">
							第三方登录
						</view>
						<view class="line"></view>
					</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS || MP-WEIXIN -->
					<view class="m-tlogin">
						<view>
							<button open-type="getUserInfo" @getuserinfo="wbLogin" class="btn-wx">
								<image src="../../static/imgs/icons/weibo.png" class="icon-third" mode="aspectFill"></image>
							</button>
						</view>
						<view>
							<button open-type="getUserInfo" @getuserinfo="wxLogin" class="btn-wx">
								<image src="../../static/imgs/icons/weixin.png" class="icon-third" mode="aspectFill"></image>
							</button>
						</view>
						<view>
							<button open-type="getUserInfo" @getuserinfo="qqLogin" class="btn-wx">
								<image src="../../static/imgs/icons/QQ.png" class="icon-third" mode="aspectFill"></image>
							</button>
						</view>
					</view>
				<!-- #endif -->
				
				<!-- #ifdef MP-WEIXIN -->
					<!-- <view class="m-tlogin">
						<button open-type="getUserInfo" @getuserinfo="wxLogin" class="btn-wx">
							<image src="../../static/imgs/icons/weixin.png" class="icon-third" mode="aspectFill"></image>
						</button>
					</view> -->
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api.js'
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				info: {}
			};
		},
		methods:{
			// 监听输入账号
			changeUserName(e){
				this.form.username =  e.target.value;
			},
			// 监听输入密码
			changePassword(e){
				this.form.password =  e.target.value;
			},
			// 登录
			loginForm(){
				// console.log(res)
				// console.log(this.form)
				const { username, password } = this.form;
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true,
					title: '登录中,请稍候',
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				
				const { serverUrl, qq } = api;
				
				uni.request({
				    url: serverUrl + '/user/registOrLogin?qq='+ qq,
					method: 'POST',
				    data: {
						// qq,
						username,
						password
				    },
				    success: (res) => {
						// console.log(res.data);
						// debugger;
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							this.info = resData.data;
							// 本地存储登录成功数据
							uni.setStorageSync('globalUser',resData.data);
							// 跳转到我的页面
							uni.switchTab({
								url:'../my/my'
							})
						} else {
							console.log(resData.msg)
							// 登录失败,提示信息
							uni.showToast({
								title: resData.msg,
								duration: 2000
							})
						}
						
				    },
					complete: () =>{
						// 隐藏Loading
						uni.hideLoading();
						// 隐藏导航栏加载Loading
						uni.hideNavigationBarLoading()
					}
				});
			},
			// 微信登录
			wxLogin(){
				console.log('微信登录')
			},
			// 微博登录
			wbLogin(){
				console.log('微博登录')
			},
			// QQ登录
			qqLogin(){
				console.log('QQ登录')
			}
		}
	}
</script>

<style lang="scss">
	@import './login.scss'
</style>
