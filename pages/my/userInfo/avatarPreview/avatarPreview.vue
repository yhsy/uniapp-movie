<template>
	<view class="g-box" @click="backInfo()">
		<view class="">
			<!-- <image src="../../../../static/imgs/icons/default-face.png" class="img-avatar"></image> -->
			<image :src="avatar" class="img-avatar"></image>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(params){
			// 如果有带头像地址
			if(params.avatar){
				const { avatar } = params;
				this.avatar = avatar;
			} else {
				uni.navigateTo({
					url:'../userInfo'
				})
			}
		},
		data() {
			return {
				avatar: ''
			};
		},
		methods:{
			backInfo(){
				// 返回我的账号页
				uni.navigateTo({
					url:'../userInfo'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './avatarPreview.scss'
</style>
