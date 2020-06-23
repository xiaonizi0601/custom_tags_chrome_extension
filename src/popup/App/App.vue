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
                        <div
                            class="err-msg"
                            v-if="isShowTagURLErr"
                        >
                            * 网址不能为空
                        </div>
                    </div>
                    <div class="form-group">
                        <label>名称：</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="请输入网站名称"
                            v-model="webName"
                            @input="handleWebNameInput()"
                        >
                        <div
                            class="err-msg"
                            v-if="isShowTagNameErr"
                        >
                            * 名称不能为空
                        </div>
                    </div>
                    <div class="form-group">
                        <label>分组：</label>
                        <select
                            class="form-control"
                            name=''
                            id=''
                            @change="handleGroupChange(operateGroupIndex)"
                            v-model="operateGroupIndex"
                        >
                            <option
                                v-for="(item, index) in myTabGroups.tabs"
                                :key="index"
                                :value="index"
                            >{{ item.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-12">
                    <label>预览：</label>
                    <div class="d-flex c-logo-setting">
                        <div class="col-4">
                            <div
                                :class="{ active: checkedIndex === 1 }"
                                @click="togglePrevWay(1)"
                                :style="`background:${webLogoBgColor};`"
                            >
                                <img
                                    :src="webLogo"
                                    class="w-50"
                                    v-if="webLogo"
                                />
                                <img
                                    src="../../assets/images/logo_48.png"
                                    v-else
                                >
                            </div>
                            <p>{{tips}}</p>
                        </div>
                        <div class="col-4">
                            <div
                                :class="{ active: checkedIndex === 0 }"
                                @click="togglePrevWay(0)"
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

                <div class="col-12 bg-color-box">
                    <label class="ml-3">背景颜色：</label>
                    <div
                        class="d-flex c-logo-bgcolor ml-3"
                        @click="selectBgColor"
                    >
                        <div
                            :data-index="0"
                            :class="{active:webLogoBgColor === '#FFFFFF'}"
                        ></div>
                        <div
                            :data-index="1"
                            :class="{active:webLogoBgColor === '#04AE92'}"
                        ></div>
                        <div
                            :data-index="2"
                            :class="{active:webLogoBgColor === '#EE3B3B'}"
                        ></div>
                        <div
                            :data-index="3"
                            :class="{active:webLogoBgColor === '#FCB138'}"
                        ></div>
                        <div
                            :data-index="4"
                            :class="{active:webLogoBgColor === '#85D724'}"
                        ></div>
                        <div
                            :data-index="5"
                            :class="{active:webLogoBgColor === '#16D9C4'}"
                        ></div>
                        <div
                            :data-index="6"
                            :class="{active:webLogoBgColor === '#276CE6'}"
                        ></div>
                        <div
                            :data-index="7"
                            :class="{active:webLogoBgColor === '#00AEFD'}"
                        ></div>
                        <div
                            :data-index="8"
                            :class="{active:webLogoBgColor === '#444444'}"
                        ></div>
                        <div
                            :data-index="9"
                            :class="{active:webLogoBgColor === 'transparent'}"
                        ></div>
                    </div>
                    <div class="form-group px-3 pt-3 pb-0 m-0">
                        <input
                            type="text"
                            class="form-control"
                            v-model="webLogoBgColor"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer d-flex">
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
import $ from "jquery";

export default {
    name: 'app',
    data() {
        return {
            myTabGroups: null, // 我的标签分组
            operateGroupIndex: 0, // 当前选中的分组索引
            webURL: '', // 网址
            webName: '', // 网站名称
            webLogo: '', // 网址logo
            isShowTagURLErr: false, // 是否显示快捷方式网址错误信息
            isShowTagNameErr: false, // 是否显示快捷方式名称错误信息
            checkedIndex: 1, // 当前选择的标签logo预览方式--0:文字；1:官方logo；2:自定义上传图片
            webLogoTxt: 'A', // 标签logo预览方式-文字
            webLogoBgColor: '#FFFFFF', // 标签logo背景色
            tips: '官方' // logo预览提示
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
    mounted() {
        let $this = this;
        // 获取当前页面的url和title
        chrome.tabs.getSelected(null, function (tab) {
            console.log(tab);
            $this.webURL = tab.url;
            $this.webName = tab.title;
            $this.webLogo = tab.favIconUrl;
            if (!tab.favIconUrl) {
                $this.tips = '未找到';
                $this.togglePrevWay(0);
            } else {
                $this.tips = '官方';
                $this.togglePrevWay(1);

            }
        });
    },
    methods: {
        // 刷新我的标签分组
        updateMyTabGroupList() {
            let result = myTabGroupList.showMyTabGroupList();
            this.myTabGroups = result;
            console.info(result);
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

        // 名称输入事件
        handleWebNameInput() {
            this.changeWebLogoTxtCss();
        },

        // 选择分组
        handleGroupChange(value) {
            console.info(value);
        },
        // 选择背景颜色
        selectBgColor(e) {
            if (e.target.nodeName.toLowerCase() === 'div') {
                let index = parseInt(e.target.dataset.index);
                if (!isNaN(index)) {
                    let currentColor = $(e.target).css('background-color');
                    if (currentColor === 'rgba(0, 0, 0, 0)') {
                        this.webLogoBgColor = 'transparent';
                    } else {
                        this.webLogoBgColor = this.RGBtoHEX(currentColor);
                    }
                    // this.checkedIndex = 0;
                }
            }
        },

        //将rgb()格式颜色转换成大写十六机制字符串（#C0C0C0），如果已经是十六进制则直接输出
        RGBtoHEX(str) {
            if (str.substring(0, 3) == 'rgb') {
                var arr = str.split(',');
                var r = arr[0].replace('rgb(', '').trim(),
                    g = arr[1].trim(),
                    b = arr[2].replace(')', '').trim();
                var hex = [this.toHex(r), this.toHex(g), this.toHex(b)];
                return '#' + hex.join('');
            } else {
                return str;
            }
        },

        //将十进制数字转换成两位十六进制字符串
        toHex(N) {
            if (N == null) return '00';
            N = parseInt(N);
            if (N == 0 || isNaN(N)) return '00';
            N = Math.max(0, N);
            N = Math.min(N, 255);
            N = Math.round(N);
            return (
                '0123456789ABCDEF'.charAt((N - (N % 16)) / 16) +
                '0123456789ABCDEF'.charAt(N % 16)
            );
        },
        // 弹框-'添加'按钮点击事件处理
        handleBtnAddTagClick() {
            let operateGroupIndex = this.operateGroupIndex;
            let webLogo = this.webLogo;
            let webName = this.webName;
            let webURL = this.webURL;

            let webLogoTxt = this.webLogoTxt;
            let logoPrevIndex = this.checkedIndex;
            let webLogoBgColor = this.webLogoBgColor;

            if (webURL === '') {
                this.isShowTagURLErr = true;
                return;
            } else {
                this.isShowTagURLErr = false;
            }

            if (webName === '') {
                this.isShowTagNameErr = true;
                return;
            } else {
                this.isShowTagNameErr = false;
            }

            myTabGroupList.addTag(
                operateGroupIndex,
                webLogo,
                webLogoTxt,
                logoPrevIndex,
                webLogoBgColor,
                webName,
                webURL
            ); // 添加标签
            this.updateMyTabGroupList(); // 刷新我的标签分组

            window.close(); // 关闭popup

            // chrome.tabs.getSelected(null, function (tab) {
            //     console.log(tab);
            //     document.UR = tab.url;
            // });

        },
    }
}
</script>

<style>
.main_app {
    background: #ebebeb;
    height: 100%;
}

.c-logo-setting > div {
    padding: 10px !important;
}

.c-logo-setting > div > div {
    width: 70px !important;
    height: 70px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    font-size: 24px;
}

.modal-footer button {
    width: 100% !important;
}
</style>
