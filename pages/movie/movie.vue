<template>
	<view class="page">
		<!-- 这是电影预告片的详情页 -->
		<view class="g-hd">
			<!-- 预告片 -->
			<!-- <video
			src="http://122.152.205.72:88/superhero/xman/DarkPhoenix/trailer.mp4" 
			class="u-video"
			controls></video> -->
			<video
			:src="info.trailer" 
			class="u-video"
			controls></video>
		</view>
		<view class="g-bd">
			<!-- 基本信息-start -->
			<view class="m-info">
				<view>
					<image :src="info.poster" class="poster-img"></image>
				</view>
				<view>
					<view class="info">
						<view class="title">{{info.name}}</view>
						<view class="text">{{info.basicInfo}}</view>
						<view class="text">{{info.originalName}}</view>
						<view class="text">{{info.totalTime}}</view>
						<view class="text time">{{info.releaseDate}}</view>
						<view class="score">
							<view class="score-info">
								<view class="score-wrapper">
									<view class="text">综合评分:</view>
									<view class="text-score">{{info.score}}</view>	
								</view>
								<view class="zan-wrapper">
									<!-- 分数大于0才传参 -->
									<view class="score-icon" v-if="infoScore">
										<trailer-stars :innerScore="infoScore" :showNum="0"></trailer-stars>
									</view>
									<!-- 0分 -->
									<view class="score-icon" v-else>
										<trailer-stars :innerScore="0" :showNum="0"></trailer-stars>
									</view>
									<view class="text">
										{{info.prisedCounts}} 人点赞
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 基本信息-end -->
			
			<!-- 剧情介绍-start -->
			<view class="g-mode">
				<view class="u-title">
					剧情介绍
				</view>
				<view class="m-plot">
					{{info.plotDesc}}
				</view>
			</view>
			<!-- 剧情介绍-end -->
			
			<!-- 演职人员-start -->
			<view class="g-mode">
				<view class="u-title">
					演职人员
				</view>
				<scroll-view scroll-x="true" class="m-performer">
					<!-- 					
						<view  class="performer-wrapper">
							<view class="performer-item">
								<view>
									<image src="../../static/imgs/poster/civilwar.jpg" class="img-performer" ></image>
								</view>
								<view class="name">
									乔斯·韦登
								</view>
								<view class="role">
									导演
								</view>
							</view>
						</view>
					-->
					
					<!-- 导演列表 -->
					<view  class="performer-wrapper" v-for="(dItem,index) in directorList" :key="dItem.staffId">
						<view class="performer-item">
							<view>
								<image :src="dItem.photo" class="img-performer"  @click="imgPreview(directorList,index,1)"></image>
							</view>
							<view class="name">
								{{dItem.name}}
							</view>
							<view class="role">
								{{dItem.actName}}
							</view>
						</view>
					</view>
					<!-- 演员列表 -->
					<view  class="performer-wrapper" v-for="(pItem,index) in performerList" :key="pItem.staffId">
						<view class="performer-item">
							<view>
								<image :src="pItem.photo" class="img-performer" @click="imgPreview(performerList,index,2)"></image>
							</view>
							<view class="name">
								{{pItem.name}}
							</view>
							<view class="role">
								{{ `饰 ${pItem.actName}`}}
							</view>
						</view>
					</view>	
				</scroll-view>
				
			</view>
			<!-- 演职人员-end -->
			
			<!-- 剧照-start -->
			<view class="g-mode">
				<view class="u-title">
					剧照
				</view>
				<scroll-view scroll-x="true" class="m-performer">
					<view  class="performer-wrapper" v-for="(sItem,index) in stillsList" :key="index">
						<view class="performer-item">
							<view>
								<image :src="sItem" class="img-stills" @click="imgPreview(stillsList,index)"></image>
							</view>
						</view>
					</view>
				</scroll-view>	
			</view>
			<!-- 剧照-end -->
		</view>
	</view>
</template>

<script>
	// 引入Api配置文件
	import api from "../../common/api.js";
	
	// 引入评分组件
	import trailerStars from '../../components/trailerStars/trailerStars.vue';
	
	export default {
		components:{
			trailerStars,
		},
		data() {
			return {
				// 影片ID
				trailerId: '',
				info: {},
				// 评分
				infoScore: 0,
				// 导演列表
				directorList: '',
				// 演员列表
				performerList:[],
				// 剧照列表
				stillsList:[],
				// 导演图片列表
				directorPhotoList:[],
				// 演员图片列表
				performerPhotoList:[],
				photoList: []
			}
		},
		onLoad(params){
			// debugger;
			// 获取上一个页面传入的参数
			const { trailerId } = params;
			
			// console.log(trailerId);
			this.trailerId = trailerId;
			
			// 获取影片详情
			this.getTrailer();
			// 获取导演列表
			this.getStaff(1);
			// 获取演员列表
			this.getStaff(2);
			
			// 通过Api设置导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			})
		},
		methods: {
			// 获取影片详情
			getTrailer(){
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true,
					title: '请稍候',
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				
				const { serverUrl, qq } = api;
				const { trailerId } = this;
				
				uni.request({
				    url: serverUrl + '/search/trailer/'+ trailerId ,
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
							this.info = resData.data;
							this.infoScore =  resData.data.score;
							console.log(resData.data.score)
							this.stillsList = JSON.parse(resData.data.plotPics);
						} else {
							console.log(resData.msg)
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
			// 获取演职人员列表
			getStaff(type){
				
				const { serverUrl, qq } = api;
				const { trailerId } = this;
				
				uni.request({
				    url: serverUrl + '/search/staff/'+trailerId+'/'+type ,
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
							if(type === 1) {
								// 导演列表
								this.directorList = resData.data;
								
								this.directorPhotoList = this.toImgList(resData.data);
								console.log()

							} else {
								// 演员列表
								this.performerList = resData.data;
								
								this.performerPhotoList = this.toImgList(resData.data);
		
							}
						} else {
							console.log(resData.msg)
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
			// 提取图片列表为数组
			toImgList(list){
				const imgList = [];
				for(let i=0;i<list.length;i++){
					imgList.push(list[i].photo)
				}
				return imgList;
			},
			// 图片预览
			imgPreview(list,index,type){
				// console.log(JSON.stry(list))
				if(type){
					const dList = this.directorPhotoList;
					const pList = this.performerPhotoList;
					// 连接数组
					const photoList = dList.concat(pList);
					
					// 导演
					if(type===1) {
						// 预览图片列表
						uni.previewImage({
							urls: photoList,
							current: index,
						})
					} else {
						// 演员
						
						// 预览图片列表
						uni.previewImage({
							urls: photoList,
							current: dList.length + index,
						})
					}

				} else {
					// 预览图片列表
					uni.previewImage({
						urls:list,
						current: index,
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	@import './movie.scss'
</style>
