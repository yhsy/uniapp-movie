<template>
	<view class="page">
		<!-- 这是电影预告片的详情页 -->
		<view class="g-hd">
			<!-- 预告片 -->
			<video
			src="http://122.152.205.72:88/superhero/xman/DarkPhoenix/trailer.mp4" 
			class="u-video"
			controls></video>
		</view>
		<view class="g-bd">
			<!-- 基本信息-start -->
			<view class="m-info">
				<view>
					<image src="../../static/imgs/poster/justice.png" class="poster-img"></image>
				</view>
				<view>
					<view class="info">
						<view class="title">X战警：黑凤凰</view>
						<view class="text">2018 / 美国 / 科幻 / 超级英雄</view>
						<view class="text">原名：xman: Dark Phoenix</view>
						<view class="text">影片时长：未知</view>
						<view class="text">上映时间：2019-06-07(美国)</view>
						<view class="score">
							<view class="score-info">
								<view class="score-wrapper">
									<view class="">综合评分:</view>
									<view class="">8.9:</view>	
								</view>
								<view class="zan-wrapper">
									<view class="score-icon">
										
									</view>
									<view class="num">
										7892 人点赞
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 基本信息-end -->
			
			<!-- 剧情介绍-start -->
			<view class="g-bd2">
				
			</view>
			<!-- 剧情介绍-end -->
			
			<!-- 演职人员-start -->
			<view class="g-bd3">
				
			</view>
			<!-- 演职人员-end -->
			
			<!-- 剧照-start -->
			<view class="g-bd4">
				
			</view>
			<!-- 剧照-end -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(params){
			// debugger;
			// 获取上一个页面传入的参数
			const { trailerId } = params;
			console.log(trailerId);
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import './movie.scss'
</style>
