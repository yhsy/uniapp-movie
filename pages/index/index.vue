<template>
	<view class="page">
		<!-- 首页 -->
		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image src="../../static/imgs/banner1.jpg" class="banner"></image>
			</swiper-item>
			<swiper-item >
				<image src="../../static/imgs/banner2.jpg" class="banner"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/imgs/banner1.jpg" class="banner"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
