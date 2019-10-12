<template>
	<view class="page">
		<!-- 轮播图-start -->
		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in bList" :key="index">
				<image :src="item.image" class="banner"></image>
			</swiper-item>>
		</swiper>
		<!-- 轮播图-end -->
		
		<!-- 热门超英-start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/imgs/icons/hot.png" class="icon-hot"></image>
				<view class="hot-title">热门超英</view>
			</view>
			
			<scroll-view scroll-x="true" class="page-block hot-content">
				<!-- 
					<view class="m-poster">
						<view class="poster-wapper">
							<image src="../../static/imgs/poster/civilwar.jpg" class="poster-img" ></image>
							<view class="movie-name">
								蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
							</view>
							<view class="movie-score-wapper">
								<image src="../../static/imgs/icons/star-yellow.png" class="icon-star"></image>
								<image src="../../static/imgs/icons/star-yellow.png" class="icon-star"></image>
								<image src="../../static/imgs/icons/star-yellow.png" class="icon-star"></image>
								<image src="../../static/imgs/icons/star-yellow.png" class="icon-star"></image>
								<image src="../../static/imgs/icons/star-yellow.png" class="icon-star"></image>
								<view class="movie-score">
									9.1
								</view>
							</view>
						</view>
					</view> 
				-->
				<view class="m-poster" v-for="(item,index) of hsList" :key="index">
					<view class="poster-wapper">
						<image :src="item.cover" class="poster-img" ></image>
						<view class="movie-name">
							{{item.name}}
						</view>
						<view class="movie-score-wapper">
							<image :src="item.score > 1 ? '../../static/imgs/icons/star-yellow.png' : '../../static/imgs/icons/star-gray.png' " class="icon-star"></image>
							<image :src="item.score > 3 ? '../../static/imgs/icons/star-yellow.png' : '../../static/imgs/icons/star-gray.png' " class="icon-star"></image>
							<image :src="item.score > 5 ? '../../static/imgs/icons/star-yellow.png' : '../../static/imgs/icons/star-gray.png' " class="icon-star"></image>
							<image :src="item.score > 7 ? '../../static/imgs/icons/star-yellow.png' : '../../static/imgs/icons/star-gray.png' " class="icon-star"></image>
							<image :src="item.score > 9 ? '../../static/imgs/icons/star-yellow.png' : '../../static/imgs/icons/star-gray.png' " class="icon-star"></image>
							<view class="movie-score">
								{{item.score}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 热门超英-end -->
		
		<!-- 使用自定义组件 -->
		<hello-camp myval="Hello Next"></hello-camp>
		
	</view>
</template>

<script>
	// 引入Api配置文件
	// import api from "../../common/api.js";
	
	// gh_4e5d2e602971
	// const { serverUrl, qq } = this;
	
	// 引入自定义组件
	import helloCamp from '../../components/helloCamp.vue';

	export default {
		components:{
			helloCamp
		},
		data() {
			return {
				// banner列表
				bList: [],
				// 热门超英列表
				hsList: [],
			}
		},
		onLoad() {
			// 获取banner列表
			this.getBanner()
			// 获取热门超英-列表
			this.getHotSuperHero()
		},
		methods: {
			// 获取banner列表-接口
			getBanner(){
				// const { serverUrl, qq } = api;
				
				// 通过main.js的prototype挂载实现
				const { serverUrl, qq } = this;
				// console.log(serverUrl,qq);
				uni.request({
				    url: serverUrl + '/index/carousel/list', //仅为示例，并非真实接口地址。
					method: 'POST',
				    data: {
						qq: qq,
				    },
					header:{	
						'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						console.log(res.data);
						// debugger;
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							this.bList = resData.data;
						} else {
							console.log(resData.msg)
						}
						
				    }
				});
			},
			// 获取热门超英-接口
			getHotSuperHero(){
				// 通过main.js的prototype挂载实现
				const { serverUrl, qq } = this;

				uni.request({
				    url: serverUrl + '/index/movie/hot?type=superhero', //仅为示例，并非真实接口地址。
					method: 'POST',
				    data: {
						qq: qq,
				    },
					header:{	
						'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						console.log(res.data);
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							this.hsList = resData.data;
						} else {
							console.log(resData.msg)
						}
						
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
