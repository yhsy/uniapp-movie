<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.page{
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		/*  #ifdef  H5  */
			/* H5有效的样式 */
			/* position: absolute; */
			/* overflow: auto; */
		/*  #endif  */
	}
	.page-block{
		background-color: #fff;
	}
	.search-block{
		background-color: #f8f8f8;
	}
</style>
