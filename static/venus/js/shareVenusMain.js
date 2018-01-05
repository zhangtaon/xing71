/**
 * 搭配图分享页启动模块
 * author：zto
 */
define(function(require, exports, module) {
	
	var buildMap = require("js/collocationMapMain");
	var template = require("tpl/collocation-map.tmpl");
    var comm = require("js/common");
	return (function($){
		return function(datas){
			var body = $("body");
			var bulidTmpl = function(tmplName,data){
				body.append($(template(tmplName,data)).get(0));
			};
            /*构建遮罩弹框层*/
			bulidTmpl("public/dialog",{vd:datas.vd,url:datas.config.url});

            /*构建搭配图*/
            buildMap(datas,'shareVenus');

            /*绑定搭配图的点击事件*/
            comm.bindDownloadEvent(datas.config.downUrl);

            //计算遮罩层里的星星
            var initStar = function(number, obj) {
                if(number <= 0) {
                    return;
                }
                var a = Math.floor(number / 10);
                var b = number % 10;
                if(b > 0) {
                    a += 1;
                }
                if(a > 5) {
                    a = 5;
                }
                obj.prepend('<div><img src="' + datas.config.url + "/xin" + a + '.png" style="width:80%"></div>');
            }
            /**
             * 初始化遮罩层
             */
            var buildMask = function(){
                var closeBtn = $('#close');
                var list = $('.reward');
                var first = list.first();
                var last = list.last();
                if(closeBtn.get(0) && first.get(0) && last.get(0)){
                    initStar(vd.fashion, first);
                    initStar(vd.amount, last);
                    closeBtn.click(function (event) {
                        $('.layer').remove();
                        $('.mask').removeClass('mask');
                    });
                }
            };
            buildMask();
	    };
	})(Zepto);
});