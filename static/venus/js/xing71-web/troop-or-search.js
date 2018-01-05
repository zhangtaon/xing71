/**
 * Created by ZTO on 2015/4/20.
 * 星期衣web站（团列表页or搜索页or每日最佳）模块入口
 * author zto
 */
define(function(require, exports, module){
    var webTmpl = require("tpl/xing71-web.tmpl");
    var header = require("js/xing71-web/header");
    var troopOrSearchContent = require("js/xing71-web/troop-or-search-content");
    return (function($){
        return function(data){
            var parentNode = $("body");
//                添加头部
            header(data.config,parentNode);

//                添加内容区域
            troopOrSearchContent(data,parentNode);

//                添加底部
            parentNode.append(webTmpl("public/footer",{hidden:true}));
        }
    })(jQuery);
});