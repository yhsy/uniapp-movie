<template>
	<view class="page g-box">
		<!-- 用户信息页 -->
		<view class="g-hd">
			<view class="m-hd">
				<view>
					<view class="item-info avatar-info" @click="avatarOption">
						<view class="tit">头像</view>
						<view>
							<view class="img-warp">
								<view class="">
									<!-- <image src="../../../static/imgs/icons/default-face.png" class="img-avatar" mode=""></image> -->
									<image :src="info.faceImage" class="img-avatar" mode=""></image>
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
					
				<view>
					<view class="item-info" @click="goEditInfo(1)">
						<view class="tit">昵称</view>
						<view>
							<view class="img-warp">
								<view class="text">
									<!-- admin01 -->
									{{info.nickname}}
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view>
					<view class="item-info"  @click="goEditInfo(2)">
						<view class="tit">生日</view>
						<view>
							<view class="img-warp">
								<view class="text">
									<!-- 1990-01-01 -->
									{{info.birthday}}
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view>
					<view class="item-info"  @click="goEditInfo(3)">
						<view class="tit">性别</view>
						<view>
							<view class="img-warp">
								<view class="text">
									<!-- 男 -->
									<!-- {{info.sex===1 ? '男' : '女'}} -->
									<view v-if="info.sex===1">男</view>
									<view v-else-if="info.sex===0">女</view>
									<view v-else>请选择</view>
								</view>
								<view class="u-arrow">
									<image src="../../../static/imgs/icons/left-gray-arrow.png" class="icon-arrow" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
			
		
		<view class="m-ft">
			<view class="item-menu" @click="clearStorage()">
				清理缓存
			</view>
			<view class="item-menu" @click="loginOut()">
				退出登录
			</view>
		</view>

	</view>
</template>

<script>
	import api from '../../../common/api.js'
	export default {
		onLoad() {
			if(uni.getStorageSync('globalUser')){
				// 获取登录的信息(本地Localstorege里)
				const userInfo = uni.getStorageSync('globalUser');
				
				// 登录成功状态
				if(userInfo){
					this.info = userInfo;
				}
			} else {
				// 跳转到登录页
				uni.navigateTo({
					url: '../../login/login'
				})
			}
		},
		data() {
			return {
				info: {}
			};
		},
		methods:{
			// 清理缓存
			clearStorage(){
				// // 清理本地所有缓存
				// uni.clearStorageSync();
				// // 跳转到登录页
				// uni.switchTab({
				// 	url: '../../index/index'
				// })
				uni.showToast({
					title: '清理缓存成功',
					duration:2000,
					icon: 'success'
				})
			},
			// 退出登录
			loginOut(){
				/*
					// 本地退出
					// uni.showLoading()
					// // 清理登录信息缓存
					// uni.removeStorageSync('globalUser');
					// // 跳转到首页
					// // uni.switchTab({
					// // 	url: '../../index/index'
					// // })
					// // 跳转到登录页
					// uni.navigateTo({
					// 	url: '../../login/login'
					// })
					// setTimeout(()=>{
					// 	uni.hideLoading()
					// },1000)
					
					
				*/
				
				// 退出登录-服务端接口
				const { serverUrl, qq } = api;
				const { id } = this.info;
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true,
					title: '请稍候…',
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				
				uni.request({
				    url: serverUrl + '/user/logout?userId='+ id+'&qq='+ qq,
					method: 'POST',
				    data: {
						userId: id,
						qq,
				    },
				    success: (res) => {
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							// 清理登录信息缓存
							uni.removeStorageSync('globalUser');
							
							// 跳转到首页
							uni.switchTab({
								url: '../../index/index'
							})
							// 跳转到登录页
							// uni.navigateTo({
							// 	url: '../../login/login'
							// })
							
						} else {
							console.log(resData.msg)
							// 退出登录失败
							uni.showToast({
								title: resData.msg,
								duration: 2000
							})
						}
						
				    },
					complete: () =>{
						// 隐藏Loading
						uni.hideLoading();
						// 隐藏导航栏加载Loading
						uni.hideNavigationBarLoading()
					},
				});
			},
			goEditInfo(type){
				uni.navigateTo({
					url:'editUserInfo/editUserInfo?type=' + type
				})
			},
			avatarOption(){
				uni.showActionSheet({
					// 菜单列表(最多6个)
					itemList: ["查看我的头像","从手机相册选择",],
					// 点击菜单事件
					success:  (res) => {
						// 获取菜单的索引
						const tIndex = res.tapIndex + 1;
						
						// console.log('选中了第' + (tIndex + 1) + '个按钮');
						switch (tIndex){
							// 查看我的头像
							case 1:
								// console.log('查看我的头像')
								// 获取头像地址
								const avatar = this.info.faceImage;
								
								uni.navigateTo({
									url: 'avatarPreview/avatarPreview?avatar=' + avatar
								})
								break;
								
							// 上传头像
							case 2:
								console.log('上传头像')
								uni.chooseImage({
									sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ['album'], //从相册选择
								    success: (chooseImageRes) => {
										// 上传图片的临时地址
								        const tempFilePaths = chooseImageRes.tempFilePaths;
										console.log(tempFilePaths)
										console.log(tempFilePaths[0])
								        // uni.uploadFile({
								        //     url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
								        //     filePath: tempFilePaths[0],
								        //     name: 'file',
								        //     formData: {
								        //         'user': 'test'
								        //     },
								        //     success: (uploadFileRes) => {
								        //         console.log(uploadFileRes.data);
								        //     }
								        // });
								    }
								});
								
								break;
							default:
								break;
						}
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './userInfo.scss'
</style>
