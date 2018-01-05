/**
 * 网站公共头部模块
 * author zto
 */
define(function(require, exports, module) {

        var webTmpl = require("tpl/xing71-web.tmpl");
        return (function($){
            return function(data,parentNode,type){
                var headerNode = $(webTmpl("public/header",data));
                parentNode.append(headerNode);
                /*var widget = {
                    domNode:headerNode,
                    search: function(e,searchText){
                        overwrite
                        if(type=="home"){
                            window.open("/web/so?key="+ searchText);
                        }else{
                            location.href = "/web/so?key="+searchText;
                        }
                    }
                };
                headerNode.find(".search-btn .btn").on("click",function(e){
                    widget.search(e,$(this.parentNode).prev().val());
                });
*/
                $("#test").tooltip({
                    html: true,
                    placement: "bottom",
                    title: "<img src='" + data.url + "/home/qr_code.png'/>"
                });
                return "";
//                return widget;
            };
        })(jQuery);
});