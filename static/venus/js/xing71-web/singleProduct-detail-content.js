/**
 * web站单品详情页 中间内容大模块（包括大的搭配图、轮播区域和相关搭配图）
 * Created by ZTO on 2015/4/8.
 */
define(function(require, exports, module){
    return (function($){
        return function(data,parentNode){
            var webTmpl = require("tpl/xing71-web.tmpl"),
            comm = require("js/common"),
            bulidMap = require("js/collocationMapMain");

            //假数据
            var dd = {"id":411,"user":{"level":1,"uid":150491,"headFace":199077,"nick":"happyman","rcode":1999,"fashion":0},"status":10,"home":0,"mid":221244,"commentCount":29,"descrp":"的非官方的华国锋和规范化222222222222222222222222222","pubTime":1426647600000,"laudCount":1,"venusDetails":[{"name":"老农民","id":888,"type":1,"startTime":null,"endTime":null,"descrp":null,"theId":893,"amount":0,"fashion":0,"x":746,"y":9080,"d":1,"answer":null},{"name":"测试1","id":918,"type":1,"startTime":null,"endTime":null,"descrp":null,"theId":932,"amount":0,"fashion":0,"x":3093,"y":5860,"d":1,"answer":null},{"name":"地点团哈哈","id":889,"type":3,"startTime":null,"endTime":null,"descrp":null,"theId":883,"amount":0,"fashion":0,"x":5306,"y":7660,"d":1,"answer":null},{"name":"狐猴团1515","id":890,"type":5,"startTime":null,"endTime":null,"descrp":null,"theId":826,"amount":0,"fashion":0,"x":7893,"y":8980,"d":1,"answer":null},{"name":"喇叭裤商品","id":891,"type":50,"startTime":null,"endTime":null,"descrp":"伊都锦","theId":69,"amount":852145,"fashion":0,"x":6240,"y":2800,"d":1,"answer":null},{"name":"Generic H2 (Server)","id":894,"type":50,"startTime":null,"endTime":null,"descrp":"朱塞佩·萨诺第","theId":917,"amount":111100,"fashion":0,"x":5386,"y":3300,"d":1,"answer":null}],"lauded":0};
            dd["config"] = data.config;
            var arr = [dd,dd,dd,dd,dd,dd,];

            /**
             * 单品详情页类
             * @param data
             * @param parentNode
             */
            var singleProductDetail = function(data,parentNode){
                this.data= data;
                this.parentNode= parentNode;
                this.labelNum = 0;
                this.label = [];
                this.carousel = null;
                this.mapWidget = null;
                this.expandHeight = 0;
                this.carousel6 = null;//轮播容器
                this.rightTop = null;//轮播容器父容器
                this.currentLabel = null;//当前展示的标签
                this.startup();
            };
            singleProductDetail.prototype = {
                startup: function(){
                    this.propertyMixin();
                    this.rend();
                    this.addExternal();
                    this.loadRelevantMap();//zto
                    this.timingLoading();//zto
                },
                /**
                 * 处理数据
                 */
                propertyMixin: function () {
                    var _this = this;
                    this.data["items"] = [];
                    this.data.mids.forEach(function(item){
                        _this.carouselItemHandle(item);
                        _this.data.items.push(item);
                    });
                },
                /**
                 * 处理轮播区域的相关数据（包括图片的url、商品的价格）
                  * @param item
                 */
                carouselItemHandle: function (item) {
                    item["url"] = comm.getPicCdnDomainUrl(item.icon,this.data.config.picCdnDomains,160,160);
                    item.price = Math.floor(item.price/100);
                },
                /**
                 * 渲染内容节点（页面中间）
                 */
                rend: function () {
                    var _this = this;
                    //获取要初始化label logo 图片
                    data["logoUrl"] = data.brand.icon?comm.getPicCdnDomainUrl(data.brand.icon,this.data.config.picCdnDomains,48,48):"";
                    //获取要初始化label logo 图片的跳转地址
                    data.brand["logoLink"] = data.brand.tpid?"/web/troop/" + data.brand.tpid +"/":"";
                    this["domNode"] = $(webTmpl("public/singleProduct-detail-content",this.data));
                    this.data.venus["config"] = this.data.config;
                    //渲染页面中间整体dom结构框架
                    this.parentNode.append(this.domNode);

                    this.moreNode = this.domNode.find(".more").on("click",function(){
                        _this.toggleExpand();
                    });
                    //赋值轮播对象
                    this.carousel = this.domNode.find('.carousel');
                    //绑定轮播事件（每次轮播触发要做的事情）
                    this.carousel.on('slide.bs.carousel', function (relatedTarget,direction) {
                        _this.toggleExpand(false);
                        _this.autoToggleLabel($(relatedTarget.relatedTarget).attr("the-id"));
                        _this.showMore($(relatedTarget.relatedTarget));
                    });

                    //初始化左侧搭配图（启动label的hover）
                    var mapWap = $(".content-top-left");
//                    var widget = this.mapWidget = bulidMap(data.venus,"troopExtend",mapWap,{styles:{width:mapWap.width()},hiddenRow1:true,vdid:this.data.vdid,types:comm.webLabelTypes});//zto
                    var widget = this.mapWidget = bulidMap(data.venus,"troopExtend",mapWap,{styles:{width:mapWap.width()},hiddenRow1:true,enableHover:true,vdid:this.data.vdid,types:comm.webLabelTypes,fontSize:14});
                    this["labels"] = widget.labels;

                    //详情页的明星团、地址团、风格团加入链接
                    var troopUrl =  "/web/troop/";
                    widget.domNode.on("click",function(e){
                        var target = $(e.target);
                        var isLabelText = target.hasClass("label-text");
                        var isMapStyle = target.hasClass("map-style");
                        var isAddress = target.hasClass("address-span");
                        (isLabelText || isMapStyle || isAddress) && (window.open(troopUrl+target.attr("the-id")+"/"));
                    });

                    //更新还没有加载数据的标签信息
                    this.updateLabel(this.data.vdid,this.data);

                    //设置当前的标签
                    this.currentLabel = $("[label-id="+this.data.vdid+"]");

                    //绑定标签鼠标滑过事件
                    widget.labelMouseover = function(node){
                        var node = $(node);
                        _this.asyncLoadSingleProduct(node.attr("the-id"),node.attr("label-id"),true);
                    };
                },
                showMore: function (node) {
                    $(node).children().length>6?this.moreNode.show():this.moreNode.hide();
                },
                /**
                 * 展开和收缩轮播项（点击更多操作）
                 * @param flag boolean 可选项：true为强制展开，false为强制收缩；默认自动执行展开和收缩
                 */
                toggleExpand: function (flag) {
                    var close = function(){
                        this.carousel6.height(this.carousel6.height() - this.expandHeight);
                        this.rightTop.height(this.rightTop.height() - this.expandHeight);
                        this.expandHeight = 0;
                        this.moreNode.html("更多...");
                    } ;
                    var expand = function(){
                        !this.carousel6 && (this.carousel6 = $(".carousel6"));
                        !this.rightTop && (this.rightTop = $(".right-top"));
                        var activeHeight = $(".carousel-inner .active").height();
                        this.expandHeight = activeHeight-this.carousel6.height();
                        this.carousel6.height(activeHeight);
                        this.rightTop.height(this.rightTop.height() + this.expandHeight);
                        this.moreNode.html("收起");
                    };
                    var auto = function(){
                        this.expandHeight?close.call(this):expand.call(this);
                    };
                    var contr = function (flag) {
                        flag?expand.apply(this):this.expandHeight&&close.apply(this);
                    };
                    typeof flag == "undefined"?auto.call(this):contr.call(this,flag);
                },
                /**
                 * 更新还没有加载数据的标签信息
                 * @param vdid
                 */
                updateLabel: function (vdid,labelItem) {
                    var _this = this;
                    this.labels = this.labels.filter(function(item){
                        item.labelId==vdid&&(item["labelNum"] = _this.labelNum++,item["labelItem"] = labelItem,_this.label.push(item));
                        return item.labelId!=vdid;
                    });
                },
                /**
                 * 检查当前标签是否已经加载过标签数据
                 * @param vdid
                 * @returns {boolean}
                 */
                hasLabel: function(vdid){
                    return this.labels.some(function(item){
                        return item.labelId==vdid;
                    });
                },
                /**
                 * 根据标签的vdid获取标签对象
                 * @param vdid
                 * @returns {number}
                 */
                getLabel: function (vdid) {
                    return this.label.filter(function(item){
                        return item.labelId==vdid;
                    })[0];
                },
                /**
                 * 根据标签的theId获取标签对象
                 * @param theId
                 * @returns {number}
                 */
                getLabelByTheId: function (theId) {
                    return this.label.filter(function(item){
                        return item.theId==theId;
                    })[0];
                },
                /**
                 * 获取所有非商品details项的theId
                 * @returns {string}
                 */
                getOtherLabelTpids: function () {
                    var tpids = [];
                    var place = this.mapWidget.data.place;
                    place && place.theId && tpids.push(place.theId);
                    this.mapWidget.data.stars.forEach(function(item){
                        tpids.push(item.theId);
                    });
                    this.mapWidget.data.style.forEach(function(item){
                        tpids.push(item.theId);
                    });
                    return tpids.join(",");
                },
                /**
                 * 加载相关搭配图
                 */
                loadRelevantMap: function () {

                    var url = "/share/data/relativevenuses.json";
                    comm.get({url:url,context:this},{tpids:this.getOtherLabelTpids(),vid:this.data.venus.id})
                        .then(function(data){
//                            console.log("loadRelevantMap success data:",data);
                            var _this = this;
                            data.attachment && data.attachment.venuses && comm.bindMapEvent(".waterfall-flow") && data.attachment.venuses.forEach(function(item){
                                item["config"] = _this.data.config;
                                bulidMap(item,"troopExtend",$(_this.domNode.find(".relevant-maps").get(0)),{styles:{width:255},hiddenRow1:true,hiddenRow2:true,types:comm.webLabelTypes,fontSize:12});
                            });
                            /*arr.forEach(function(item){
                             bulidMap(item,"troopExtend",$(_this.domNode.find(".relevant-maps").get(0)),{styles:{width:255},hiddenRow1:true,hiddenRow2:true});
                             });*/
                        },function(e){
                            console.log("error");
                        });
                },
                /**
                 * 异步加载右侧轮播信息
                  * @param theId
                 * @param vdid
                 * @param show  是否同步显示右侧轮播区域
                 */
                asyncLoadSingleProduct: function(theId,vdid,show){
                    if(this.hasLabel(vdid)){
//                        var url = "/web/commodity?tpid="+theId;
                        var url = "/share/data/commodity"+theId+".json";
                        var parendNode = $(".carousel-inner");
                        var _this = this;
                        comm.get({url:url}).then(function(store){
//                            console.log("asyncLoadSingleProduct success data theid  vdid:",store,theId,vdid);
                            //处理轮播需要的图片
                            store.attachment.items.forEach(function(item){
                                _this.carouselItemHandle(item);
                            });
                            parendNode.append($(webTmpl("public/carousel6Item",store.attachment)));
                            _this.updateLabel(vdid,store.attachment);
                            //根据条件决定是否显示加载后的轮播
                            show && _this.toggleLabel(vdid);
                        },function(e){
                            console.log("error");
                        });
                    }else{
                        //根据条件决定是否显示加载后的轮播
                        show && this.toggleLabel(vdid);
                    }
                },
                /**
                 * 切换标签
                 * @param vdid
                 */
                toggleLabel: function(vdid){
                    var label = this.getLabel(vdid);
                    this.carousel.carousel(label.labelNum);
                    this.setLabelTitle(label.labelItem.name,label.labelItem.brand.icon,label.labelItem.brand.tpid);
                },
                /**
                 * 设置详情页右上的标题部分
                 * @param labelName
                 * @param icon
                 */
                setLabelTitle: function (labelName,icon,tpid) {
                    !this["labelNameNode"] && (this["labelNameNode"]=$(".label-name"));
                    !this["labelLogoImgNode"] && (this["labelLogoImgNode"]=$(".label-logo img"));
                    !this["labelLogoANode"] && (this["labelLogoANode"]=$(".label-logo a"));

                    this.labelNameNode.html(labelName);

                    this.labelLogoImgNode.attr("src",icon?comm.getPicCdnDomainUrl(icon,this.data.config.picCdnDomains,48,48):"");
                    this.labelLogoANode.attr("href",tpid?"/web/troop/"+tpid+"/":"");

                    //控制显示logo
                    icon?this.labelLogoImgNode.removeClass("hidden"):this.labelLogoImgNode.addClass("hidden");
                },
                /**
                 * 自动切换标签
                 * @param theId
                 */
                autoToggleLabel: function(theId){
                    var label = this.getLabelByTheId(theId);
                    this.setLabelTitle(label.labelItem.name,label.labelItem.brand.icon,label.labelItem.brand.tpid);
                    var labelNode = $(".detailMap [the-id="+theId+"]").get(0);
                    this.mapWidget.labelhover(labelNode);
                },
                /**
                 * 定时加载标签
                 * 轮播间隔为：5000；
                 * 定时3000
                 */
                timingLoading: function () {
                    var _this = this;
                    setTimeout(function(){
                        _this.labels[0] && (_this.asyncLoadSingleProduct(_this.labels[0].theId,_this.labels[0].labelId),_this.timingLoading());
                    },3000);
                },
                /**
                 * 添加淘宝外部控制
                 */
                addExternal: function () {
                    (function(win,doc){
                        var s = doc.createElement("script"), h = doc.getElementsByTagName("head")[0];
                        if (!win.alimamatk_show) {
                            s.charset = "gbk";
                            s.async = true;
                            s.src = "http://a.alimama.cn/tkapi.js";
                            h.insertBefore(s, h.firstChild);
                        };
                        var o = {
                            pid: "mm_33603121_9482790_32180771",/*推广单元ID，用于区分不同的推广渠道*/
                            appkey: "23056888",/*通过TOP平台申请的appkey，设置后引导成交会关联appkey*/
                            unid: "",/*自定义统计字段*/
                            type: "click" /* click 组件的入口标志 （使用click组件必设）*/
                        };
                        win.alimamatk_onload = win.alimamatk_onload || [];
                        win.alimamatk_onload.push(o);
                    })(window,document);
                }
            };
            new singleProductDetail(data,parentNode);
        };
    })(jQuery);
});