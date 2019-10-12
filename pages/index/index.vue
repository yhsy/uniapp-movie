<template>
	<view class="page">
		<!-- 首页 -->
		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<!-- 		
				<swiper-item>
					<image src="../../static/imgs/banner1.jpg" class="banner"></image>
				</swiper-item>
				<swiper-item >
					<image src="../../static/imgs/banner2.jpg" class="banner"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/imgs/banner1.jpg" class="banner"></image>
				</swiper-item> 
			-->
			<swiper-item v-for="(item,index) in bList" :key="index">
				<image :src="item.image" class="banner"></image>
			</swiper-item>>
		</swiper>
	</view>
</template>

<script>
	// 引入Api配置文件
	// import api from "../../common/api.js";
	
	// gh_4e5d2e602971
	

	export default {
		data() {
			return {
				// banner列表
				bList: [],
			}
		},
		onLoad() {
			// 获取banner列表
			this.getBanner()
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
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							this.bList = resData.data;
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
