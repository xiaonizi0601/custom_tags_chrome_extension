<template>
    <div class="main-app c-popup">
        <!-- 添加快捷方式 弹框 start -->
        <div class="modal-header">
            <h5 class="modal-title w-100 text-center">{{$t("_ADD_SHORTCUT")}}</h5>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label>{{$t("_URL")}}</label>
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('_PLEASE_ENTER_URL')"
                            v-model="webURL"
                        >
                        <div
                            class="err-msg"
                            v-if="isShowTagURLErr"
                        >
                            * {{$t("_URL_CANNOT_BE_EMPTY")}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>{{$t("_NAME")}}</label>
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('_PLEASE_ENTER_NAME')"
                            v-model="webName"
                            @input="handleWebNameInput()"
                        >
                        <div
                            class="err-msg"
                            v-if="isShowTagNameErr"
                        >
                            * {{$t("_NAME_IS_REQUIRED")}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>{{$t("_GROUP")}}</label>
                        <select
                            class="form-control"
                            name=''
                            id=''
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
                    <label>{{$t("_PREVIEW")}}</label>
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
                            <p>{{$t("_TEXT")}}</p>
                        </div>
                        
                    </div>
                </div>

                <div class="col-12 bg-color-box">
                    <label class="ml-3">{{$t("_BACKGROUND_COLOR")}}</label>
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
                    <div class="form-group px-3 pt-2 pb-1 m-0">
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
            >{{$t("_ADD")}}</button>
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
    data () {
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
            tips: this.$t('_OFFICIAL') // logo预览提示
        }
    },
    created () {
        // 首次进入应用，使用初始化标签数据
        if (localStorage.getObject('myTabGroupList') == null) {
            localStorage.setObject('myTabGroupList', initTabGroups);
            this.myTabGroups = initTabGroups;
        } else {
            this.updateMyTabGroupList(); // 刷新我的标签分组
        }
    },
    mounted () {
        let $this = this;
        // 获取当前页面的url和title
        chrome.tabs.getSelected(null, function (tab) {
            // console.log(tab);
            $this.webURL = tab.url;
            $this.webName = tab.title;
            $this.webLogo = tab.favIconUrl;
            if (!tab.favIconUrl) {
                $this.tips = $this.$t("_NOT_FOUND");
                $this.togglePrevWay(0);
            } else {
                $this.tips = $this.$t("_OFFICIAL");
                $this.togglePrevWay(1);

            }
        });
    },
    methods: {
        // 刷新我的标签分组
        updateMyTabGroupList () {
            let result = myTabGroupList.showMyTabGroupList();
            this.myTabGroups = result;
            // console.info(result);
        },

        // 切换标签logo预览方式 激活样式
        togglePrevWay (index) {
            this.checkedIndex = index;
            this.changeWebLogoTxtCss();
        },

        // 改变logo预览方式样式
        changeWebLogoTxtCss () {
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
        handleWebNameInput () {
            this.changeWebLogoTxtCss();
        },

        // 选择背景颜色
        selectBgColor (e) {
            if (e.target.nodeName.toLowerCase() === 'div') {
                let index = parseInt(e.target.dataset.index);
                if (!isNaN(index)) {
                    // let currentColor = $(e.target).css('background-color'); // 可以获取到样式值
                    // let currentColor = e.target.style.backgroundColor; // 获取不到样式值
                    let currentColor = window.getComputedStyle(e.target, null).backgroundColor; // 注意：如果样式是通过css设置的，获取css属性值必须使用window.getComputedStyle，不能使用e.target.style
                    if (currentColor === 'rgba(0, 0, 0, 0)') {
                        this.webLogoBgColor = 'transparent';
                    } else {
                        this.webLogoBgColor = this.$Common.RGBtoHEX(currentColor);
                    }
                }
            }
        },

        // 弹框-'添加'按钮点击事件处理
        handleBtnAddTagClick () {
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
.main-app {
    /* background: #ebebeb; */
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
