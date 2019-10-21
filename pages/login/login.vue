<template>
	<view class="page-block">
<!-- 		<view class="g-bd">
			<view class="avatar">
				<image src="../../static/imgs/icons/default-face.png" class="img-avatar"></image>
			</view>
			<view class="username">
				
			</view>
		</view> -->
		<form @submit="" class="g-form">
			<view class="m-form">
				<view class="avatar-wrap">
					<image src="../../static/imgs/icons/default-face.png" class="img-avatar"></image>
				</view>
				<view>
					<view class="ipt-box">
						<label>账号:</label>
						<input type="text" value="" placeholder="请输入账号" class="ipt-username" />
					</view>
				</view>
				<view class="ipt-pwd">
					<view class="ipt-box">
						<label>密码:</label>
						<input type="password" password="true" value="" placeholder="请输入密码" class="ipt-username" />
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
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import './login.scss'
</style>
