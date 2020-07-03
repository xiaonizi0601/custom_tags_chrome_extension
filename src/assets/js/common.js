// 数据本地存储
localStorage.__proto__.setObject = function setObject(key, value) {
    this.setItem(key, JSON.stringify(value));
};

// 获取本地存储数据
localStorage.__proto__.getObject = function getObject(key) {
    const value = this.getItem(key);
    return value && JSON.parse(value);
};

// 将rgb()格式颜色转换成大写十六机制字符串（#C0C0C0），如果已经是十六进制则直接输出
function RGBtoHEX(str) {
    if (str.substring(0, 3) == 'rgb') {
        var arr = str.split(',');
        var r = arr[0].replace('rgb(', '').trim(),
            g = arr[1].trim(),
            b = arr[2].replace(')', '').trim();
        var hex = [toHex(r), toHex(g), toHex(b)];
        return '#' + hex.join('');
    } else {
        return str;
    }
}

// 色值转换，将十进制数字转换成两位十六进制字符串
function toHex(N) {
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
}

export default {
    RGBtoHEX
}