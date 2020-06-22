<template>
    <div class="main_app c-popup">
        <!-- 添加快捷方式 弹框 start -->
        <div class="modal-header">
            <h5 class="modal-title">添加快捷方式</h5>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label>网址：</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="请输入网址"
                            v-model="webURL"
                        >
                    </div>
                    <div class="form-group">
                        <label>名称：</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="请输入网站名称"
                            v-model="webName"
                        >
                    </div>
                    <div class="form-group">
                        <label>分组：</label>
                        <select
                            class="form-control"
                            name=''
                            id=''
                        >
                            <option
                                v-for="(item, index) in myTabGroups.tabs"
                                :key="index"
                            >{{ item.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-12">
                    <label>预览：</label>
                    <div class="d-flex c-logo-setting">
                        <div
                            class="col-4"
                            v-if="webLogo"
                        >
                            <div
                                :class="{ active: checkedIndex === 0 }"
                                @click="togglePrevWay(0)"
                                :style="`background:${webLogoBgColor};`"
                            >
                                <img :src="webLogo" />
                            </div>
                            <p>官方</p>
                        </div>
                        <div class="col-4">
                            <div
                                :class="{ active: checkedIndex === 1 }"
                                @click="togglePrevWay(1)"
                                :style="`background:${webLogoBgColor};`"
                            >
                                {{ webLogoTxt }}
                            </div>
                            <p>文字</p>
                        </div>
                        <div class="col-4">
                            <div style="opacity: 0;"></div>
                            <!-- <p>上传</p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer d-flex">
            <button
                type="button"
                class="btn btn-cancel"
                data-dismiss="modal"
            >取消</button>
            <button
                type="button"
                class="btn btn-sure"
                @click="handleBtnAddTagClick()"
            >添加</button>
        </div>

        <!-- 添加快捷方式 弹框 end -->
    </div>
</template>

<script>
import initTabGroups from "../../assets/json/initTabGroups.json";
import myTabGroupList from "../../assets/js/myTabGroupList.js";
// import $ from "jquery";

export default {
    name: 'app',
    data() {
        return {
            myTabGroups: null, // 我的标签分组
            webURL: '', // 网址
            webName: '', // 网站名称
            webLogo: ''||require('../../assets/images/logo_128.png'), // 网址logo
            checkedIndex: 0, // 当前选择的标签logo预览方式--0:文字；1:官方logo；2:自定义上传图片
            webLogoTxt: 'A', // 标签logo预览方式-文字
            webLogoBgColor: '#fff', // // 标签logo背景色
        }
    },
    created() {
        // 首次进入应用，使用初始化标签数据
        if (localStorage.getObject('myTabGroupList') == null) {
            localStorage.setObject('myTabGroupList', initTabGroups);
            this.myTabGroups = initTabGroups;
        } else {
            this.updateMyTabGroupList(); // 刷新我的标签分组
        }

    },
    methods: {
        // 刷新我的标签分组
        updateMyTabGroupList() {
            let result = myTabGroupList.showMyTabGroupList();
            this.myTabGroups = result;
        },
        // 切换标签logo预览方式 激活样式
        togglePrevWay(index) {
            this.checkedIndex = index;
            this.changeWebLogoTxtCss();
        },
        // 改变logo预览方式样式
        changeWebLogoTxtCss() {
            if (this.checkedIndex === 0) {
                // logo预览方式为文字
                if (this.webName !== '') {
                    this.webLogoTxt = this.webName.substr(0, 2);
                } else {
                    this.webLogoTxt = 'A';
                }
            } else {
                this.webLogoTxt = 'A';
            }
        },
    }
}
</script>

<style>
.main_app {
    background: #fff;
    height: 100%;
}

.c-logo-setting > div {
    padding: 10px !important;
}

.c-logo-setting > div > div {
    width: 70px !important;
    height: 70px !important;
    background-color: #ebebeb;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    font-size: 24px;
}

.modal-footer button {
    width: 100px !important;
}
</style>
