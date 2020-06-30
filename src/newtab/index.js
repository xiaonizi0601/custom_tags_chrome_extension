import Vue from 'vue';
import AppComponent from './App/App.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '../assets/css/common.scss';
import Common from '../assets/js/common.js';

import i18n from '../assets/i18n/index';

// 主题判断
let defaultTheme = 'theme_1';
if (localStorage.getObject('theme') !== null) {
  defaultTheme = localStorage.getObject('theme');
}

// console.info('defaultTheme=',defaultTheme);

if (defaultTheme === 'theme_1'){
  // import(`${theme}`); // 注意：import不支持在块级使用,require支持
  require('../assets/css/theme_1.scss'); 
}else{
  require('../assets/css/theme_2.scss');
}

Vue.component('app-component', AppComponent);

Vue.prototype.$Common = Common;



new Vue({
  el: '#app',
  i18n,
  render: createElement => {
    return createElement(AppComponent);
  }
});