/**
 * 主题推广页启动模块
 * author: zto
 */
define(function(require, exports, module) {

    var bulidMap = require("js/collocationMapMain");
    var template = require("tpl/collocation-map.tmpl");
    var comm = require("js/common");
    Date.prototype.format = function(formatStr){
        var str = formatStr;
        var Week = ['日','一','二','三','四','五','六'];
        str=str.replace(/yyyy|YYYY/,this.getFullYear());
        str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
        str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());
        str=str.replace(/M/g,this.getMonth());
        str=str.replace(/w|W/g,Week[this.getDay()]);
        str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
        str=str.replace(/d|D/g,this.getDate());
        str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
        str=str.replace(/h|H/g,this.getHours());
        str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
        str=str.replace(/m/g,this.getMinutes());
        str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
        str=str.replace(/s|S/g,this.getSeconds());
        return str;
    };
    return (function($){
        return function(datas,config){
            datas["url"] = datas.config.url;
            datas.pubTime =(new Date(datas.pubTime)).format("yyyy-MM-dd");
            var node = $(template("topic",datas));
            var warp = node.find(".warp");
            $("body").append(node);

            var bulidTextNode = function(text){
                var tmpl = '<div class="row"><span>'+text+'</span></div>';
                return $(tmpl).get(0);
            };
            var bulidImgNode = function(mid){
                var tmpl = '<div class="row"><div class="col-xs-12 map"><img class="collocation-map" src="'+comm.getPicCdnDomainUrl(mid,datas.config.picCdnDomains)+'"/></div></div>';
                return $(tmpl).get(0);
            };

            /*构建图文混排的内容区域*/
            datas.details && datas.details.forEach(function(item){
                switch(item.type){
                    case 0:
                        warp.append(bulidTextNode(item.content));
                        break;
                    case 30:
                        warp.append(bulidImgNode(item.content));
                        break;
                    case 260:
                        item.content["config"] = datas.config;
                        bulidMap(item.content,'public/collocationMap',warp);
                        break;
                }
            });

            /*绑定搭配图的点击事件*/
            comm.bindDownloadEvent(datas.config.downUrl);
        };
    })(Zepto);
});