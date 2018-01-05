/**
 * 团推广头部模块
 * author：zto
 */
define(function(require, exports, module) {
	var template = require("tpl/collocation-map.tmpl");
    var comm = require("js/common");
	return (function($){
		return function(datas){
            datas["logoUrl"]=comm.getPicCdnDomainUrl(datas.troop.icon,datas.config.picCdnDomains,200,200,1);
            datas.userBrand.forEach(function(item){
                item["url"] = comm.getPicCdnDomainUrl(item.icon,datas.config.picCdnDomains,200,200,1);
            });
            var node = $(template("public/troopExtendHeader",datas));
            var logoNode = node.find(".logo-left img").get(0);
            logoNode.onload=function(){
                node.find(".logo-center").css("height",this.offsetHeight);
                node.find(".logo-right").css("height",this.offsetHeight);
                var logoCenterNdoe = node.find(".logo-center .cell");
                logoCenterNdoe.css({
                    top:"50%",
                    marginTop: -logoCenterNdoe.get(0).offsetHeight/2
                });
            };
            var img = node.find(".user-brand img").get(0);
            if(img){
                img.onload=function(){
                    node.find(".user-brand .prop").css("height",this.offsetHeight);
                    node.find(".user-brand .more").css("lineHeight",this.offsetHeight+"px");
                };
            }
            $("body").append(node);
	    };
	})(Zepto);
});