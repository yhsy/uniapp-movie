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
					<!--
						<video
							src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
							enable-danmu danmu-btn controls
						>
						</video>
					-->
					<!-- #ifndef  MP-ALIPAY -->
						<video
							v-for="vItem in htList"
							:key="vItem.id"
							class="video-item"
							:src="vItem.trailer"
							:poster="vItem.poster"
							controls
						></video>
					<!-- #endif -->
				</view>
			</view>
		</view>
		
		<!-- 猜你喜欢-start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/imgs/icons/guess-u-like.png" class="icon-hot"></image>
				<view class="hot-title">猜你喜欢</view>
			</view>
			<!-- 			
				<view class="page-block m-love">
					<view class="love-img">
						<image src="../../static/imgs/poster/civilwar.jpg" class="love-img"></image>
					</view>
					<view class="love-info">
						<view class="info-wrap">
							<view class="title">美国队长2:冬日XXXXXXXX</view>
							<trailer-stars :innerScore="8.5" ></trailer-stars>
							<view class="text tag">2018 / 美国 / 科幻 / 超级英雄</view>
							<view class="text date">上映时间：2014-04-04(美国/中国大陆) </view>
						</view>
					</view>
					<view class="love-zan">
						<view class="zan-wrapper">
							<view class="icon-zan">
								<image src="../../static/imgs/icons/praise.png" class="icon-zan"></image>
							</view>
							<view class="text">
								赞一下
							</view>
						</view>
					</view>
				</view>
			-->
			<view class="page-block m-love" v-for="(info, gIndex) of loveList" :key="info.id">
				<view class="love-img">
					<image :src="info.poster" class="love-img"></image>
				</view>
				<view class="love-info">
					<view class="info-wrap">
						<view class="title">{{info.name}}</view>
						<trailer-stars :innerScore="info.score" ></trailer-stars>
						<view class="text tag">{{info.basicInfo}}</view>
						<view class="text date">{{info.releaseDate}} </view>
					</view>
				</view>
				<view class="love-zan">
					<view class="zan-wrapper"  @click="zanAnimation" :data-gIndex="gIndex">
						<view class="icon-zan">
							<image src="../../static/imgs/icons/praise.png" class="icon-zan"></image>
						</view>
						<view class="text">
							赞一下
						</view>
						<!-- #ifdef APP-PLUS || MP-WEIXIN -->
							<view class="text animation-opacity" :animation="animationDataArr[gIndex]">
								+1
							</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
			
		</view>
		<!-- 猜你喜欢-end -->
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
				// 猜你喜欢列表
				loveList: [],
				// 动画对象
				animationData: {},
				// 动画对象的数组-每次点击对应的赞(5条数据)
				animationDataArr: [
					{},
					{},
					{},
					{},
					{},
				]
			}
		},
		onLoad() {
			// 获取banner列表
			this.getBanner()
			// 获取热门超英-列表
			this.getHotSuperHero()
			// 获取热门预告-列表
			this.getHotTrailer()
			// 获取猜你喜欢-列表
			this.getMyLove()
			
			// uni-app的动画只支持APP和微信小程序
			// #ifdef APP-PLUS || MP-WEIXIN
				// 页面创建的时候，创建一个临时动画对象
				this.animation = uni.createAnimation()
			// #endif
			
		},
		// 页面卸载
		onUnload(){
			// 清除动画数据
			this.animationData = {};
			this.animationDataArr = [{},{},{},{},{}];
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
						// console.log(res.data);
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
			},
			// 获取猜你喜欢-接口
			getMyLove(){
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				
				const { serverUrl, qq } = api;
				
				uni.request({
				    url: serverUrl + '/index/guessULike',
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
							this.loveList = resData.data;
						} else {
							console.log(resData.msg)
						}
						
				    },
					complete: () =>{
						// 停止当前页面下拉刷新
						uni.stopPullDownRefresh();
						// 隐藏Loading
						uni.hideLoading();
						// 隐藏导航栏加载Loading
						uni.hideNavigationBarLoading()
					}
				});
			},
			// 点赞动画
			zanAnimation(e){
				// return;
				
				// #ifdef APP-PLUS || MP-WEIXIN
					// 获取自定义属性的值(key要转 小写)
					var gIndex = e.currentTarget.dataset.gindex;
					// console.log(gIndex)
					// 构建动画数据，并通过step表示这组动画的完成
					// 向上移动100px,透明度1,step一组动画的完成(动画时间1秒)
					this.animation.translateY(-60).opacity(1).step({
						duration: 400,
					})
					
					// 导出动画数据到view组件，实现组件的动画效果
					// this.animationData = this.animation.export()
					this.animationData = this.animation
					this.animationDataArr[gIndex] = this.animationData.export()
					
					// 还原动画
					setTimeout(function() {
						this.animation.translateY(0).opacity(0).step({
							duration: 0,
						})
						// this.animationData = this.animation.export()
						this.animationData = this.animation
						this.animationDataArr[gIndex] = this.animationData.export()
					}.bind(this), 500);
				// #endif
			},
		},
		// 下拉刷新-监控
		onPullDownRefresh(){
			this.getMyLove()
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
