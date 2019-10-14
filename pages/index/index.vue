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
						
						<!-- 
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
						-->
						<trailer-stars :innerScore="item.score" :showNum="1"></trailer-stars>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 热门超英-end -->
		
		<!-- 使用自定义组件 -->
		<!-- <hello-camp myval="Hello Next"></hello-camp> -->
		
		<!-- 热门预告 -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/imgs/icons/interest.png" class="icon-hot"></image>
				<view class="hot-title">热门预告</view>
			</view>
			<view class="page-block">
				<view class="m-trailer">
					<view class="video-item" v-for="vItem in htList" :key="vItem.id">
						<!-- 						
							<video
								src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
								enable-danmu danmu-btn controls
							>
							</video> 
						-->	
						<video
							:src="vItem.trailer"
							:poster="vItem.poster"
							controls
						/>
					</view>

				</view>
			</view>
		</view>
		
		<!-- 热门预告 -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/imgs/icons/guess-u-like.png" class="icon-hot"></image>
				<view class="hot-title">猜你喜欢</view>
			</view>
			<view class="page-block">
			</view>
		</view>
		
	</view>
</template>

<script>
	// 引入Api配置文件
	import api from "../../common/api.js";
	
	// gh_4e5d2e602971
	// const { serverUrl, qq } = this;
	
	// 引入自定义组件
	import helloCamp from '../../components/helloCamp.vue';
	// 引入评分组件
	import trailerStars from '../../components/trailerStars/trailerStars.vue';

	export default {
		components:{
			helloCamp,
			trailerStars,
		},
		data() {
			return {
				// banner列表
				bList: [],
				// 热门超英列表
				hsList: [],
				// 热门预告列表,
				htList: [],
			}
		},
		onLoad() {
			// 获取banner列表
			this.getBanner()
			// 获取热门超英-列表
			this.getHotSuperHero()
			// 获取热门预告-列表
			this.getHotTrailer()
		},
		methods: {
			// 获取banner列表-接口
			getBanner(){
				// 通用性强(全端支持)
				const { serverUrl, qq } = api;
				
				// 通过main.js的prototype挂载实现(坑:Ios不支持)
				// const { serverUrl, qq } = this;
				// console.log(serverUrl,qq);
				uni.request({
				    url: serverUrl + '/index/carousel/list',
					method: 'POST',
				    data: {
						qq: qq,
				    },
					header:{	
						'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						// console.log(res.data);
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
				const { serverUrl, qq } = api;
				// 通过main.js的prototype挂载实现
				// const { serverUrl, qq } = this;

				uni.request({
				    url: serverUrl + '/index/movie/hot?type=superhero',
					method: 'POST',
				    data: {
						qq: qq,
				    },
					header:{	
						'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						// console.log(res.data);
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							this.hsList = resData.data;
						} else {
							console.log(resData.msg)
						}
						
				    }
				});
			},
			// 获取热门预告-接口
			getHotTrailer(){
				const { serverUrl, qq } = api;

				uni.request({
				    url: serverUrl + '/index/movie/hot?type=trailer',
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
							this.htList = resData.data.slice(0,2);
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
