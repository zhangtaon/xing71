/**
 * Created by ZTO on 2015/4/15.
 * 星期衣web站主模块入口
 * author zto
 */
define(function(require, exports, module){
    var webTmpl = require("tpl/xing71-web.tmpl");
    var header = require("js/xing71-web/header");
    var singleProductDetailContent = require("js/xing71-web/singleProduct-detail-content");
    return (function($){
        return function(data){
            var parentNode = $("body");
//                添加头部
            header(data.config,parentNode);

//                添加内容区域
            singleProductDetailContent(data,parentNode);

//                添加底部
            parentNode.append(webTmpl("public/footer",{hidden:true}));
        }
    })(jQuery);
});