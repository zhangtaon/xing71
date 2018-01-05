/**
 * 星期衣web站主模块入口
 * author zto
 */
define(function(require, exports, module) {
        var webTmpl = require("tpl/xing71-web.tmpl");
        var header = require("js/xing71-web/header");
        var content = require("js/xing71-web/content");
        return (function($){
            return function(data){
                var parentNode = $("body");
//                添加头部
               header(data.config,parentNode,"home");
//                添加内容区域
                content(data,parentNode);
//                添加底部
                parentNode.append(webTmpl("public/footer"));
            }
        })(jQuery);
});