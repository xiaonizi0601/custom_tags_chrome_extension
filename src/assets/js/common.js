// 数据本地存储
localStorage.__proto__.setObject = function setObject(key, value) {
    this.setItem(key, JSON.stringify(value));
};

// 获取本地存储数据
localStorage.__proto__.getObject = function getObject(key) {
    const value = this.getItem(key);
    return value && JSON.parse(value);
};

// 下载文件到本地
function downloadFile(fileName, fileType, content) {
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
}

// 备份我的配置信息并下载到本地
function backupMySettings() {
    const items = {};
    Object.keys(localStorage).forEach((key) => {
        console.info(localStorage,key);
        items[key] = localStorage.getObject(key);
    });

    const content = JSON.stringify(items);
    downloadFile('myTabGroups_backup.json', 'application/json', content);
}

// 导入我的配置信息（包括标签分组、标签列表等）
function importMySettings(event) {
    const fileObject = event.target.files[0];
    if (fileObject === null) {
        alert('请选择备份文件');
        return;
    }
    const reader = new FileReader();
    reader.onloadend = (readerEvent) => {
        if (readerEvent.target.readyState === FileReader.DONE) {
            const data_json = readerEvent.target.result;
            // parse json
            let data = null;
            try {
                data = JSON.parse(data_json);
            } catch (e) {
                alert('备份文件格式错误，请重新选择');
                return;
            }
            // console.info('导入json---------', data);

            // console.info('data:',data);
            Object.keys(data).forEach(item => {
                // console.info('item------',item);
                localStorage.setObject(item, data[item])
            });

            // console.info('myTabGroupList---------', localStorage.getObject('myTabGroupList'));

            // 刷新页面
            window.location.reload();
            alert('成功导入我的备份文件');
        }
    };
    reader.readAsText(fileObject);
}

export default {
    backupMySettings,
    importMySettings
}