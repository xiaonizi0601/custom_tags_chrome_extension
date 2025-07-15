<template>
    <div class="main-app h-100" id="bg-box" @click="hideperationGroupMenu()">
        <div class="row h-100">
            <div class="left-box c-nav-pills p-0 text-center">
                <div
                    class="nav flex-column nav-pills outer-container"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <div class="c-logo">
                        <!-- <div
                            class="c-direction-arrow"
                            :class="{ 'is-show': isShowUpArrow }"
                            @mouseenter="handleEnterUpArrow()"
                        >
                            <img
                                src="../../assets/images/icon_direction_arrow.svg"
                            />
                        </div> -->
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
                        <!-- 快捷方式分组拖拽排序 -->
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
                                    :aria-selected="
                                        activeIndex == index ? true : false
                                    "
                                    v-for="(item, index) in myTabGroups.tabs"
                                    :key="index"
                                    @contextmenu.prevent="
                                        handleRightClickGroup(index)
                                    "
                                    @click="active(index)"
                                >
                                    <div class="group-name" :title="item.name">
                                        {{ item.name }}
                                    </div>
                                    <div
                                        class="operation-menu"
                                        v-show="currentGroupIndex == index"
                                        @mouseleave="hideperationGroupMenu"
                                    >
                                        <div
                                            @click="
                                                handleEditTabGroup(item.name)
                                            "
                                        >
                                            {{ $t('_EDIT') }}
                                        </div>
                                        <div @click="handleDeleteGroup()">
                                            {{ $t('_REMOVE') }}
                                        </div>
                                    </div>
                                </li>
                            </transition-group>
                        </draggable>
                    </div>
                    <div class="c-setting">
                        <a class="c-add" @click="showAddGroupModal">
                            <img
                                class="icon-add"
                                src="../../assets/images/icon_add.svg"
                                alt="add"
                            />
                        </a>
                        <!-- <div
                            class="c-direction-arrow"
                            :class="{ 'is-show': isShowDownArrow }"
                            @mouseenter="handleEnterDownArrow()"
                        >
                            <img
                                src="../../assets/images/icon_direction_arrow.svg"
                            />
                        </div> -->
                        <a @click="showSettingModal">
                            <img
                                class="icon-setting"
                                src="../../assets/images/icon_setting.svg"
                                alt="setting"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="tab-content text-center" id="v-pills-tabContent">
                    <div class="search-box">
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

                        <div class="input-group mb-5 col-6">
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
                    </div>

                    <div
                        class="tab-pane fade px-5"
                        :class="[
                            { show: activeIndex == index },
                            { active: activeIndex == index },
                        ]"
                        :id="'v-pills-' + index"
                        role="tabpanel"
                        v-for="(item, index) in myTabGroups.tabs"
                        :key="index"
                    >
                        <!-- 快捷方式 拖拽排序 group="a"-->
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
                                @contextmenu.prevent="
                                    handleRightClickTag(idx, $event)
                                "
                                @mouseleave="hideperationTagMenu"
                            >
                                <div class="c-cover">
                                    <a
                                        class="c-tag"
                                        :href="tag.url"
                                        target="_blank"
                                    >
                                        <div
                                            class="c-dot"
                                            @mouseover="
                                                handleRightClickTag(idx, $event)
                                            "
                                        >
                                            ···
                                        </div>
                                        <div
                                            class="
                                                tag-logo
                                                d-flex
                                                justify-content-center
                                                align-items-center
                                            "
                                            :style="`background:${tag.logoBgColor};`"
                                        >
                                            <span
                                                v-if="tag.logoPrevIndex === 0"
                                                >{{ tag.logoTxt }}</span
                                            >
                                            <div v-if="tag.logoPrevIndex === 1">
                                                <div
                                                    v-if="
                                                        tag.logo &&
                                                        !tag.logo.includes(
                                                            'data:image/'
                                                        )
                                                    "
                                                >
                                                    <img
                                                        :src="tag.logo"
                                                        v-if="
                                                            tag.logo.includes(
                                                                'http'
                                                            )
                                                        "
                                                    />
                                                    <img
                                                        :src="
                                                            require(`../../assets/images/tagLogo/${tag.logo}`)
                                                        "
                                                        v-else
                                                    />
                                                </div>

                                                <img
                                                    src="../../assets/images/logo_48.png"
                                                    v-else
                                                />
                                            </div>
                                        </div>
                                        <p
                                            class="tag-name mt-3"
                                            :title="tag.name"
                                        >
                                            {{ tag.name }}
                                        </p>
                                    </a>
                                    <div
                                        class="
                                            operation-menu
                                            tag-operation-menu
                                        "
                                        v-show="currentTagIndex == idx"
                                        @mouseleave="hideperationTagMenu"
                                    >
                                        <div
                                            @click.stop="
                                                handleEditTag(
                                                    index,
                                                    tag.logo,
                                                    tag.logoPrevIndex,
                                                    tag.logoTxt,
                                                    tag.logoBgColor,
                                                    tag.name,
                                                    tag.url
                                                )
                                            "
                                        >
                                            {{ $t('_EDIT') }}
                                        </div>
                                        <div @click="handleDeleteTag()">
                                            {{ $t('_REMOVE') }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                                class="col-2 c-tag undraggable"
                                @click="handleAddTag(index)"
                            >
                                <div class="tag-logo">
                                    <img
                                        src="../../assets/images/icon_add_black.svg"
                                        class="icon-add-tag"
                                    />
                                </div>
                                <p class="tag-name mt-3">
                                    {{ $t('_ADD_SHORTCUT') }}
                                </p>
                            </a>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加分组 弹框 start -->
        <div class="custom-modal add-group-modal" id="addGroupModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('_ADD_GROUP') }}</h5>
                        <button
                            type="button"
                            class="close"
                            @click="hideModal"
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
                            <div class="err-msg" v-if="isShowGroupNameErr">
                                * {{ $t('_NAME_IS_REQUIRED') }}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            @click="hideModal"
                        >
                            {{ $t('_CANCEL') }}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleBtnAddGroupClick()"
                        >
                            {{ $t('_ADD') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加分组 弹框 end -->

        <!-- 设置 弹框 start -->
        <div class="custom-modal" id="settingModal">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('_SET_UP') }}</h5>
                        <button
                            type="button"
                            class="close"
                            @click="hideModal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{ $t('_SWITCH_LANGUAGE') }}</p>
                        <button
                            class="common-btn mr-3"
                            :class="{
                                'switch-lang-active': currentLang === 'zh-CN',
                            }"
                            @click="switchLanguage('zh-CN')"
                        >
                            简体中文
                        </button>
                        <button
                            class="common-btn"
                            :class="{
                                'switch-lang-active': currentLang === 'en',
                            }"
                            @click="switchLanguage('en')"
                        >
                            English
                        </button>

                        <p class="mt-4">{{ $t('_THEME') }}</p>
                        <button
                            class="common-btn mr-3"
                            :class="{
                                'switch-theme-active':
                                    currentTheme === 'theme_1',
                            }"
                            @click="switchTheme('theme_1')"
                        >
                            {{ $t('_THEME_TYPE[0]') }}
                        </button>
                        <button
                            class="common-btn mr-3"
                            :class="{
                                'switch-theme-active':
                                    currentTheme === 'theme_2',
                            }"
                            @click="switchTheme('theme_2')"
                        >
                            {{ $t('_THEME_TYPE[1]') }}
                        </button>
                        <button
                            class="common-btn mr-3"
                            :class="{
                                'switch-theme-active':
                                    currentTheme === 'theme_3',
                            }"
                            @click="switchTheme('theme_3')"
                        >
                            {{ $t('_THEME_TYPE[2]') }}
                        </button>
                        <button
                            class="common-btn mr-3"
                            :class="{
                                'switch-theme-active':
                                    currentTheme === 'theme_4',
                            }"
                            @click="switchTheme('theme_4')"
                        >
                            {{ $t('_THEME_TYPE[3]') }}
                        </button>
                        <button
                            class="common-btn"
                            :class="{
                                'switch-theme-active':
                                    currentTheme === 'theme_5',
                            }"
                            @click="switchTheme('theme_5')"
                        >
                            {{ $t('_THEME_TYPE[4]') }}
                        </button>

                        <p class="mt-4">{{ $t('_BACK_UP_MY_TAGS') }}</p>
                        <button class="common-btn" @click="backupMySettings()">
                            {{ $t('_EXPORT_TO_LOCAL_FILE') }}
                        </button>

                        <p class="mt-4">{{ $t('_RESTORE_FROM_BACKUP') }}</p>
                        <label class="common-btn" for="my-file-selector">
                            <input
                                id="my-file-selector"
                                type="file"
                                style="display: none"
                                @change="importMySettings($event)"
                            />{{ $t('_IMPORT_FROM_LOCAL_FILE') }}
                        </label>

                        <p class="mt-4">{{ $t('_ABOUT') }}</p>
                        <img
                            class="mr-2"
                            src="../../assets/images/tagLogo/github.svg"
                            alt="github"
                            width="40"
                        />
                        <a
                            class="a-link"
                            href="https://github.com/xiaonizi0601/custom_tags_chrome_extension"
                            target="_blank"
                            >GitHub</a
                        >
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            @click="hideModal"
                        >
                            {{ $t('_CLOSE') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 设置 弹框 end -->

        <!-- 添加快捷方式 弹框 start -->
        <div class="custom-modal add-tag-modal" id="addTagModal">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('_ADD_SHORTCUT') }}</h5>
                        <button
                            type="button"
                            class="close"
                            @click="hideModal"
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
                                        <label>{{ $t('_URL') }}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :placeholder="
                                                $t('_PLEASE_ENTER_URL')
                                            "
                                            v-model="webURL"
                                        />
                                        <div
                                            class="err-msg"
                                            v-if="isShowTagURLErr"
                                        >
                                            * {{ $t('_URL_CANNOT_BE_EMPTY') }}
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('_NAME') }}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :placeholder="
                                                $t('_PLEASE_ENTER_NAME')
                                            "
                                            v-model="webName"
                                            @input="handleWebNameInput()"
                                        />
                                        <div
                                            class="err-msg"
                                            v-if="isShowTagNameErr"
                                        >
                                            * {{ $t('_NAME_IS_REQUIRED') }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="logo-setting-box">
                                    <label class="ml-3">{{
                                        $t('_PREVIEW')
                                    }}</label>
                                    <div class="d-flex c-logo-setting">
                                        <div class="col-4">
                                            <div
                                                :class="{
                                                    active: checkedIndex === 0,
                                                }"
                                                @click="togglePrevWay(0)"
                                                :style="`background:${webLogoBgColor};`"
                                            >
                                                {{ webLogoTxt }}
                                            </div>
                                            <p>{{ $t('_TEXT') }}</p>
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                </div>

                                <div class="bg-color-box mt-3">
                                    <label class="ml-3">{{
                                        $t('_BACKGROUND_COLOR')
                                    }}</label>
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
                            @click="hideModal"
                        >
                            {{ $t('_CANCEL') }}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleBtnAddTagClick()"
                        >
                            {{ $t('_ADD') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加快捷方式 弹框 end -->

        <!-- 编辑快捷方式 弹框 start -->
        <div class="custom-modal edit-tag-modal" id="editTagModal">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('_EDIT_SHORTCUT') }}</h5>
                        <button
                            type="button"
                            class="close"
                            @click="hideModal"
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
                                        <label>{{ $t('_URL') }}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :placeholder="
                                                $t('_PLEASE_ENTER_URL')
                                            "
                                            v-model="webURL"
                                        />
                                        <div
                                            class="err-msg"
                                            v-if="isShowTagURLErr"
                                        >
                                            * {{ $t('_URL_CANNOT_BE_EMPTY') }}
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('_NAME') }}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :placeholder="
                                                $t('_PLEASE_ENTER_NAME')
                                            "
                                            v-model="webName"
                                            @input="handleWebNameInput()"
                                        />
                                        <div
                                            class="err-msg"
                                            v-if="isShowTagNameErr"
                                        >
                                            * {{ $t('_NAME_IS_REQUIRED') }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="logo-setting-box">
                                    <label class="ml-3">{{
                                        $t('_PREVIEW')
                                    }}</label>
                                    <div class="d-flex c-logo-setting">
                                        <div class="col-4">
                                            <div
                                                :class="{
                                                    active: checkedIndex === 1,
                                                }"
                                                @click="togglePrevWay(1)"
                                                :style="
                                                    checkedIndex === 1 &&
                                                    `background:${webLogoBgColor};`
                                                "
                                            >
                                                <div
                                                    v-if="
                                                        webLogo &&
                                                        !webLogo.includes(
                                                            'data:image/'
                                                        )
                                                    "
                                                >
                                                    <img
                                                        :src="webLogo"
                                                        v-if="
                                                            webLogo.includes(
                                                                'http'
                                                            )
                                                        "
                                                    />
                                                    <img
                                                        :src="
                                                            require(`../../assets/images/tagLogo/${webLogo}`)
                                                        "
                                                        v-else
                                                    />
                                                </div>
                                                <img
                                                    src="../../assets/images/logo_48.png"
                                                    v-else
                                                />
                                            </div>
                                            <p v-if="webLogo">
                                                {{ $t('_OFFICIAL') }}
                                            </p>
                                            <p v-else>{{ $t('_NOT_FOUND') }}</p>
                                        </div>
                                        <div class="col-4">
                                            <div
                                                :class="{
                                                    active: checkedIndex === 0,
                                                }"
                                                @click="togglePrevWay(0)"
                                                :style="
                                                    checkedIndex === 0 &&
                                                    `background:${webLogoBgColor};`
                                                "
                                            >
                                                {{ webLogoTxt }}
                                            </div>
                                            <p>{{ $t('_TEXT') }}</p>
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                </div>

                                <div class="bg-color-box mt-3">
                                    <label class="ml-3">{{
                                        $t('_BACKGROUND_COLOR')
                                    }}</label>
                                    <div
                                        class="d-flex c-logo-bgcolor ml-3"
                                        @click="selectBgColor"
                                        :bg="webLogoBgColor"
                                    >
                                        <div
                                            :data-index="0"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#FFFFFF',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="1"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#14C4BC',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="2"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#EE3B3B',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="3"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#FCB138',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="4"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#85D724',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="5"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#16D9C4',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="6"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#276CE6',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="7"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#00AEFD',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="8"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    '#444444',
                                            }"
                                        ></div>
                                        <div
                                            :data-index="9"
                                            :class="{
                                                active:
                                                    webLogoBgColor ===
                                                    'transparent',
                                            }"
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
                            @click="hideModal"
                        >
                            {{ $t('_CANCEL') }}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleBtnEditTagClick()"
                        >
                            {{ $t('_CONFIRM') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑快捷方式 弹框 end -->

        <!-- 删除快捷方式确认 弹框 start -->
        <div class="custom-modal delete-group-modal" id="deleteTagModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('_WARNING') }}</h5>
                        <button
                            type="button"
                            class="close"
                            @click="hideModal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        {{ $t('_WARNING_MESSAGE[1]') }}
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            @click="hideModal"
                        >
                            {{ $t('_CANCEL') }}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleSureDeleteTag()"
                        >
                            {{ $t('_CONFIRM') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除快捷方式 弹框 end -->

        <!-- 编辑分组 弹框 start -->
        <div class="custom-modal edit-group-modal" id="editGroupModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('_EDIT_GROUP') }}</h5>
                        <button
                            type="button"
                            class="close"
                            @click="hideModal"
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
                            <div class="err-msg" v-if="isShowGroupNameErr">
                                * {{ $t('_NAME_IS_REQUIRED') }}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            @click="hideModal"
                        >
                            {{ $t('_CANCEL') }}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleSureEditGroup()"
                        >
                            {{ $t('_CONFIRM') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑分组 弹框 end -->

        <!-- 删除分组确认 弹框 start -->
        <div class="custom-modal delete-group-modal" id="deleteGroupModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('_WARNING') }}</h5>
                        <button
                            type="button"
                            class="close"
                            @click="hideModal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        {{ $t('_WARNING_MESSAGE[0]') }}
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-cancel"
                            @click="hideModal"
                        >
                            {{ $t('_CANCEL') }}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sure"
                            @click="handleSureDeleteGroup()"
                        >
                            {{ $t('_CONFIRM') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除分组确认 弹框 end -->

        <toast :markedWords="markedWords" v-show="isShowToast"></toast>
    </div>
</template>

<script>
import initTabGroups from '../../assets/json/initTabGroups.json';
import myTabGroupList from '../../assets/js/myTabGroupList.js';
// import $ from "jquery";
import draggable from 'vuedraggable';
import toast from '../../components/toast';

export default {
    name: 'app',
    display: 'Transition',
    data() {
        return {
            currentLang: 'zh-CN', // 当前语言
            currentTheme: localStorage.getObject('theme') || 'theme_1', // 当前主题
            myTabGroups: null, // 我的快捷方式分组
            groupName: '', // 分组名称
            isShowGroupNameErr: false, // 是否显示分组名称错误信息
            baiduKeyword: '', // 百度搜索关键词
            googleKeyword: '', // 谷歌搜索关键词
            webURL: '', // 网址
            webName: '', // 网站名称
            webLogo: '', // 网址logo
            isShowTagURLErr: false, // 是否显示快捷方式网址错误信息
            isShowTagNameErr: false, // 是否显示快捷方式名称错误信息
            innerContainerHeight: 0, // 快捷方式分组容器高度
            timer: false, // 定时器
            currentGroupIndex: null, // 当前右击选中的分组索引，用于控制操作菜单显示与隐藏
            operateGroupIndex: null, // 当前操作（编辑和删除）的分组索引
            activeIndex: 0, // 当前active的分组索引
            currentTagIndex: null, // 当前右击选中的快捷方式索引，用于控制操作菜单显示与隐藏
            operateTagIndex: null, // 当前操作（编辑和删除）的快捷方式索引
            checkedIndex: 0, // 当前选择的快捷方式logo预览方式--0:文字；1:官方logo。
            webLogoTxt: 'A', // 快捷方式logo预览方式-文字
            webLogoBgColor: '#FFFFFF', // 快捷方式logo背景色
            isShowUpArrow: false, // 是否显示分组菜单上箭头
            isShowDownArrow: false, // 是否显示分组菜单下箭头
            markedWords: '', // 提示语
            isShowToast: false, //是否显示提示框
        };
    },
    components: { draggable, toast },
    computed: {
        groupDragOptions() {
            // 分组拖拽参数
            return {
                animation: 0,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost-group',
            };
        },
        tagDragOptions() {
            // 快捷方式拖拽参数
            return {
                animation: 0,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost-tag', // 拖动时样式选择器
                filter: '.undraggable', // 不可拖动的样式选择器
            };
        },
    },
    created() {
        // 首次进入应用，使用初始化快捷方式数据
        if (localStorage.getObject('myTabGroupList') == null) {
            localStorage.setObject('myTabGroupList', initTabGroups);
            this.myTabGroups = initTabGroups;
        } else {
            this.updateMyTabGroupList(); // 刷新我的快捷方式分组
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
                // $this.innerContainerHeight = $('.inner-container').height(); // 左侧分组菜单高度
                $this.innerContainerHeight =
                    document.querySelector('.inner-container').offsetHeight; // 左侧分组菜单高度
            })();
        };
        // console.info(
        //     'innerContainerHeight=',
        //     document.querySelector('.inner-container').offsetHeight
        // );

        // 给左侧分组菜单div注册滚动事件
        this.$refs.innerContainer.addEventListener('scroll', this.scroll);

        // 获取本地默认语言
        this.getDefaultLanguage();

        // this.showToast('test2');
    },
    methods: {
        // 显示提示框
        showToast(markedWords) {
            this.markedWords = markedWords;
            this.isShowToast = true;
            let $this = this;
            // let timer = setTimeout(() => {
                $this.isShowToast = false;
                $this.markedWords = '';
            //     clearTimeout(timer);
            // }, 2000);
        },

        // 显示弹框
        showModal(selector) {
            document.querySelector(selector).classList.add('is-show');
        },

        // 关闭弹框
        hideModal() {
            document
                .querySelector('.custom-modal.is-show')
                .classList.remove('is-show');
        },

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
            if (supportLangs.indexOf(navigator.language) !== -1) {
                // 存在用户首选语言
                defaultLang = navigator.language;
            }
            if (
                supportLangs.indexOf(localStorage.getObject('language')) !== -1
            ) {
                // 存在本地缓存的语言
                defaultLang = localStorage.getObject('language');
            }

            this.$i18n.locale = defaultLang;
            this.currentLang = defaultLang;
        },

        // 显示“设置”弹框
        showSettingModal() {
            this.showModal('#settingModal');
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

        // 下载文件到本地
        downloadFile(fileName, fileType, content) {
            window.URL = window.URL || window.webkitURL;
            const blob = new Blob([content], {
                type: fileType,
            });
            const link = document.createElement('a');
            link.download = fileName;
            link.href = window.URL.createObjectURL(blob);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            link.remove();
        },

        // 备份我的配置信息并下载到本地
        backupMySettings() {
            const items = {};
            Object.keys(localStorage).forEach((key) => {
                // console.info(localStorage, key);
                items[key] = localStorage.getObject(key);
            });

            const content = JSON.stringify(items);
            this.downloadFile(
                'myTabGroups_backup.json',
                'application/json',
                content
            );
        },

        // 导入我的配置信息（包括快捷方式分组、快捷方式列表等）
        importMySettings(event) {
            const fileObject = event.target.files[0];
            if (fileObject === null) {
                this.showToast(this.$t('_BACKUPMARKEDWORDS[0]'));
                return;
            }
            const reader = new FileReader();
            reader.onloadend = (readerEvent) => {
                if (readerEvent.target.readyState === FileReader.DONE) {
                    // console.info(readerEvent.target, readerEvent.target.result);
                    const data_json = readerEvent.target.result;
                    // parse json
                    let data = null;
                    try {
                        data = JSON.parse(data_json);

                        // console.info('导入json---------', data);
                        // console.log(Object.keys(data));
                        Object.keys(data).forEach((item) => {
                            // console.log(item, data[item]);
                            if (data[item] === 'myTabGroupList') {
                                let tabs = data[item].tabs;
                                // console.log('tabs---', tabs);
                                tabs.forEach((itm) => {
                                    let tags = itm.tags;
                                    // console.log(tags)
                                    tags.forEach((tag) => {
                                        let logo = tag.logo;
                                        // console.log(logo)
                                        if (logo) {
                                            // logo图片base64位格式异常处理
                                            if (logo.includes('data:image/')) {
                                                tag.logo = '';
                                            }
                                        }
                                    });
                                });
                            }
                            localStorage.setObject(item, data[item]);
                        });

                        this.showToast(this.$t('_BACKUPMARKEDWORDS[2]'));

                        // let timer = setTimeout(() => {
                            // 刷新页面
                            window.location.reload();
                            // clearTimeout(timer);
                        // }, 2000);
                    } catch (e) {
                        this.showToast(this.$t('_BACKUPMARKEDWORDS[1]'));
                        return;
                    }
                }
            };
            reader.readAsText(fileObject);
        },

        // 刷新我的快捷方式分组
        updateMyTabGroupList() {
            let result = myTabGroupList.showMyTabGroupList();
            this.myTabGroups = result;
        },

        // 显示 添加分组弹框
        showAddGroupModal() {
            this.groupName = '';
            this.showModal('#addGroupModal');
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

                this.updateMyTabGroupList(); // 刷新我的快捷方式分组

                this.hideModal();

                this.groupName = '';

                let groupLen = this.myTabGroups.tabs.length;
                this.active(groupLen - 1); // 快捷方式分组active样式定位到新增快捷方式
            }
        },

        // 快捷方式分组名称鼠标右击事件
        handleRightClickGroup(index) {
            this.currentGroupIndex = index; // 显示操作菜单
            this.operateGroupIndex = index;
        },

        // 快捷方式分组active样式
        active(index) {
            this.activeIndex = index;
        },

        // 隐藏快捷方式分组操作菜单
        hideperationGroupMenu() {
            this.currentGroupIndex = null;
        },

        // 分组操作菜单'编辑'按钮点击事件
        handleEditTabGroup(groupName) {
            this.showModal('#editGroupModal');
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
                this.updateMyTabGroupList(); // 刷新我的快捷方式分组
                this.hideModal();
                this.operateGroupIndex = null;
                this.groupName = '';
            }
        },

        // 分组 操作菜单'删除'按钮点击事件
        handleDeleteGroup() {
            this.showModal('#deleteGroupModal');
        },

        // 删除分组弹框'确定'按钮点击事件
        handleSureDeleteGroup() {
            let operateGroupIndex = this.operateGroupIndex;
            myTabGroupList.deleteTabGroup(operateGroupIndex); // 删除分组
            this.updateMyTabGroupList(); // 刷新我的快捷方式分组
            this.hideModal();
            this.operateGroupIndex = null;
            this.active(0);
            // this.handleEnterUpArrow(); // 滚动到快捷方式顶部
        },

        // 添加快捷方式 点击事件
        handleAddTag(index) {
            this.showModal('#addTagModal');
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

        // 添加快捷方式 弹框-'添加'按钮点击事件处理
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
            // console.log('webLogo=', webLogo);
            // logo图片base64位格式异常处理
            if (webLogo.includes('data:image/')) {
                webLogo = '';
            }

            myTabGroupList.addTag(
                operateGroupIndex,
                webLogo,
                webLogoTxt,
                logoPrevIndex,
                webLogoBgColor,
                webName,
                webURL
            ); // 添加快捷方式
            this.updateMyTabGroupList(); // 刷新我的快捷方式分组
            this.hideModal();
            this.operateGroupIndex = null;
        },

        // 快捷方式鼠标右击事件
        handleRightClickTag(idx, e) {
            e.preventDefault();
            this.currentTagIndex = idx; // 显示操作菜单
            this.operateTagIndex = idx;
        },

        // 隐藏快捷方式操作菜单
        hideperationTagMenu() {
            this.currentTagIndex = null;
        },

        // 快捷方式操作菜单'编辑'按钮点击事件
        handleEditTag(
            index,
            logo,
            logoPrevIndex,
            logoTxt,
            logoBgColor,
            name,
            url
        ) {
            this.showModal('#editTagModal');
            this.operateGroupIndex = index;
            this.webLogo = logo;
            this.webName = name;
            this.webURL = url;
            this.checkedIndex = logoPrevIndex;
            this.webLogoTxt = logoTxt;
            this.webLogoBgColor = logoBgColor;
            this.changeWebLogoTxtCss();
        },

        // 切换快捷方式logo预览方式 激活样式
        togglePrevWay(index) {
            this.checkedIndex = index;
            this.changeWebLogoTxtCss();
        },

        // 编辑快捷方式弹框-'确定'按钮点击事件处理
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
            ); // 添加快捷方式
            this.updateMyTabGroupList(); // 刷新我的快捷方式分组
            this.hideModal();
            this.operateTagIndex = null;
        },

        // 快捷方式 操作菜单'删除'按钮点击事件
        handleDeleteTag() {
            this.showModal('#deleteTagModal');
        },

        // 删除快捷方式弹框'确定'按钮点击事件
        handleSureDeleteTag() {
            let operateGroupIndex = this.activeIndex;
            let operateTagIndex = this.operateTagIndex;

            myTabGroupList.deleteTag(operateGroupIndex, operateTagIndex); // 删除快捷方式
            this.updateMyTabGroupList(); // 刷新我的快捷方式列表
            this.hideModal();
            this.operateTagIndex = null;
        },

        // 选择背景颜色
        selectBgColor(e) {
            if (e.target.nodeName.toLowerCase() === 'div') {
                let index = parseInt(e.target.dataset.index);
                if (!isNaN(index)) {
                    // let currentColor = $(e.target).css('background-color'); // 可以获取到样式值
                    // let currentColor = e.target.style.backgroundColor; // 获取不到样式值
                    let currentColor = window.getComputedStyle(
                        e.target,
                        null
                    ).backgroundColor; // 注意：如果样式是通过css设置的，获取css属性值必须使用window.getComputedStyle，不能使用e.target.style
                    if (currentColor === 'rgba(0, 0, 0, 0)') {
                        this.webLogoBgColor = 'transparent';
                    } else {
                        this.webLogoBgColor =
                            this.$Common.RGBtoHEX(currentColor);
                    }
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
            // let element = $('.inner-container')[0];
            let element = document.querySelector('.inner-container');

            let hasScrolled = this.hasScrolled(element);
            if (hasScrolled) {
                // 有滚动条
                // 显示可向下滚动箭头
                this.isShowDownArrow = true;
            } else {
                this.isShowUpArrow = false;
                this.isShowDownArrow = false;
            }
        },

        // 上箭头鼠标进入
        // handleEnterUpArrow() {
        //     // $('.inner-container').animate({ scrollTop: 0 }, 2000); // 滚动到顶部
        //     let ele = this.$refs.innerContainer;
        //     // this.ScrollTop(ele, 0, 200);
        // },

        // 下箭头鼠标进入
        // handleEnterDownArrow() {
        //     // let h = $('.inner-container').height();
        //     let h = document.querySelector('.inner-container').offsetHeight; // 左侧分组菜单高度
        //     // $('.inner-container').animate({ scrollTop: h }, 2000); // 滚动到底部
        //     let ele = this.$refs.innerContainer;
        //     // this.ScrollTop(ele, h, 200);
        // },

        // ScrollTop(ele, number, time) {
        //     let $this = this;
        //     if (!time) {
        //         ele.scrollTop = number;
        //         return number;
        //     }
        //     const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
        //     let spacingInex = time / spacingTime; // 计算循环的次数
        //     let nowTop = ele.scrollTop; // 获取当前滚动条位置
        //     let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
        //     let scrollTimer = setInterval(() => {
        //         if (spacingInex > 0) {
        //             spacingInex--;
        //             $this.ScrollTop(ele, (nowTop += everTop));
        //         } else {
        //             clearInterval(scrollTimer); // 清除计时器
        //         }
        //     }, spacingTime);
        // },

        // 给左侧分组菜单div绑定滚动事件
        scroll() {
            // 滚动条滚动时，距离顶部的距离
            let scrollTop = this.$refs.innerContainer.scrollTop;

            // 分组菜单div可视区高度
            // let divHeight = $('.inner-container').height();
            let divHeight =
                document.querySelector('.inner-container').offsetHeight; // 左侧分组菜单高度

            // 滚动条的总高度
            let scrollHeight = this.$refs.innerContainer.scrollHeight;

            if (scrollTop + divHeight === scrollHeight) {
                // 滚动到底部
                this.isShowUpArrow = true; // 显示上箭头
                this.isShowDownArrow = false;
            }

            if (scrollTop === 0) {
                // 滚动到顶部
                this.isShowUpArrow = false;
                this.isShowDownArrow = true; // 显示下箭头
            }
        },

        // 分组/快捷方式 拖拽排序后重新缓存数据
        dataDragEnd() {
            let data = this.myTabGroups;
            localStorage.setObject('myTabGroupList', data);
        },

        dataDragMove() {
            // let index = e.relatedContext.index;
        },
    },
    watch: {
        // 监听 快捷方式分组容器高度 数据变化
        innerContainerHeight(val) {
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if (!this.timer) {
                // 一旦监听到的innerContainerHeight值改变，就将其重新赋给data里的innerContainerHeight
                this.innerContainerHeight = val;
                this.timer = true;
                let $this = this;
                // setTimeout(function () {
                    // 打印innerContainerHeight变化的值
                    // $this.timer = false;
                // }, 400);
                $this.handleDirectionArrow();
            }
        },
    },
};
</script>

<style >
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

.input-group-append .input-group-text {
    border-left: none;
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
    height: 100%;
    margin: 0;
}
.tab-content {
    height: 100vh;
    overflow: auto;
}
.left-box {
    width: 200px;
}
.right-box {
    width: calc(100% - 200px);
}
</style>
