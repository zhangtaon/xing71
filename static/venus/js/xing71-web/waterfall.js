/**
 * web站瀑布流模块
 * Created by ZTO on 2015/4/8.
 */
define(function(require, exports, module){
    return (function($){
        return function(data,parentNode){
           /* var bulidMap = require("js/collocationMapMain");
            items.forEach(function(item){
                item.content["config"] = {url:"./static/venus/image"};
                bulidMap(item.content,tmpl,parentNode);
            });*/
//            var items = data.details.concat(data.details,data.details);
            var comm = require("js/common");
            /**
             * 瀑布流组件
             * @param items 数据数组
             * @param parentNode    被添加到的节点
             * @param pagingOption  分页配置项
             * @constructor
             */
            var Waterfall = function(items,parentNode,pagingOption,loadUrl){
                //瀑布流数据相关
                this.items = items;
                this.parentNode = parentNode;
                this.pagingOption = pagingOption;
                this.loadUrl = loadUrl;
                this.option = {
                  clu:3,//列数
                  space: 12//间隙
                };
                this.clus = [];
                this.asyncLoading = false;
                this.finished = false;//瀑布流数据全部加载完成标示
                //图片相关
                this.tmpl = "troopExtend";//模板名
//                this.config = {url:"./static/venus/image/share",picCdnDomains:data.config.picCdnDomains};
                this.bulidMap = require("js/collocationMapMain");
                this.startup();
            };
            Waterfall.prototype = {
                startup: function(){
                    this.initClumns();
                    this.load(0);
                    this.bindEvent();
                },
                bindEvent: function(){
                    this.bindScroll();
                    this.bindMapEvent();
                },
                /**
                 * 初始化列对象
                 */
                initClumns: function(){
                    //列对象类
                    var Place = function(left,top,width){
                        this.left = left;
                        this.top = top;
                        this.width = width;
                    };
                    var w = parentNode.width();
                    var cluW = (w-this.option.space*(this.option.clu-1))/this.option.clu;
                    for(var i=0;i<this.option.clu;i++){
                        this.clus.push(new Place((i*cluW+i*this.option.space),0,cluW));
                    }
                },
                load: function(index){
                    var _this = this;
                    var item;
                    if(this.items && this.items.length>index){
                        item = this.items[index];
                    }else{
                        this.asyncLoading = false;
                        //此处执行此方法目的数据加载完成可能滚动条在最下面，但数据还没有完全加载完成
                        this.scrollLoad();
                        return;
                    }
                    item["config"] = data.config;
                    var mapLoad = function(mapWidget){
                        _this.clusSort(mapWidget);
                        _this.render();
                        _this.load(index+1);
                    };
                    var mapWidget = _this.bulidMap(item,this.tmpl,parentNode,{styles:this.clus[0],mapLoad:mapLoad,types:comm.webLabelTypes,fontSize:12});
                },
                /**
                 * 列对象排序
                 * @param mapWidget
                 */
                clusSort: function(mapWidget){
                    var mapWidgetHeight = mapWidget.domNode.get(0).offsetHeight;
                    //给第一项赋值然后按升序排列
                    this.clus[0].top += mapWidgetHeight+this.option.space;
                    this.clus.sort(function(a,b){
                        return a.top - b.top;
                    });
                },
                render: function(){
                    this.parentNode.height(this.clus[this.clus.length-1].top);
                },
                /**
                 * 滚动条事件（监测快到底部的时候执行请求加载搭配图）
                 */
                bindScroll: function(){
                    var _this = this;
                    $(window).scroll(function(){
                        _this.scrollLoad();
                    });
                },
                /**
                 * 判断滚动条的位置决定是否加载瀑布流数据
                 */
                scrollLoad: function(){
                    var scrollTop = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var scrollHeight = $(document).height();
//                    var bottomHeight = $(".web-footer").get(0).offsetHeight;
                    var bottomHeight = 112;

                    var scrolledHeight = scrollTop + windowHeight + bottomHeight*2.5;
                    console.log("scrollTop:",scrollTop,"windowHeight:",windowHeight,"scrolledHeight:",scrolledHeight,"scrollHeight:",scrollHeight);

//                        (scrolledHeight > scrollHeight)&& _this.load(0);
                    (scrolledHeight > scrollHeight)&&!this.asyncLoading&&!this.finished &&this.asyncLoad();
                },
                /**
                 * 绑定搭配图事件
                 */
                bindMapEvent: function(){
                    comm.bindMapEvent(".waterfall-flow");
                },
                asyncLoad: function(){
                    this.asyncLoading = true;
                    var promise = $.ajax({
                        async:true,
                        cache:false,
                        data:this.pagingOption,
                        url:this.loadUrl,
                        type:"get",
                        context:this
                    });
                    promise.then(function(data){
                        this.items = data.attachment.venuses;
                        this.items?(this.load(0),this.pagingOption.start += this.pagingOption.size):this.finished=true;
                    },function(e){
                        console.log("error");
                    });
                }
            };
            var start = data.start+data.size,size = 20,pagingOption;
            switch (data.type){
                //首页
                case "index":
                //团
                case "troop":
                    pagingOption = {start:start,size:size,tpid:data.currentTpid};
                    break;
                //搜索
                case "so":
                    pagingOption = {start:start,size:size,key:data.key};
                    break;
                //每日最佳
                case "daily":
                    pagingOption = {start:start,size:size};
                    break;
            }
            data.details && new Waterfall(data.details,parentNode,pagingOption,data.loadUrl);
        };
    })(jQuery);
});