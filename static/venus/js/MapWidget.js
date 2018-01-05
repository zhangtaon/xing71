/**
 * 搭配图模块
 * author:zto
 */
define(function(require, exports, module) {
    //定义框架属性
    var framePro;
    try{
        framePro = Zepto;
    }catch(e){
        framePro = jQuery;
    }
    var Label = require("js/Label");
    var template = require("tpl/collocation-map.tmpl");
    return (function($){
        /**
         * 搭配图组件
         * @param data  搭配图的相关信息
         * @param labels    标签数组
         * @param tmplName  组件要渲染的模板
         * @param parentNode    被附加的节点
         * @param option    可选的配置项
         * {
         *      mapLoad:fun,        //图片加载完成的回调 返回当前widget对象
         *      hiddenOther:boolean //屏蔽领红包、悬赏、猜题等标签
         *      vdid：number        //标签id 用于如果跟当前渲染的标签对比，相同则选中
         *      hiddenRow1：        //当tmplName包括搭配图的footer模板的时候会根据此值进行显示和隐藏 搭配图下面的第一行（赞过、明星类型 一行）
         *      hiddenRow2：        //当tmplName包括搭配图的footer模板的时候会根据此值进行显示和隐藏 搭配图下面的第二行（地址一行）
         *      styles：            //为当前的搭配设置样式风格（此处只是用于设置了宽度）
         *      enableHover：       //是否启用绑定标签的hover事件
         *      fontSize:           //搭配图标签中字体的样式大小（用来计算标签的宽度）
         * }
         * @constructor
         */
        var MapWidget = function(data,labels,tmplName,parentNode,option){
            this.data = data;
            this.tmplName = tmplName;
            this.labels = labels;
            this.parentNode = parentNode;
            this.domNode = null;
            this.option = option;
            this.startup();
        };
        MapWidget.prototype = {
            /**
             * 构建标签
             * 注：待图片加载完成状态下执行
             * @param map 图片元素
             */
            buildLabel: function(map){
                var _this = this;
                if(map.complete){/*图片状态是否已经加载完成*/
                    _this.option && _this.option.mapLoad && _this.option.mapLoad(_this);
                    _this.initLabel(map);
                }else{
                    /*图片状态加载事件监听*/
                    map.onload = function(){
                        _this.option && _this.option.mapLoad && _this.option.mapLoad(_this);
                        _this.initLabel(this);
                    }
                }
            },
            /**
             * 启动初始化标签
             * 注：此处可添加对标签类型的过滤
             * @param img
             */
            initLabel: function(img){
                if(this.labels.length){
                    var _this = this;
                    //标签工厂方法（如果option select为ture 标志当前标签）
                    var labelFactory = function(img,item,option){
                        option?option["parentNode"] = img.parentNode:option = {parentNode: img.parentNode};
                        var label = new Label(img.offsetWidth,img.offsetHeight,item.d,item.x,item.y,item.descr,item.labelId,item.theId,option);
//                        label.placeAt(img.parentNode);//zto
                        item["widget"] = label;
                        option && option.select && (_this.currentLabel = label.labelNode);
                    };
                    this.labels.forEach(function(item){
//                        var option = (_this.option && _this.option.vdid && {select:_this.option.vdid==item.labelId})||null;
                        _this.option && _this.option.vdid && (_this.option["select"]=(_this.option.vdid==item.labelId));
                        labelFactory(img,item,_this.option);
                    });
                }
            },
            /**
             * 构建搭配图
             * 注：可根据可选配置option操作模板中相关dom（包括设置样式、隐藏行）
             */
            buildMap: function(){
                this.option && this.option.hiddenRow1 && (this.data["hiddenRow1"]=this.option.hiddenRow1);
                this.option && this.option.hiddenRow2 && (this.data["hiddenRow2"]=this.option.hiddenRow2);
                var htmlNode = this.domNode = $(template(this.tmplName,this.data));
                this.option && this.option.styles && htmlNode.css(this.option.styles);
                var parentNode = this.parentNode||$("body");
                parentNode.append(htmlNode.get(0));
                //启动构建标签
                this.buildLabel(htmlNode.find(".collocation-map").get(0));
            },
            postCreate: function(){
                this.bindEvent();
            },
            /**
             * 根据option可选项配置事件的绑定策略
             */
            bindEvent: function(){
                this.option && this.option.enableHover && this.bindHoverEvent();
            },
            /**
             * 绑定标签的hover、out等事件
             */
            bindHoverEvent: function () {
                var _this = this;
                this.domNode.on("mouseenter",".label-content",function(e){
                    _this.labelhover(e.currentTarget);
                    _this.labelMouseover(e.currentTarget);
                    e.stopPropagation();
                });
                this.domNode.on("mouseleave",".label-content",function(e){
//                    $(e.target).css("backgroundColor","#000000");
                    _this.labelMouseout();
                    e.stopPropagation();
                });
            },
            /**
             * 根据标签的vdid获取标签对象
             * @param vdid
             * @returns {number}
             */
            getLabel: function (vdid) {
                return this.labels.filter(function(item){
                    return item.labelId==vdid;
                })[0];
            },
            /**
             * mouseover时
             * 更改当前标签并设置标签状态
             * @param node
             */
            labelhover: function(node){
                this.currentLabel.parent().toggleClass("active");
                this.getLabel($(this.currentLabel).attr("label-id")).widget.rendCanvas(0);
                this.currentLabel = $(node);
                this.currentLabel.parent().toggleClass("active");
                this.getLabel($(this.currentLabel).attr("label-id")).widget.rendCanvas(1);
            },
            /**
             * 鼠标移到标签事件
             * 注：对外提供
             */
            labelMouseover: function(){
                /*overwrite*/
            },
            /**
             * 鼠标移出标签事件
             * 注：对外提供
             */
            labelMouseout: function(){
                /*overwrite*/
            },
            /**
             * 搭配图组件启动函数
             */
            startup: function(){
                this.buildMap();
                this.postCreate();
            }
        };
        return MapWidget;
    })(framePro);
});