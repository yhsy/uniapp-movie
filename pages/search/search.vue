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
						<image :src="item.poster" class="poster-img"></image>
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
			this.getSearchList()
		},
		methods: {
			// 搜索列表
			getSearchList(){
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true,
					title: '请稍候',
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				// 通用性强(全端支持)
				const { serverUrl, qq } = api;
				// 获取查询参数
				const { keywords, page, pageSize } = this.query;
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
						console.log(res.data);
						// debugger;
						const resData = res.data;
					
						// 判断数据是否获取成功
						if(resData.status === 200) {
							// 服务端每次返回的数据
							// const rList = resData.data.rows;
							this.sList = resData.data.rows;
							// 数据叠加
							// this.sList = this.sList.concat(rList);
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
				this.getSearchList()
			}
		}
	}
</script>

<style>
	@import './search.scss'
</style>
