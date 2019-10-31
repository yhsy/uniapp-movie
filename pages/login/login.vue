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
		onLoad() {
			uni.showLoading({
				title:'载入中'
			})
			let qq = "";
			qq = uni.getStorageSync('qq');
			
			if(!qq) {
				this.getQQ().then(res => {
					qq = res.ok;
					
					uni.setStorageSync('qq', qq)
					
					uni.hideLoading();
				}).catch(err => {
					reject(err)
				})
			}
			uni.hideLoading();
		},
		methods:{
			// 获取验证QQ
			getQQ(){
				// 通用性强(全端支持)
				const { serverUrl } = api;
				
				return new Promise((resolve, reject) => {
					uni.request({
					    url: serverUrl + '/sys/switches',
						method: 'POST',
					    success: (res) => {
							// console.log(res.data);
							// debugger;
							const resData = res.data;
							// 判断数据是否获取成功
							if(resData.status === 200) {
								resolve(res.data)
							} else {
								uni.hideLoading();
								uni.showToast({
									title: '接口错误,请重试',
									duration:2000
								})
								reject()
							}
							
					    }
					});
				})
			},
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
				
				const { serverUrl } = api;
				const qq = uni.getStorageSync('qq');
				
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
			wxLogin(e){
				console.log('微信登录')
				// 通过微信开放能力，获取用户基础信息
				console.log(e)
				const wxInfo = e.detail.userInfo;
				console.log(wxInfo)
				
				// 实现微信登录
				uni.login({
					provider: "weixin",
					success:(res) => {
						// 获取微信登录Code:授权码(只能使用一次)
						console.log(res)
						const { code } = res;
						const { avatarUrl, nickName } = wxInfo;
						
						// 请求微信登录接口(自己的服务端)
						// 参数
						// const payload = {
						// 	// 微信登录授权码
						// 	code,
						// 	// 微信头像
						// 	avatarUrl,
						// 	// 昵称
						// 	nickName,
						// 	// 微信小程序用户对象
						// 	// wxUserBo: {
								
						// 	// },
						// 	// 使用哪个小程序(0-NEXT超英预告,1-超英预告,2-NEXT学院电影预告)
						// 	whichMP: 1
							
						// }
						
						const { serverUrl } = api;
						const qq = uni.getStorageSync('qq');
						
						// 显示Loading
						uni.showLoading({
							// 开启透明遮罩
							mask: true,
							title: '登录中,请稍候',
						})
						
						// 显示导航栏加载Loading
						uni.showNavigationBarLoading()
						
						uni.request({
						    url: serverUrl + '/mpWXLogin/'+ code,
							// url: serverUrl + '/mpWXLogin/'+code+'&qq='+ qq,
							method: 'POST',
							header: {
								qq,
							},
						    data: {
								qq,
								// 微信头像
								avatarUrl,
								// 昵称
								nickName,
								whichMP: 1,
						    },
						    success: (res) => {
								// 拿到用户微信登录的信息
								console.log(res.data);
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
						
						
					}
				})
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
