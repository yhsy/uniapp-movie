<!-- 评分组件 -->
<template name="trailerStars">
	<view class="movie-score-wapper">
		<!-- 黄色星星 -->
		<image
			v-for="(yItem,index) in yelloScore" 
			:key="index"
			src="../../static/imgs/icons/star-yellow.png" 
		class="icon-star"></image>
		<!-- 灰色星星 -->
		<image 
			v-for="(gItem,index) in grayScore" 
			:key="'g'+index"
			src="../../static/imgs/icons/star-gray.png" 
			class="icon-star"
		></image>
		<view class="movie-score" v-if="showNum">
			{{innerScore}}
			<!-- {{ showNum ? innerScore : '' }} -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'trailerStars',
		data() {
			return {
				// 黄色星星数量
				yelloScore: 0,
				// 灰色星星数量(默认5个:没有评分,既0分)
				grayScore: 5,
			};
		},
		props: {
			// 评分
			// score : {
			// 	type: Number
			// }
			innerScore: 0, // 定义外部传入的分数
			showNum: 0,	   // 是否需要显示分数 1-显示，0-不显示
		},
		// 生命周期,组件创建完成后被调用
		created(){
			let tempScore = 0;
			// 只有分数传过来才变
			if(this.innerScore !== null && this.innerScore !== undefined && this.innerScore !== '' ){
				tempScore = this.innerScore;
			}
			// 根据评分计算星星数量
			// 黄色星星数量
			const yScore = parseInt(tempScore / 2);
			// 灰色星星数量
			const gScore = 5-yScore;
			
			this.yelloScore = yScore;
			this.grayScore = gScore;
		}
	}
</script>

<style>
	.movie-score-wapper{
		display: flex;
		flex-direction: row;
		padding-left: 10upx;
	}
	.icon-star{
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
	}
	.movie-score{
		font-size: 24upx;
		color: grey;
		margin-left: 8upx;
	}
</style>
