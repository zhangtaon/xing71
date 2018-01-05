/**
 * 星期衣web站主模块入口
 * author zto
 */
define(function(require, exports, module) {
    var webTmpl = require("tpl/xing71-web.tmpl");
    var header = require("js/xing71-web/header");
    return (function($){
        return function(data){
        	var parentNode = $("body");
            //添加头部
//            header(data.config,parentNode);
            parentNode.append(webTmpl("public/footer", {hidden:true}));
        }
    })(jQuery);
});