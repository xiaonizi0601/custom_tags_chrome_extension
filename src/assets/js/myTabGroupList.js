// global localStorage getParameterByName

// 显示我的标签分组列表
function showMyTabGroupList() {
    let key = 'myTabGroupList';

    let tabGroupList = localStorage.getObject(key);
    if (tabGroupList == null) {
        tabGroupList = {
            tabs: []
        };
    }

    // console.info(tabGroupList)
    return tabGroupList;
}

export default {
    showMyTabGroupList
}