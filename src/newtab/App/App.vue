<template>
    <div class="main_app h-100">
        <div class="row h-100">
            <div class="col-1 c-nav-pills p-0 text-center">

                <div
                    class="nav flex-column nav-pills outer-container"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <div class="c-logo">
                        <div
                            class="c-direction-arrow"
                            @mouseenter="handleEnterUpArrow()"
                        ><img src="../../assets/images/icon_direction_arrow.svg"></div>
                        <a class="nav-link">
                            <img
                                class="tab-logo"
                                src="../../assets/images/logo_128.png"
                                alt="logo"
                            >
                        </a>
                    </div>
                    <div class="inner-container">
                        <a
                            class="nav-link"
                            :class="index===0?'active':''"
                            :id="'v-pills-tab-'+index"
                            data-toggle="pill"
                            :href="'#v-pills-'+index"
                            role="tab"
                            :aria-controls="'v-pill-tab-'+index"
                            :aria-selected="index===0?true:false"
                            v-for="(item,index) in myTabGroups.tabs"
                            :key="index"
                        >{{item.name}}</a>
                        <a
                            class="nav-link c-add"
                            data-toggle="modal"
                            data-target="#addGroupModal"
                        >
                            <img
                                class="icon-add"
                                src="../../assets/images/icon_add.svg"
                                alt="add"
                            >
                        </a>
                    </div>
                    <div class="c-setting">
                        <div
                            class="c-direction-arrow"
                            @mouseenter="handleEnterDownArrow()"
                        ><img src="../../assets/images/icon_direction_arrow.svg"></div>
                        <a
                            class="nav-link"
                            data-toggle="modal"
                            data-target="#settingModal"
                        >
                            <img
                                class="icon-setting"
                                src="../../assets/images/icon_setting.svg"
                                alt="setting"
                            >
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-11">
                <div
                    class="tab-content text-center"
                    id="v-pills-tabContent"
                >
                    <div class="input-group mb-3 mt-5 col-6">
                        <div class="input-group-prepend">
                            <span class="input-group-text text-center">
                                <img
                                    src="../../assets/images/baidu.svg"
                                    alt="baidu"
                                >
                            </span>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="搜索"
                            v-model="baiduKeyword"
                            @keyup.enter="handleBaiduSearchClick()"
                        >
                        <div class="input-group-append">
                            <span
                                class="input-group-text"
                                @click="handleBaiduSearchClick()"
                            >
                                <img
                                    src="../../assets/images/icon_search.svg"
                                    alt="search"
                                >
                            </span>
                        </div>
                    </div>

                    <div class="input-group mb-3 col-6">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <img
                                    src="../../assets/images/google.svg"
                                    alt="google"
                                >
                            </span>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="搜索"
                            v-model="googleKeyword"
                            @keyup.enter="handleGoogleSearchClick()"
                        >
                        <div class="input-group-append">
                            <span
                                class="input-group-text"
                                @click="handleGoogleSearchClick()"
                            >
                                <img
                                    src="../../assets/images/icon_search.svg"
                                    alt="search"
                                >
                            </span>
                        </div>
                    </div>

                    <div
                        class="tab-pane fade mt-5 px-5"
                        :class="[{'show':index===0},{'active':index===0}]"
                        :id="'v-pills-'+index"
                        role="tabpanel"
                        v-for="(item,index) in myTabGroups.tabs"
                        :key="index"
                    >

                        <div class="row">
                            <a
                                v-for="(tag,index) in item.tags"
                                :key="index"
                                :href="tag.url"
                                class="col-2 c-tag"
                            >
                                <div class="tag-logo">
                                    <img :src="require(`../../assets/images/tagLogo/${tag.logo}`)">
                                </div>
                                <p class="tag-name mt-3">{{tag.name}}</p>
                            </a>
                            <a
                                class="col-2 c-tag"
                                data-toggle="modal"
                                data-target="#addTagModal"
                            >
                                <div class="tag-logo">
                                    <img src="../../assets/images/icon_add_black.svg">
                                </div>
                                <p class="tag-name mt-3">添加快捷方式</p>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- 添加分组 弹框 start -->
        <div
            class="modal fade add-group-modal"
            id="addGroupModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">添加分组</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group mb-0">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="请输入名称"
                                v-model="groupName"
                            >
                            <div
                                class="err-msg"
                                v-if="isShowGroupNameErr"
                            >* 名称不能为空</div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >取消</button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleBtnAddGroupClick()"
                        >添加</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加分组 弹框 end -->

        <!-- 设置 弹框 start -->
        <div
            class="modal fade"
            id="settingModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
        >
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">设置</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>备份我的标签：</p>
                        <button
                            class="backup-button"
                            @click="$Common.backupMySettings()"
                        >导出到本地文件</button>

                        <p class="mt-4">从备份恢复：</p>
                        <label
                            class="upload-button"
                            for="my-file-selector"
                        >
                            <input
                                id="my-file-selector"
                                type="file"
                                style="display:none;"
                                @change="$Common.importMySettings($event)"
                            >从本地文件导入
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 设置 弹框 end -->

        <!-- 添加快捷方式 弹框 start -->
        <div
            class="modal fade add-tag-modal"
            id="addTagModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
        >
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">添加快捷方式</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="请输入网址"
                                        v-model="webAddress"
                                    >
                                </div>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="请输入网站名称"
                                        v-model="webName"
                                    >
                                </div>
                            </div>
                            <div class="col-6">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
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
                </div>
            </div>
        </div>
        <!-- 添加快捷方式 弹框 end -->
    </div>
