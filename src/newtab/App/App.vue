<template>
    <div class="main_app h-100">
        <div class="row h-100">
            <div class="col-1 c-nav-pills p-0 text-center">

                <div
                    class="nav flex-column nav-pills"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <a class="nav-link">
                        <img
                            class="tab-logo"
                            src="../../assets/images/logo_128.png"
                            alt="logo"
                        >
                    </a>
                    <a
                        class="nav-link"
                        :class="index===0?'active':''"
                        :id="'v-pills-tab-'+item.id"
                        data-toggle="pill"
                        :href="'#v-pills-'+item.id"
                        role="tab"
                        :aria-controls="'v-pill-tab-'+item.id"
                        :aria-selected="index===0?true:false"
                        v-for="(item,index) in myTabGroups.tabs"
                        :key="index"
                    >{{item.name}}</a>
                    <a
                        class="nav-link"
                        data-toggle="modal"
                        data-target="#exampleModal"
                    >
                        <img
                            class="icon-add"
                            src="../../assets/images/icon_add.svg"
                            alt="add"
                        >
                    </a>
                </div>
            </div>
            <div class="col-11">
                <div
                    class="tab-content text-center h-100"
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
                        >
                        <div class="input-group-append">
                            <span class="input-group-text">
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
                        >
                        <div class="input-group-append">
                            <span class="input-group-text">
                                <img
                                    src="../../assets/images/icon_search.svg"
                                    alt="search"
                                >
                            </span>
                        </div>
                    </div>

                    <div
                        class="tab-pane fade mt-5"
                        :class="[{'show':index===0},{'active':index===0}]"
                        :id="'v-pills-'+item.id"
                        role="tabpanel"
                        v-for="(item,index) in myTabGroups.tabs"
                        :key="index"
                    >{{item.name}}</div>
                </div>
            </div>
        </div>

        <div
            class="modal fade add-group-modal"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
        >
            <div class="modal-dialog modal-sm modal-dialog-centered">
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
                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="请输入名称"
                                v-model="groupName"
                            >
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel w-100"
                            data-dismiss="modal"
                        >取消</button>
                        <button
                            type="button"
                            class="btn btn-sure w-100"
                            @click="handleBtnSureClick"
                        >添加</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myTabGroups from '../../assets/json/myTabGroups.json';

export default {
    name: 'app',
    data() {
        return {
            myTabGroups: myTabGroups, // 我的标签分组
            groupName: '', // 分组名称
            baiduKeyword: '', // 百度搜索关键词
            googleKeyword: '', // 谷歌搜索关键词
        }
    },
    methods: {
        handleBtnSureClick() {

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
