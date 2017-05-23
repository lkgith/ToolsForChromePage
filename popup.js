$(document).ready(function(){
    // 删除空格
    function Trim(str,is_global){
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase() =="g"){
            result = result.replace(/\s/g,"");
        }
        return result;
    }

    var $moreEl = $('.more');
    var $moreContent = $('.more-list');
    $moreEl.on('click',function(){
        // 展开收起
        if ($moreContent.hasClass('active')){
            $moreEl.html('展开&gt;&gt;');
            $moreContent.removeClass('active')
        }
        else{
            $moreEl.html('收起&lt;&lt;');
            $moreContent.addClass('active')
        }
    });

    $('.btn-ing').on('click',function(e){
        var $el = $(e.currentTarget)[0];
        
        var el = $el.id.split('_btn')[0];

        var ret = $('input[name=' + el + ']:checked').val();
        if (ret == 1) {
            switch (el) {
                case 'changeTitle':
                    var title = $('input[name=changeTitle-input]').val();
                    chrome.tabs.getSelected(null, function(tab) {
                        chrome.tabs.sendMessage(tab.id,{"title": title}, function handler(response) { 
                            alert('修改成功！');
                        });
                    });
                    break;
                case 'deleteAllCookie':
                    // 删除所有隐私数据
                    var httpUrl, httpsUrl;
                    chrome.cookies.getAll({}, function(val) {
                        for(var i in val) {
                            var cookie = val[i];
                            var flag = cookie.domain.split('.')[0] === '' ? 1 : 0;
                            httpUrl = flag ? ('http://www' + cookie.domain) : ('http://' + cookie.domain);

                            chrome.cookies.remove({
                                url: httpUrl,
                                name: cookie.name
                            });

                            httpsUrl = flag ? ('https://www' + cookie.domain) : ('https://' + cookie.domain);

                            chrome.cookies.remove({
                                url: httpsUrl,
                                name: cookie.name
                            });
                        }
                        alert('删除成功！');
                    });
                    break;

                case 'deleteCookie':
                    var url;
                    chrome.tabs.getSelected(null, function(tab) {
                        url = tab.url.match(/^http(.*)\.(com|cn|net)/)[0];
                        chrome.cookies.getAll({}, function(val) {
                            for(var i in val) {
                                chrome.cookies.remove({
                                    url: url,
                                    name: val[i].name
                                });
                            }
                            alert('删除成功！');
                        });
                    });
                    
                    break;
                
                case 'editCookie':
                    var name = Trim($('input[name=editCookie-input-name]').val(), 'g');
                    var val = Trim($('input[name=editCookie-input]').val(), 'g');
                    var domain = Trim($('input[name=editCookie-input-domain]').val(), 'g');
                    var expires = Trim($('input[name=editCookie-input-expires]').val(), 'g');
                    var url;
                    chrome.tabs.getSelected(null, function(tab) {
                        url = tab.url.match(/^http(.*)\.(com|cn|net)/)[0];
                        var exp = new Date();
                        exp = exp.getTime() + expires * 1000;
                        chrome.cookies.set({
                            url: url,
                            domain: domain,
                            expirationDate: exp / 1000,
                            name: name,
                            value: val
                        });
                        alert('修改成功！');
                    });
                    break;

                default:
                    break;
            }
            
        }
    });
});