</template>

<script>
import initTabGroups from '../../assets/json/initTabGroups.json';
import myTabGroupList from "../../assets/js/myTabGroupList.js";
import $ from "jquery";

export default {
    name: 'app',
    data() {
        return {
            myTabGroups: null, // 我的标签分组
            groupName: '', // 分组名称
            isShowGroupNameErr: false, // 是否显示分组名称错误信息
            baiduKeyword: '', // 百度搜索关键词
            googleKeyword: '', // 谷歌搜索关键词
            webAddress: '', // 网址
            webName: '', // 网站名称
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

        // localStorage.clear(); // 删除所有缓存数据 test 
        console.info('created=======', localStorage);
    },
    mounted() {
        this.handleDirectionArrow();
    },
    methods: {
        // 刷新我的标签分组
        updateMyTabGroupList() {
            let result = myTabGroupList.showMyTabGroupList();
            this.myTabGroups = result;
            // console.info('result:', result);
        },

        // 添加分组弹框-'添加'按钮点击事件处理
        handleBtnAddGroupClick() {
            let groupName = this.groupName;
            if (groupName.length === 0) {
                this.isShowGroupNameErr = true;
                return;
            } else {
                this.isShowGroupNameErr = false;
                myTabGroupList.addTabGroup(groupName); // 添加分组

                this.updateMyTabGroupList(); // 刷新我的标签分组

                $('#addGroupModal').modal('hide'); // 关闭弹框
            }
        },

        // 添加快捷方式弹框-'添加'按钮点击事件处理
        handleBtnAddTagClick() { },

        // 百度-'搜索'按钮点击事件处理
        handleBaiduSearchClick() {
            let baiduKeyword = this.baiduKeyword;
            window.location.replace(`https://www.baidu.com/s?ie=utf-8&wd=${baiduKeyword}`);
        },

        // 谷歌-'搜索'按钮点击事件处理
        handleGoogleSearchClick() {
            let googleKeyword = this.googleKeyword;
            window.location.replace(`https://www.google.com/search?ie=utf-8&q=${googleKeyword}`);
        },

        // 判断是否有纵轴滚动条
        hasScrolled(element) {
            return element.scrollHeight > element.clientHeight;
        },

        // 处理左侧分组菜单方向箭头是否显示
        handleDirectionArrow() {
            let element = $('.inner-container')[0];
            let hasScrolled = this.hasScrolled(element);
            if (hasScrolled) { // 有滚动条
                // 显示可滚动箭头
                $('.c-direction-arrow').show();
            } else {
                $('.c-direction-arrow').hide();
            }
        },

        // 上箭头鼠标进入
        handleEnterUpArrow() {
            $('.inner-container').animate({ scrollTop: 0 }, 2000); // 滚动到顶部
        },

        // 下箭头鼠标进入
        handleEnterDownArrow() {
            let h = $('.inner-container').height();
            $('.inner-container').animate({ scrollTop: h }, 2000); // 滚动到底部
        }

    }

}
</script>

<style>
.input-group {
    margin: 0 auto;
}

.input-group-text img {
    width: 20px;
    margin: 0 auto;
}

.input-group-append {
    cursor: pointer;
}
</style>
