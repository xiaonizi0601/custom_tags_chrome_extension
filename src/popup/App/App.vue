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
                </div>
                <div class="col-12">
                    <label>预览：</label>
                    <div class="d-flex c-logo-setting">
                        <div class="col-4">
                            <div></div>
                            <p>官方</p>
                        </div>
                        <div class="col-4">
                            <div>A</div>
                            <p>文字</p>
                        </div>
                        <div class="col-4">
                            <div></div>
                            <p>上传</p>
                        </div>
                    </div>
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

        <!-- 添加快捷方式 弹框 end -->
    </div>
</template>

<script>
export default {
    name: 'app',
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
</style>
