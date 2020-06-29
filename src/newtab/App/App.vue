<template>
    <div
        class="main_app h-100"
        @click="hideperationGroupMenu()"
    >

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
                        >
                            <img src="../../assets/images/icon_direction_arrow.svg" />
                        </div>
                        <a class="nav-link">
                            <img
                                class="tab-logo"
                                src="../../assets/images/logo_128.png"
                                alt="logo"
                            />
                        </a>
                    </div>
                    <div
                        class="inner-container"
                        ref="innerContainer"
                        @mousewheel="scroll()"
                    >
                        <!-- 标签分组拖拽排序 -->
                        <draggable
                            class="draggable-list-group"
                            tag="ul"
                            v-model="myTabGroups.tabs"
                            v-bind="groupDragOptions"
                            @update="dataDragEnd"
                            @mouseleave="hideperationGroupMenu"
                        >
                            <transition-group
                                type="transition"
                                name="flip-list"
                            >
                                <li
                                    class="nav-link draggable-list-group-item"
                                    :class="{ active: activeIndex == index }"
                                    data-toggle="pill"
                                    :href="'#v-pills-' + index"
                                    role="tab"
                                    :aria-selected="activeIndex == index ? true : false"
                                    v-for="(item, index) in myTabGroups.tabs"
                                    :key="index"
                                    @contextmenu.prevent="handleRightClickGroup(index)"
                                    @click="active(index)"
                                >
                                    <div class="group-name">{{ item.name }}</div>
                                    <div
                                        class="operation-menu"
                                        v-show="currentGroupIndex == index"
                                        @mouseleave="hideperationGroupMenu"
                                    >
                                        <div @click="handleEditTabGroup(item.name)">{{$t('_EDIT')}}</div>
                                        <div @click="handleDeleteTabGroup()">{{$t("_REMOVE")}}</div>
                                    </div>
                                </li>
                            </transition-group>
                        </draggable>
                        <a
                            class="nav-link c-add"
                            data-toggle="modal"
                            @click="showAddGroupModal"
                        >
                            <img
                                class="icon-add"
                                src="../../assets/images/icon_add.svg"
                                alt="add"
                            />
                        </a>
                    </div>
                    <div class="c-setting">
                        <div
                            class="c-direction-arrow"
                            @mouseenter="handleEnterDownArrow()"
                        >
                            <img src="../../assets/images/icon_direction_arrow.svg" />
                        </div>
                        <a
                            class="nav-link"
                            data-toggle="modal"
                            data-target="#settingModal"
                        >
                            <img
                                class="icon-setting"
                                src="../../assets/images/icon_setting.svg"
                                alt="setting"
                            />
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
                                />
                            </span>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('_SEARCH')"
                            v-model="baiduKeyword"
                            @keyup.enter="handleBaiduSearchClick()"
                            ref="inputs"
                        />
                        <div class="input-group-append">
                            <span
                                class="input-group-text"
                                @click="handleBaiduSearchClick()"
                            >
                                <img
                                    src="../../assets/images/icon_search.svg"
                                    alt="search"
                                />
                            </span>
                        </div>
                    </div>

                    <div class="input-group mb-3 col-6">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <img
                                    src="../../assets/images/google.svg"
                                    alt="google"
                                />
                            </span>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('_SEARCH')"
                            v-model="googleKeyword"
                            @keyup.enter="handleGoogleSearchClick()"
                        />
                        <div class="input-group-append">
                            <span
                                class="input-group-text"
                                @click="handleGoogleSearchClick()"
                            >
                                <img
                                    src="../../assets/images/icon_search.svg"
                                    alt="search"
                                />
                            </span>
                        </div>
                    </div>

                    <div
                        class="tab-pane fade mt-5 px-5"
                        :class="[{ show: activeIndex == index },{ active: activeIndex == index },]"
                        :id="'v-pills-' + index"
                        role="tabpanel"
                        v-for="(item, index) in myTabGroups.tabs"
                        :key="index"
                    >
                        <!-- 标签/快捷方式 拖拽排序 group="a"-->
                        <draggable
                            class="row"
                            v-model="item.tags"
                            v-bind="tagDragOptions"
                            @update="dataDragEnd"
                            :move="dataDragMove"
                            group="a"
                        >
                            <div
                                class="col-2 tag-box"
                                v-for="(tag, idx) in item.tags"
                                :key="idx"
                                @contextmenu.prevent="handleRightClickTag(idx,$event)"
                                @mouseleave="hideperationTagMenu"
                            >
                                <div class="c-cover">
                                <a
                                    class="c-tag"
                                    :href="tag.url"
                                >
                                    <div
                                        class="c-dot"
                                        @mouseover="handleRightClickTag(idx,$event)"
                                    >···</div>
                                    <div
                                        class="tag-logo d-flex justify-content-center align-items-center"
                                        :style="`background:${tag.logoBgColor};`"
                                    >
                                        <span v-if="tag.logoPrevIndex === 0">{{tag.logoTxt}}</span>
                                        <div v-if="tag.logoPrevIndex === 1">
                                            <div v-if="tag.logo">
                                                <img
                                                    :src="tag.logo"
                                                    v-if="tag.logo.includes('http')"
                                                />
                                                <img
                                                    :src="require(`../../assets/images/tagLogo/${tag.logo}`)"
                                                    v-else
                                                />
                                            </div>

                                            <img
                                                src="../../assets/images/logo_48.png"
                                                v-else
                                            >
                                        </div>

                                        <!-- <div v-if="tag.logoPrevIndex === 2">
                                            <img
                                                :src="require(`../../assets/images/tagLogo/upload/${tag.logo}`)"
                                                v-if="tag.logo"
                                            />
                                            </div> -->
                                    </div>
                                    <p class="tag-name mt-3">{{ tag.name }}</p>
                                </a>
                                <div
                                    class="operation-menu tag-operation-menu"
                                    v-show="currentTagIndex == idx"
                                    @mouseleave="hideperationTagMenu"
                                >
                                    <div @click.stop="handleEditTag(index,tag.logo,tag.logoPrevIndex,tag.logoTxt,tag.logoBgColor,tag.name,tag.url)">
                                        {{$t('_EDIT')}}
                                    </div>
                                    <div @click="handleDeleteTag()">{{$t("_REMOVE")}}</div>
                                </div>
                                </div>
                            </div>
                            <a
                                class="col-2 c-tag undraggable"
                                data-toggle="modal"
                                data-target="#addTagModal"
                                @click="handleAddTag(index)"
                            >
                                <div class="tag-logo">
                                    <img
                                        src="../../assets/images/icon_add_black.svg"
                                        class="icon-add-tag"
                                    />
                                </div>
                                <p class="tag-name mt-3">{{$t("_ADD_SHORTCUT")}}</p>
                            </a>
                        </draggable>

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
                        <h5 class="modal-title">{{$t("_ADD_GROUP")}}</h5>
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
                                :placeholder="$t('_PLEASE_ENTER_NAME')"
                                v-model="groupName"
                            />
                            <div
                                class="err-msg"
                                v-if="isShowGroupNameErr"
                            >
                                * {{$t("_NAME_IS_REQUIRED")}}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >
                            {{$t("_CANCEL")}}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleBtnAddGroupClick()"
                        >
                            {{$t("_ADD")}}
                        </button>
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
                        <h5 class="modal-title">{{$t("_SET_UP")}}</h5>
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
                        <p>{{$t("_SWITCH_LANGUAGE")}}</p>
                        <button
                            class="common-btn mr-3"
                            :class="{'switch-lang-active':currentLang==='zh-CN'}"
                            @click="switchLanguage('zh-CN')"
                        >
                            简体中文
                        </button>
                        <button
                            class="common-btn"
                            :class="{'switch-lang-active':currentLang==='en'}"
                            @click="switchLanguage('en')"
                        >
                            English
                        </button>

                        <p class="mt-4">{{$t("_THEME")}}</p>
                        <button
                            class="common-btn mr-3"
                            :class="{'switch-theme-active':currentTheme==='theme_1'}"
                            @click="switchTheme('theme_1')"
                        >
                            {{$t('_THEME_TYPE[0]')}}
                        </button>
                        <button
                            class="common-btn"
                            :class="{'switch-theme-active':currentTheme==='theme_2'}"
                            @click="switchTheme('theme_2')"
                        >
                            {{$t('_THEME_TYPE[1]')}}
                        </button>

                        <p class="mt-4">{{$t("_BACK_UP_MY_TAGS")}}</p>
                        <button
                            class="common-btn"
                            @click="$Common.backupMySettings()"
                        >
                            {{$t("_EXPORT_TO_LOCAL_FILE")}}
                        </button>

                        <p class="mt-4">{{$t("_RESTORE_FROM_BACKUP")}}</p>
                        <label
                            class="common-btn"
                            for="my-file-selector"
                        >
                            <input
                                id="my-file-selector"
                                type="file"
                                style="display:none;"
                                @change="$Common.importMySettings($event)"
                            />{{$t("_IMPORT_FROM_LOCAL_FILE")}}
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >
                            {{$t("_CLOSE")}}
                        </button>
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
                        <h5 class="modal-title">{{$t("_ADD_SHORTCUT")}}</h5>
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
                                <div class="base-setting-box px-3 h-100">
                                    <div class="form-group">
                                        <label>{{$t("_URL")}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :placeholder="$t('_PLEASE_ENTER_URL')"
                                            v-model="webURL"
                                        />
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
                                        />
                                        <div
                                            class="err-msg"
                                            v-if="isShowTagNameErr"
                                        >
                                            * {{$t("_NAME_IS_REQUIRED")}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="logo-setting-box">
                                    <label class="ml-3">{{$t("_PREVIEW")}}</label>
                                    <div class="d-flex c-logo-setting">
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
                                        <div class="col-4">
                                            <!-- 图片上传 start -->
                                            <!-- <div
                                                class="c-upload-image"
                                                :class="{ active: checkedIndex === 2 }"
                                                @click="togglePrevWay(2)"
                                            >
                                                <input
                                                    id="uploadImg"
                                                    type="file"
                                                    name="img"
                                                    accept="image/*"
                                                    @change="uploadImg($event,this.file)"
                                                    style="display:none"
                                                />
                                                <div
                                                    class="icon-upload"
                                                    id="showImg"
                                                >
                                                    <img
                                                        src="../../assets/images/icon_upload.jpg"
                                                        v-if="!webLogo"
                                                    >
                                                </div>
                                            </div> -->
                                            <!-- 图片上传 end -->

                                            <!-- <p>上传</p> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-color-box mt-3">
                                    <label class="ml-3">{{$t("_BACKGROUND_COLOR")}}</label>
                                    <div
                                        class="d-flex c-logo-bgcolor ml-3"
                                        @click="selectBgColor"
                                    >
                                        <div :data-index="0"></div>
                                        <div :data-index="1"></div>
                                        <div :data-index="2"></div>
                                        <div :data-index="3"></div>
                                        <div :data-index="4"></div>
                                        <div :data-index="5"></div>
                                        <div :data-index="6"></div>
                                        <div :data-index="7"></div>
                                        <div :data-index="8"></div>
                                        <div :data-index="9"></div>
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
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >
                            {{$t("_CANCEL")}}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleBtnAddTagClick()"
                        >
                            {{$t("_ADD")}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加快捷方式 弹框 end -->

        <!-- 编辑快捷方式 弹框 start -->
        <div
            class="modal fade edit-tag-modal"
            id="editTagModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
        >
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{$t("_EDIT_SHORTCUT")}}</h5>
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
                                <div class="base-setting-box px-3 h-100">
                                    <div class="form-group">
                                        <label>{{$t("_URL")}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :placeholder="$t('_PLEASE_ENTER_URL')"
                                            v-model="webURL"
                                        />
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
                                        />
                                        <div
                                            class="err-msg"
                                            v-if="isShowTagNameErr"
                                        >
                                            * {{$t("_NAME_IS_REQUIRED")}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="logo-setting-box">
                                    <label class="ml-3">{{$t("_PREVIEW")}}</label>
                                    <div class="d-flex c-logo-setting">
                                        <div class="col-4">
                                            <div
                                                :class="{ active: checkedIndex === 1 }"
                                                @click="togglePrevWay(1)"
                                                :style="checkedIndex === 1&&`background:${webLogoBgColor};`"
                                            >
                                                <div v-if="webLogo">
                                                    <img
                                                        :src="webLogo"
                                                        v-if="webLogo.includes('http')"
                                                    />
                                                    <img
                                                        :src="require(`../../assets/images/tagLogo/${webLogo}`)"
                                                        v-else
                                                    />
                                                </div>
                                                <img
                                                    src="../../assets/images/logo_48.png"
                                                    v-else
                                                >
                                            </div>
                                            <p v-if="webLogo">{{$t("_OFFICIAL")}}</p>
                                            <p v-else>{{$t("_NOT_FOUND")}}</p>
                                        </div>
                                        <div class="col-4">
                                            <div
                                                :class="{ active: checkedIndex === 0 }"
                                                @click="togglePrevWay(0)"
                                                :style="checkedIndex === 0&&`background:${webLogoBgColor};`"
                                            >
                                                {{ webLogoTxt }}
                                            </div>
                                            <p>{{$t("_TEXT")}}</p>
                                        </div>
                                        <div class="col-4">
                                            <!-- 图片上传 start -->
                                            <!-- <div
                                            class="c-upload-image"
                                            :class="{ active: checkedIndex === 2 }"
                                            @click="togglePrevWay(2)"
                                        >
                                            <input
                                                id="uploadImg"
                                                type="file"
                                                name="img"
                                                accept="image/*"
                                                @change="uploadImg($event)"
                                                style="display:none"
                                            />
                                            <div class="icon-upload">
                                                <img
                                                    :src="webLogo"
                                                    v-if="webLogo"
                                                >
                                                <img
                                                    src="../../assets/images/icon_upload.jpg"
                                                    v-else
                                                >
                                            </div>
                                        </div> -->
                                            <!-- 图片上传 end -->
                                            <!-- <p>上传</p> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-color-box mt-3">
                                    <label class="ml-3">{{$t("_BACKGROUND_COLOR")}}</label>
                                    <div
                                        class="d-flex c-logo-bgcolor ml-3"
                                        @click="selectBgColor"
                                        :bg="webLogoBgColor"
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
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >
                            {{$t("_CANCEL")}}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleBtnEditTagClick()"
                        >
                            {{$t("_CONFIRM")}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑快捷方式 弹框 end -->

        <!-- 删除快捷方式/标签 确认 弹框 start -->
        <div
            class="modal fade delete-tag-modal"
            id="deleteTagModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{$t("_WARNING")}}</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        {{$t("_WARNING_MESSAGE")}}
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >
                            {{$t("_CANCEL")}}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleSureDeleteTag()"
                        >
                            {{$t("_CONFIRM")}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除快捷方式/标签 确认 弹框 end -->

        <!-- 编辑分组 弹框 start -->
        <div
            class="modal fade edit-group-modal"
            id="editGroupModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{$t("_EDIT_GROUP")}}</h5>
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
                                :placeholder="$t('_PLEASE_ENTER_NAME')"
                                v-model="groupName"
                            />
                            <div
                                class="err-msg"
                                v-if="isShowGroupNameErr"
                            >
                                * {{$t("_NAME_IS_REQUIRED")}}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >
                            {{$t("_CANCEL")}}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleSureEditGroup()"
                        >
                            {{$t("_CONFIRM")}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑分组 弹框 end -->

        <!-- 删除分组确认 弹框 start -->
        <div
            class="modal fade delete-group-modal"
            id="deleteGroupModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{$t("_WARNING")}}</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        {{$t("_WARNING_MESSAGE")}}
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            data-dismiss="modal"
                        >
                            {{$t("_CANCEL")}}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleSureDeleteGroup()"
                        >
                            {{$t("_CONFIRM")}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除分组确认 弹框 end -->
    </div>
</template>

<script>
import initTabGroups from "../../assets/json/initTabGroups.json";
import myTabGroupList from "../../assets/js/myTabGroupList.js";
import $ from "jquery";
import draggable from 'vuedraggable';

export default {
    name: "app",
    display: "Transition",
    data() {
        return {
            currentLang: 'zh-CN', // 当前语言
            currentTheme: localStorage.getObject('theme') || 'theme_1', // 当前主题
            myTabGroups: null, // 我的标签分组
            groupName: '', // 分组名称
            isShowGroupNameErr: false, // 是否显示分组名称错误信息
            baiduKeyword: '', // 百度搜索关键词
            googleKeyword: '', // 谷歌搜索关键词
            webURL: '', // 网址
            webName: '', // 网站名称
            webLogo: '', // 网址logo
            isShowTagURLErr: false, // 是否显示快捷方式网址错误信息
            isShowTagNameErr: false, // 是否显示快捷方式名称错误信息
            innerContainerHeight: 0, // 标签分组容器高度
            timer: false, // 定时器
            currentGroupIndex: null, // 当前右击选中的分组索引，用于控制操作菜单显示与隐藏
            operateGroupIndex: null, // 当前操作（编辑和删除）的分组索引
            activeIndex: 0, // 当前active的分组索引
            currentTagIndex: null, // 当前右击选中的快捷方式标签索引，用于控制操作菜单显示与隐藏
            operateTagIndex: null, // 当前操作（编辑和删除）的快捷方式标签索引
            checkedIndex: 0, // 当前选择的标签logo预览方式--0:文字；1:官方logo；2:自定义上传图片
            webLogoTxt: 'A', // 标签logo预览方式-文字
            webLogoBgColor: '#FFFFFF', // 标签logo背景色
            // config: null, // 图片上传配置信息
            // params: null, // 图片上传的数据参数
        };
    },
    components: { draggable },
    computed: {
        groupDragOptions() { // 分组拖拽参数
            return {
                animation: 0,
                group: "description",
                disabled: false,
                ghostClass: "ghost-group"
            };
        },
        tagDragOptions() { // 标签/快捷方式拖拽参数
            return {
                animation: 0,
                group: "description",
                disabled: false,
                ghostClass: "ghost-tag", // 拖动时样式选择器
                filter: '.undraggable', // 不可拖动的样式选择器
            };
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
        // console.info('created=======', localStorage);

        this.changfocus();
    },
    mounted() {
        // 判断左侧分组菜单方向箭头是否显示
        this.handleDirectionArrow();

        let $this = this;
        // 监听浏览器窗口变化
        window.onresize = () => {
            return (() => {
                $this.innerContainerHeight = $('.inner-container').height(); // 左侧分组菜单高度
            })();
        };

        // 给左侧分组菜单div注册滚动事件
        this.$refs.innerContainer.addEventListener('scroll', this.scroll);

        // 获取本地默认语言
        this.getDefaultLanguage();

    },
    methods: {
        // 百度搜索框自动聚焦
        changfocus() {
            this.$nextTick(() => {
                this.$refs.inputs.focus();
            });
        },
        // 获取本地默认语言
        getDefaultLanguage() {
            let defaultLang = 'zh-CN'; // 默认语言
            const supportLangs = ['zh-CN', 'en']; // 支持的语言
            // console.info('navigator.language=', navigator.language); // navigator.language --获取用户设置的用户首选语言(但是默认的情况下浏览器 UI 的语言一般和用户首选语言是一致的)
            if (supportLangs.indexOf(navigator.language) !== -1) { // 存在用户首选语言
                defaultLang = navigator.language;
            }
            if (supportLangs.indexOf(localStorage.getObject('language')) !== -1) { // 存在本地缓存的语言
                defaultLang = localStorage.getObject('language');
            }

            this.$i18n.locale = defaultLang;
            this.currentLang = defaultLang;
        },

        // 切换语言
        switchLanguage(lang) {
            this.$i18n.locale = lang;
            localStorage.setObject('language', lang);
            this.currentLang = lang;
        },

        // 切换主题
        switchTheme(theme) {
            localStorage.setObject('theme', theme);
            this.currentTheme = theme;
            window.location.reload();

        },

        // 刷新我的标签分组
        updateMyTabGroupList() {
            let result = myTabGroupList.showMyTabGroupList();
            this.myTabGroups = result;
        },

        // 显示 添加分组弹框
        showAddGroupModal() {
            this.groupName = '';
            $('#addGroupModal').modal('show');
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

                this.groupName = '';

                let groupLen = this.myTabGroups.tabs.length;
                this.active(groupLen - 1); // 标签分组active样式定位到新增标签
            }
        },

        // 标签分组名称鼠标右击事件
        handleRightClickGroup(index) {
            this.currentGroupIndex = index; // 显示操作菜单
            this.operateGroupIndex = index;
        },

        // 标签分组active样式
        active(index) {
            this.activeIndex = index;
        },

        // 隐藏标签分组操作菜单
        hideperationGroupMenu() {
            this.currentGroupIndex = null;
        },

        // 分组操作菜单'编辑'按钮点击事件
        handleEditTabGroup(groupName) {
            $('#editGroupModal').modal('show');
            this.groupName = groupName;
        },

        // 编辑分组弹框'确定'按钮点击事件
        handleSureEditGroup() {
            let groupName = this.groupName;
            let operateGroupIndex = this.operateGroupIndex;

            if (groupName.length === 0) {
                this.isShowGroupNameErr = true;
                return;
            } else {
                this.isShowGroupNameErr = false;

                myTabGroupList.editTabGroup(groupName, operateGroupIndex); // 编辑分组
                this.updateMyTabGroupList(); // 刷新我的标签分组
                $('#editGroupModal').modal('hide'); // 关闭弹框
                this.operateGroupIndex = null;
                this.groupName = '';
            }
        },

        // 分组操作菜单'删除'按钮点击事件
        handleDeleteTabGroup() {
            $('#deleteGroupModal').modal('show');
        },

        // 删除分组弹框'确定'按钮点击事件
        handleSureDeleteGroup() {
            let operateGroupIndex = this.operateGroupIndex;
            myTabGroupList.deleteTabGroup(operateGroupIndex); // 删除分组
            this.updateMyTabGroupList(); // 刷新我的标签分组
            $('#deleteGroupModal').modal('hide'); // 关闭弹框
            this.operateGroupIndex = null;
            this.active(0);
            this.handleEnterUpArrow(); // 滚动到标签顶部
        },

        // 添加快捷方式 点击事件
        handleAddTag(index) {
            this.webLogo = '';
            this.webName = '';
            this.webURL = '';
            this.operateGroupIndex = index;
            this.checkedIndex = 0;
            this.webLogoTxt = 'A';
            this.webLogoBgColor = '#FFFFFF';
        },

        // 添加快捷方式弹框 名称输入事件
        handleWebNameInput() {
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

        // 添加快捷方式（标签）弹框-'添加'按钮点击事件处理
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

            if (logoPrevIndex == 2) {
                if (webLogo === '') {
                    // 未上传图片时，默认取文字+背景色方式展示快捷方式logo
                    logoPrevIndex = 0;
                    webLogoBgColor = '#FFFFFF';
                    webLogoTxt = webName.substr(0, 2);
                }
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
            $('#addTagModal').modal('hide'); // 关闭弹框
            this.operateGroupIndex = null;
        },

        // 标签鼠标右击事件
        handleRightClickTag(idx, e) {
            e.preventDefault();
            this.currentTagIndex = idx; // 显示操作菜单
            this.operateTagIndex = idx;
        },

        // 隐藏标签操作菜单
        hideperationTagMenu() {
            this.currentTagIndex = null;
        },

        // 标签操作菜单'编辑'按钮点击事件
        handleEditTag(index, logo, logoPrevIndex, logoTxt, logoBgColor, name, url) {
            $('#editTagModal').modal('show');
            this.operateGroupIndex = index;
            this.webLogo = logo;
            this.webName = name;
            this.webURL = url;
            this.checkedIndex = logoPrevIndex;
            this.webLogoTxt = logoTxt;
            this.webLogoBgColor = logoBgColor;
            this.changeWebLogoTxtCss();
        },

        // 切换标签logo预览方式 激活样式
        togglePrevWay(index) {
            this.checkedIndex = index;
            this.changeWebLogoTxtCss();
            if (index === 2) { // 自定义上传
                this.addImg();
            }
        },

        // 添加图片
        addImg() {
            document.getElementById('uploadImg').click();
        },

        // 上传图片
        uploadImg(e, files) {
            // let _this = this;
            // //选择图片
            // let img = e.target.files[0];
            // // this.params = new FormData(); // 创建form对象
            // // this.params.append('file', img);
            // // this.config = {
            // //     headers: { 'Content-Type': 'multipart/form-data' }
            // // };

            // // 限制图片大小
            // let size = Math.floor(img.size);
            // if (size > 5 * 1024 * 1024) {
            //     alert('请选择5M以内的图片！');
            //     return false;
            // }

            // if (img) {
            //     let fileReader = new FileReader();
            //     fileReader.readAsDataURL(img);                

            //     fileReader.onloadend = function () {
            //         _this.webLogo = fileReader.result;
            //         console.info('webLogo==========', _this.webLogo);
            // 	};

            // 	// 获取显示图片名称的div
            // 	// let ShowImgDiv = e.target.nextsibling;
            // 	let ShowImgDiv = document.getElementById('showImg');
            // 	console.info('ShowImgDiv:',ShowImgDiv);

            //     // 图片预览
            //     ShowImgDiv.innerHTML =
            //         ShowImgDiv.innerHTML +
            //         `<img class="img-preview" src=${_this.webLogo} />`;


            // }

            var ShowImgDiv = document.getElementById('showImg');
            for (var i = 0; i < files.length; i++) {
                var img_box = document.createElement('div');
                img_box.setAttribute('class', 'file-content');
                var img = document.createElement('img');
                img.src = window.URL.createObjectURL(files[i]);
                img.height = 100;
                img.onload = function () {
                    window.URL.revokeObjectURL(this.src);
                }
                img_box.appendChild(img);
                ShowImgDiv.appendChild(img_box)
            }
        },

        // 编辑快捷方式（标签）弹框-'确定'按钮点击事件处理
        handleBtnEditTagClick() {
            let operateGroupIndex = this.operateGroupIndex;
            let webLogo = this.webLogo;
            let webName = this.webName;
            let webURL = this.webURL;
            let operateTagIndex = this.operateTagIndex;
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

            myTabGroupList.editTag(
                operateGroupIndex,
                operateTagIndex,
                webLogo,
                webLogoTxt,
                logoPrevIndex,
                webLogoBgColor,
                webName,
                webURL
            ); // 添加标签
            this.updateMyTabGroupList(); // 刷新我的标签分组
            $('#editTagModal').modal('hide'); // 关闭弹框
            this.operateTagIndex = null;
        },

        // 标签操作菜单'删除'按钮点击事件
        handleDeleteTag() {
            $('#deleteTagModal').modal('show');
        },

        // 删除标签弹框'确定'按钮点击事件
        handleSureDeleteTag() {
            let operateGroupIndex = this.activeIndex;
            let operateTagIndex = this.operateTagIndex;

            myTabGroupList.deleteTag(operateGroupIndex, operateTagIndex); // 删除标签
            this.updateMyTabGroupList(); // 刷新我的标签列表
            $('#deleteTagModal').modal('hide'); // 关闭弹框
            this.operateTagIndex = null;
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
                        this.webLogoBgColor = this.$Common.RGBtoHEX(currentColor);
                    }
                    // this.checkedIndex = 0;
                }
            }
        },

        // 百度-'搜索'按钮点击事件处理
        handleBaiduSearchClick() {
            let baiduKeyword = this.baiduKeyword;
            window.location.replace(
                `https://www.baidu.com/s?ie=utf-8&wd=${baiduKeyword}`
            );
        },

        // 谷歌-'搜索'按钮点击事件处理
        handleGoogleSearchClick() {
            let googleKeyword = this.googleKeyword;
            window.location.replace(
                `https://www.google.com/search?ie=utf-8&q=${googleKeyword}`
            );
        },

        // 判断是否有纵轴滚动条
        hasScrolled(element) {
            return element.scrollHeight > element.clientHeight;
        },

        // 处理左侧分组菜单方向箭头是否显示
        handleDirectionArrow() {
            let element = $('.inner-container')[0];
            let hasScrolled = this.hasScrolled(element);
            if (hasScrolled) {
                // 有滚动条
                // 显示可滚动箭头
                $('.c-setting .c-direction-arrow').show();
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
        },

        // 给左侧分组菜单div绑定滚动事件
        scroll() {
            // 滚动条滚动时，距离顶部的距离
            let scrollTop = this.$refs.innerContainer.scrollTop;

            // 分组菜单div可视区高度
            let divHeight = $('.inner-container').height();

            // 滚动条的总高度
            let scrollHeight = this.$refs.innerContainer.scrollHeight;

            if (scrollTop + divHeight === scrollHeight) {
                // 滚动到底部
                $('.c-setting .c-direction-arrow').hide();
                $('.c-logo .c-direction-arrow').show();
            }

            if (scrollTop === 0) {
                // 滚动到顶部
                $('.c-logo .c-direction-arrow').hide();
                $('.c-setting .c-direction-arrow').show();
            }
        },

        // 分组/快捷方式 拖拽排序后重新缓存数据
        dataDragEnd() {
            let data = this.myTabGroups;
            localStorage.setObject('myTabGroupList', data);
        },

        dataDragMove() {
            // let index = e.relatedContext.index;
        }

    },
    watch: {
        // 监听 标签分组容器高度 数据变化
        innerContainerHeight(val) {
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if (!this.timer) {
                // 一旦监听到的innerContainerHeight值改变，就将其重新赋给data里的innerContainerHeight
                this.innerContainerHeight = val;
                this.timer = true;
                let $this = this;
                setTimeout(function () {
                    // 打印innerContainerHeight变化的值
                    $this.timer = false;
                }, 400);
                $this.handleDirectionArrow();
            }
        },

    }
};
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

.c-upload-img {
    width: 85px;
    position: relative;
}

.icon-upload img {
    width: 85px;
    height: 85px;
    position: absolute;
}

.c-img-preview {
    width: 85px;
    height: 85px;
}

.img-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* draggable css start */
.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}

.ghost-group {
    border: 1px dashed #ccc;
    opacity: 0.5;
}
.ghost-tag {
    border: 2px dashed #ccc;
    opacity: 0.5;
}
.draggable-list-group {
    min-height: 20px;
}
/* .draggable-list-group-item {
    cursor: move;
} */
/* draggable css end */
</style>
