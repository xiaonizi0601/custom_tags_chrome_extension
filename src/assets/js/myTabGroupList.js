// global localStorage getParameterByName

// 显示我的标签分组列表
function showMyTabGroupList() {
    let tabGroupList = localStorage.getObject('myTabGroupList');
    if (tabGroupList == null) {
        tabGroupList = {
            tabs: []
        };
    }

    // console.info(tabGroupList)
    return tabGroupList;
}

// 添加标签分组
function addTabGroup(groupName) {
    let data = localStorage.getObject('myTabGroupList');
    data.tabs.push({
        'name': groupName,
        'tags': []
    })

    localStorage.setObject('myTabGroupList', data);
}

// 编辑标签分组
function editTabGroup(groupName, groupIndex) {
    let data = localStorage.getObject('myTabGroupList');
    data.tabs[groupIndex].name = groupName;

    localStorage.setObject('myTabGroupList', data);
}

// 删除标签分组
function deleteTabGroup(groupIndex) {
    let data = localStorage.getObject('myTabGroupList');
    data.tabs.splice(groupIndex, 1);

    localStorage.setObject('myTabGroupList', data);
}

// 添加标签分组
function addTag(groupIndex, logo, logoTxt,logoPrevIndex, name, url) {
    let data = localStorage.getObject('myTabGroupList');
    data.tabs[groupIndex].tags.push({
        'logo': logo,
        'logoTxt': logoTxt,
        'logoPrevIndex':logoPrevIndex,
        'name': name,
        'url': url
    })

    localStorage.setObject('myTabGroupList', data);
}

// 编辑标签分组
function editTag(groupIndex, tagIndex, logo, logoTxt,logoPrevIndex, name, url) {
    let data = localStorage.getObject('myTabGroupList');
    let tag = {
        'logo': logo,
        'logoTxt': logoTxt,
        'logoPrevIndex':logoPrevIndex,
        'name': name,
        'url': url
    }
    data.tabs[groupIndex].tags[tagIndex] = tag;

    localStorage.setObject('myTabGroupList', data);
}

export default {
    showMyTabGroupList,
    addTabGroup,
    editTabGroup,
    deleteTabGroup,
    addTag,
    editTag
}