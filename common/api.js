const serverUrl = "https://www.imovietrailer.com/superhero";			// 生产环境
// 权限QQ
// const qq = 'lee31526511';
const qq = uni.getStorageSync('qq') || '';

// const serverUrl = "https://www.imovietrailer-dev.com/superhero";		// 开发环境
export default{	
	serverUrl,
	qq,
}