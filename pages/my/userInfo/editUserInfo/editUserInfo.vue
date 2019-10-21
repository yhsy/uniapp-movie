<template>
	<view class="page">
		<form @submit="edit()">
			<view class="m-form">
					<!-- 修改昵称 -->
					<view class="ipt-box" v-if="type=== 1">
						<label>昵称:</label>
						<input type="text" :value="editForm.nickname" @input="changeNickname" placeholder="请输入账号" class="ipt-username" />
					</view>

					<!-- 修改生日 -->
					<view class="ipt-box" v-if="type=== 2">
						<label>生日:</label>
						<picker 
							mode="date" 
							:value="editForm.birthday" 
							:start="startDate" 
							:end="endDate" 
							@change="changeBrithDay"
						>
							<view class="uni-input">{{editForm.birthday}}</view>
						</picker>
					</view>
					
					<!-- 修改性别 -->
					<view class="ipt-box" v-if="type=== 3">
						<radio-group @change="changeSex">
							<label class="radio-wrap">
								<view>
									<radio :value="1" :checked="editForm.sex === 1" />
								</view>
								<view>男</view>
							</label>
							<label  class="radio-wrap">
								<view>
									<radio :value="0" :checked="editForm.sex === 0" />
								</view>
								<view>女</view>
							</label>
							
						</radio-group>
					</view>
					<button type="primary" form-type="submit">提交</button>
				
			</view>
		</form>
	</view>
</template>

<script>
	import api from '../../../../common/api.js'
	export default {
		onLoad(params) {
			// 获取登录的信息(本地Localstorege里)
			const userInfo = uni.getStorageSync('globalUser');
			
			// 登录成功状态
			if(userInfo){
				this.info = userInfo;
			}
			
			// const type = params.type;
			const { type } = params;
			// console.log(type)
			if(!type){
				uni.showToast({
					title: '对不起,请重新登录',
					duration: 2000
				})
				uni.navigateTo({
					url:'../../../login/login'
				})
				return
			}
			// 根据类型，动态设置标题
			this.editTitle(Number(type));
			// 设置编辑类型 
			this.type = Number(type);
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				type: 1,
				info: {},
				editForm: {
					nickname: '',
					birthday: '',
					sex: '',
				},
				date: currentDate,
			};
		},
		methods:{
			// 动态修改标题
			editTitle(type){
				switch (type){
					case 1:
						uni.setNavigationBarTitle({
							title: '修改昵称'
						})
						const nickname = this.info.nickname;
						this.editForm = {
							nickname,
							birthday: '',
							sex: '',
						}
						break;
					case 2:
						uni.setNavigationBarTitle({
							title: '修改生日'
						})
						const birthday = this.info.birthday;
						this.editForm = {
							nickname: '',
							birthday,
							sex: '',
						}
						break;
					case 3:
						uni.setNavigationBarTitle({
							title: '修改性别'
						})
						const sex = this.info.sex;
						this.editForm = {
							nickname: '',
							birthday: '',
							sex,
						}
						break;
					default:
						break;
				}
			},
			// 输入昵称
			changeNickname(e){
				this.editForm.nickname =  e.target.value;
			},
			// 选择日期
			changeBrithDay(e){
				this.editForm.birthday =  e.target.value;
				// this.date = e.target.value
			},
			// 选择性别
			changeSex(e){
				console.log(e)
				this.editForm.sex =  Number(e.target.value);
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			edit(){
				const { type } = this;
				const userId = this.info.id;
				const userToken = this.info.userUniqueToken;
				console.log(userId)
				switch (type){
					case 1:
						this.editNickname(userId,userToken);			

						break;
					case 2:
						this.editBirthday(userId,userToken);

						break;
					case 3:
						this.editSex(userId,userToken);
						break;
					default:
						break;
				}
			},
			// 修改昵称
			editNickname(userId,userToken){
				const { serverUrl, qq } = api;
				
				const { nickname } = this.editForm;
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true,
					title: '修改中,请稍候',
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				
				uni.request({
				    url: serverUrl + '/user/modifyUserinfo?qq='+ qq,
					method: 'POST',
					header:{
						headerUserId: userId,
						headerUserToken: userToken
					},
				    data: {
						userId,
						nickname,
				    },
				    success: (res) => {
						console.log(res.data);
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							this.info = resData.data;
							// 本地存储更新数据
							uni.setStorageSync('globalUser',resData.data);
							// 跳转到我的账号页
							uni.navigateTo({
								url: '../userInfo'
							})
						} else {
							console.log(resData.msg)
							// 修改失败,提示信息
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
			// 修改生日
			editBirthday(userId,userToken){
				const { serverUrl, qq } = api;
				// const { id } = this.info.id;
				
				const { birthday } = this.editForm;
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true,
					title: '修改中,请稍候',
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				
				uni.request({
				    url: serverUrl + '/user/modifyUserinfo?qq='+ qq,
					method: 'POST',
					header:{
						headerUserId: userId,
						headerUserToken: userToken
					},
				    data: {
						userId,
						birthday,
				    },
				    success: (res) => {
						console.log(res.data);
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							this.info = resData.data;
							// 本地存储更新数据
							uni.setStorageSync('globalUser',resData.data);
							// 跳转到我的账号页
							uni.navigateTo({
								url: '../userInfo'
							})
						} else {
							console.log(resData.msg)
							// 修改失败,提示信息
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
			// 修改性别
			editSex(userId,userToken){
				const { serverUrl, qq } = api;
				// const { id } = this.info;
				
				const { sex } = this.editForm;
				// 显示Loading
				uni.showLoading({
					// 开启透明遮罩
					mask: true,
					title: '修改中,请稍候',
				})
				
				// 显示导航栏加载Loading
				uni.showNavigationBarLoading()
				
				uni.request({
				    url: serverUrl + '/user/modifyUserinfo?qq='+ qq,
					method: 'POST',
					header:{
						headerUserId: userId,
						headerUserToken: userToken
					},
				    data: {
						userId,
						sex,
				    },
				    success: (res) => {
						console.log(res.data);
						const resData = res.data;
						// 判断数据是否获取成功
						if(resData.status === 200) {
							this.info = resData.data;
							// 本地存储更新数据
							uni.setStorageSync('globalUser',resData.data);
							// 跳转到我的账号页
							uni.navigateTo({
								url: '../userInfo'
							})
						} else {
							console.log(resData.msg)
							// 修改失败,提示信息
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
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
	}
</script>

<style lang="scss">
	@import './editUserInfo.scss'
</style>
