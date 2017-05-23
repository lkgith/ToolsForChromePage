// 点击按钮改变页面标题
// $(document).ready(function() {
//     $('<link href="https://assets-cdn.github.com/favicon.ico" rel="shortcut icon">').prependTo('head');
//     $('title').html('搜索一下');
// });

/* 修改网页名称
 * 根据配置的title进行修改
 * author lvkunjie
 */
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        var title = request.title;
        $('title').html(title || '搜索一下');
    }
); // 绑定扩展通知

