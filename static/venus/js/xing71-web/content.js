/**
 * web站中间内容大模块（包括轮播区域和瀑布流区域）
 * Created by ZTO on 2015/4/8.
 */
define(function(require, exports, module){
    return (function($){
        return function(data,parentNode){
            var webTmpl = require("tpl/xing71-web.tmpl");
            var comm = require("js/common");
            data.items.forEach(function(item){
                item["imgUrl"] = comm.getPicCdnDomainUrl(item.mid,data.config.picCdnDomains, 740, 333);
            });
            var domNode = $(webTmpl("public/content",data));

            //menu菜单事件
            var url = location.href.split("?")[0] + "?tpid=";
            domNode.on("click",".style-navebar li",function(e){
                location.href = url + e.currentTarget.getAttribute("tpid");
            });
            parentNode.append(domNode);

            var node = domNode.find(".waterfall-flow").get(0);
            var waterfall = require("js/xing71-web/waterfall");
            waterfall(data,$(node));
        };
    })(jQuery);
});