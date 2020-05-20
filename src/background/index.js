console.info('background.js');

// eslint-disable-next-line no-undef
chrome.contextMenus.create({
	title: "测试右键菜单",
	onclick: function(){alert('您点击了右键菜单！');}
});