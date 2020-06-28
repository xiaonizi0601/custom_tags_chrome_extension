import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// 引入各个语言配置文件

import en from './languages/en_US';
import zh from './languages/zh_CN';

// 创建vue-i18n实例i18n
const i18n = new VueI18n({
    // 设置默认语言
    locale: localStorage.getObject('language') || 'zh-CN', // 语言标识
    fallbackLocale: 'zh-CN', // 当语言环境中不存在 message 键时，使用 zh 语言环境进行本地化
    // 添加多语言（每一个语言标示对应一个语言文件）
    messages: {
        en,
        zh
    },
    silentTranslationWarn: true
})

// 暴露i18n
export default i18n;