<template>
	<view class="page">
		<!-- 搜索页 -->
		<view class="search-block">
			<view class="m-search">			
				<view class="m-search-hd">
					<view>
						<image src="../../static/imgs/icons/search.png" class="icon-search"></image>
					</view>
					<view>
						<input 
							type="text" 
							maxlength="10"
							placeholder="找预告" 
							class="ipt-search" 
							confirm-type="search"
							@confirm="searchMovie"
						/>
					</view>
				</view>
				<view class="m-search-bd page-block">
					<!--
						<view class="search-item">
							<image src="../../static/imgs/poster/civilwar.jpg" class="poster-img"></image>
						</view>
					 -->
					<view class="search-item" v-for="item of sList" :key="item.id">
						<image 
							:src="item.poster" 
							class="poster-img"
							:data-trailerId="item.id"
							@click="goMovieDetail"
						>
						</image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入Api配置文件
	import api from "../../common/api.js";
	
	export default {
		data() {
			return {
				// 搜索结果
				sList: [],
				// 总页数
				pageTotal: 0,
				query: {
					// 搜索关键词
					keywords: '',
					// 页数
					page: 1,
					pageSize: 9,
				}
			}
		},
		onLoad(){
			uni.showLoading({
				title:'载入中'
			})
			let qq = "";
			qq = uni.getStorageSync('qq');
			if(qq){
				this.getSearchList(1,qq)
			} else {
				this.getQQ().then(res => {
					qq = res.ok;
					
					uni.setStorageSync('qq', qq)
					
					this.getSearchList(1,qq)
					uni.hideLoading();
				}).catch(err => {
					reject(err)
				})
			}
			// console.log(qq)
			// this.getSearchList(1)
		},
		// 页面上拉(上拉加载)-生命周期
		onReachBottom(){
			console.log('页面滚动到底部的事件')
			
			// const val = e.detail.value;
			// console.log(val)
			// 总页数
			const { pageTotal } = this;
			// 当前页
			const { page } = this.query;
			// console.log(page,pageTotal)
			// 大于当前页数,不分页
			if(page >= pageTotal) {
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none',
					duration: 2000,
				})
				return
			}
			const pages = this.query.page + 1;
			this.query.page = pages;
			const qq =  uni.getStorageSync('qq')
			this.getSearchList(pages, qq)
		},
		methods: {
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
			// 搜索列表
			getSearchList(page,qq){
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true,
					title: '请稍候',
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				// 通用性强(全端支持)
				const { serverUrl } = api;
				// 获取查询参数
				const { keywords, pageSize } = this.query;
				uni.request({
				    url: serverUrl + '/search/list',
					method: 'POST',
				    data: {
						qq,
						keywords,
						page,
						pageSize,
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
							// 服务端每次返回的数据
							const rList = resData.data.rows;
							// this.sList = resData.data.rows;
							// 数据叠加
							this.sList = this.sList.concat(rList);
							// 获取总页数
							this.pageTotal = resData.data.total;
						} else {
							console.log(resData.msg)
						}
						
				    },
					complete: () =>{
						// 停止当前页面下拉刷新
						// uni.stopPullDownRefresh();
						// 隐藏Loading
						uni.hideLoading();
						// 隐藏导航栏加载Loading
						uni.hideNavigationBarLoading()
					}
				});
			},
			// 搜索
			searchMovie(e){
				const val = e.detail.value;
				// console.log(val)
				this.query.keywords = val;
				this.query.page = 1;
				this.query.pageSize = 15;
				this.sList = [];
				const qq =  uni.getStorageSync('qq')
				this.getSearchList(1,qq)
			},
			// 跳转到电影详情页
			goMovieDetail(e){
				// var gIndex = e.currentTarget.dataset.gindex;
				const trailerId = e.currentTarget.dataset.trailerid;
				// console.log(trailerId)
				// 跳转页面
				uni.navigateTo({
					url: '../movie/movie?trailerId=' + trailerId
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './search.scss'
</style>
