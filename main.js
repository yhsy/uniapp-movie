import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 全局变量-挂载实现
// Vue.prototype.serverUrl = 'https://www.imovietrailer.com/superhero';
// Vue.prototype.qq = 'lee57837906';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
