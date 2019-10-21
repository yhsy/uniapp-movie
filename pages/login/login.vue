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
				console.log(this.form)
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
		}
	}
</script>

<style lang="scss">
	@import './login.scss'
</style>
