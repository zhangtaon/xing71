/**
 * 搭配图标签模块
 * author：zto
 */
define(function(require, exports, module) {
	var framePro;
    try{
        framePro = Zepto;
    }catch(e){
        framePro = jQuery;
    }
    var comm = require("js/common");
	return (function($){
        /**
         * 	     * 标签构造函数
         * @param imgWidth 大图的宽度
         * @param imgHeight 大图的高度
         * @param direction 标签的延伸方向
         * @param circleX 标签的圆心的x坐标
         * @param circleY 标签的圆心的y坐标
         * @param name 标签的内的文本
         * @param labelId 标签id
         * @param theId
         * @param option 可选配置项
         * {
         *      select：boolean //是否将当前标签标记为选中状态
         *      fontSize:       //搭配图标签中字体的样式大小（用来计算标签的宽度）
         * }
         * @constructor
         */
	    var Label = function(imgWidth,imgHeight,direction,circleX,circleY,name,labelId,theId,option){
	        /*比例定义（1242*2208）*/
//	        var contentPaddingScale = 15/1600;
	        var contentWidthScale = 360/1600;
//	        this.contentPadding = this.formatNum(contentPaddingScale*imgWidth);
//	        this.contentWidth = this.formatNum(contentWidthScale*imgWidth);
//	        this.contentWidth = 300;
            //comm.getTextLength(name)*option.fontSize：计算字体的像素宽度，6*2.5中6为标签的内边距
            (option && option.fontSize)?this.contentWidth = comm.getTextLength(name)*option.fontSize+6*2.5:this.contentWidth = this.formatNum(contentWidthScale*imgWidth);

	        var circleXScale = circleX/10000;/*圆心的x轴坐标比例*/
	        var circleYScale = circleY/10000;/*圆心的y轴坐标比例*/
//	        var widthScale = 100/1200;/*canvas水平长度比例*/
//	        var heightScale = 126/1600;/*canvas垂直长度比例*/
	        var widthScale = 120/1200;/*canvas水平长度比例*/
	        var heightScale = 120/1600;/*canvas垂直长度比例*/
	        var shortHeightScale = 30/1600;/*短高度比例*/
	
	        this.name = name;
	        this.labelId = labelId;
	        this.theId = theId;
	        this.option = option;
	        this.circleX = this.formatNum(circleXScale*imgWidth);
	        this.circleY = this.formatNum(circleYScale*imgHeight);
	        this.canvasHeight = this.formatNum(heightScale*imgHeight);
	        this.canvasWidth = this.formatNum(widthScale*imgWidth);
	        this.shortHeight = this.formatNum(shortHeightScale*imgHeight);
	        this.direction = direction; /*direction 延伸的方向*/

            this.domNode = null;
            this.labelNode = null;
            this.canvasData = null;
	        this.startup();
	    };
	    Label.prototype = {
//	        tmpl:"<div class='label-widget'><div class='label-content'><span class='triangle'></span><span class='label-text'>_{name}</span></div><canvas>Your browser does not support the HTML5 canvas tag.</canvas><span class='circle-icon'></span></div>",
	        tmpl:"<div class='label-widget'><div class='label-content' label-id='_{labelId}' the-id='_{theId}'><div class='label-content-top'>_{name}</div><div class='label-content-bottom clearfix'><div class='label-content-bottom-left'></div><div class='label-content-bottom-right'></div></div></div><canvas>Your browser does not support the HTML5 canvas tag.</canvas><span class='circle-icon'></span></div>",
	        /**
	         * 数据混入模板
	         */
	        mixedDataTemplate: function(){
	            this.tmpl = this.tmpl.replace("_{name}",this.name);
	            this.tmpl = this.tmpl.replace("_{labelId}",this.labelId);
	            this.tmpl = this.tmpl.replace("_{theId}",this.theId);
	        },
	        /**
	         * 初始化
	         */
	        startup:function(){
	            this.mixedDataTemplate();
	            this.buildCoordinate();
	            this.render();
	            this.postCreate();
	        },
	        /**
	         * @param data canvas路径坐标点数据信息
	         */
	        render: function(){
	            this.domNode = $(this.tmpl);
                this.option && this.option.parentNode && this.placeAt(this.option.parentNode);//zto ***** 针对ie8 canvas在次渲染
                this.labelNode = this.domNode.find(".label-content");//赋值作用
	            this.rendCanvas(this.option && this.option.select);
                this.renderDomNode();
	        },
            /**
             * 渲染canvas
             * active number 0：默认色  1：红色
             */
            rendCanvas: function(active){
                /*获取画布*/
                var canvas = this.domNode.find("canvas").get(0);
                //指定画布大小
                canvas.height = this.canvasHeight;
                canvas.width = this.canvasWidth+1;
//                canvas.width = this.canvasWidth;

                //canvas 低于ie9的情况一个处理(注：必须在canvas节点已经插入到dom树后才能起作用)
                window.G_vmlCanvasManager && (canvas = window.G_vmlCanvasManager.initElement(canvas));

                //勾画线
                var ctx=canvas.getContext("2d");
                ctx.beginPath();
                active && (ctx.strokeStyle="#e61435");
                ctx.moveTo(this.canvasData.x0,this.canvasData.y0);
                ctx.lineTo(this.canvasData.x1,this.canvasData.y1);
                ctx.lineTo(this.canvasData.x2,this.canvasData.y2);
                ctx.lineWidth = 1;
                ctx.stroke();

                /*ctx.beginPath();
                 ctx.fillStyle = "#FFFFFF";
                 ctx.arc(data.x0,data.y0,10,0,2*Math.PI,true);
                 ctx.fill();*/
            },
	        /**
	         * 根据比例值求出canvas路经坐标点
	         */
	        buildCoordinate: function(){
	            var x0,y0,x1,y1,x2,y2,
	                y2Height = this.shortHeight,/*垂直短线的长度*/
	                y1Height = this.formatNum(this.canvasHeight-y2Height);/*斜线的垂直长度*/
	            switch(this.direction){
	                /*右上*/
	                case 1:
	                    x0 = 0;
	                    y0 = this.canvasHeight;
	                    x1 = x2 = this.canvasWidth;
	                    y1 = y2Height;
	                    y2 = 0;
	                    break;
	                /*右下*/
	                case 3:
	                    x0 = y0 = 0;
	                    x1 = x2 = this.canvasWidth;
	                    y1 = y1Height;
	                    y2 = this.canvasHeight;
	                    break;
	                /*左下*/
	                case 5:
	                    x0 = this.canvasWidth;
	                    y0 = 0;
	                    x1 = x2 = 0;
	                    y1 = y1Height;
	                    y2 = this.canvasHeight;
	                    break;
	                /*左上*/
	                case 7:
	                    x0 = this.canvasWidth;
	                    y0 = this.canvasHeight;
	                    x1 = x2 = 0;
	                    y1 = y2Height;
	                    y2 = 0;
	                    break;
	            }
	            this.canvasData = {x0:x0,y0:y0,x1:x1,y1:y1,x2:x2,y2:y2};
	        },
	        formatNum: function(num){
	            return Math.round(num)||0;
	        },
	        postCreate: function(data){
                //如果标签id和父页面点击标签的id相同，更改其为选中状态
//	            this.vdid == this.labelId && this.domNode.find("[label-id="+this.vdid+"]").css("backgroundColor","#e83552");
                this.option && this.option.select && this.domNode.toggleClass("active");
	        },
	        /**
	         * 渲染容器的定位
	         */
	        renderDomNode: function(){
	            /*跟节点属性*/
	            var domNode = {};
	            /*标签属性*/
//	            var contentPadding = Math.floor(this.contentPadding/2);
	                var labelContent = {
	                   /* "paddingLeft": contentPadding,
	                    "paddingRight": contentPadding,
	                    "paddingTop": this.contentPadding,
	                    "paddingBottom": this.contentPadding,*/
	                    "width": this.contentWidth
                    },offset=this.canvasWidth/4;
	            /*圆点属性*/
	            var circleIcon = {},val = -3;
	            switch(this.direction){
	                /*右上*/
	                case 1:
	                    domNode["left"] = this.circleX;
	                    domNode["top"] = this.circleY-this.canvasHeight;
	                    circleIcon = {
	                        bottom: val,
	                        left: val
	                    };
	                    labelContent["bottom"] = this.canvasHeight;
                        labelContent["left"] = offset;
	                    break;
	                /*右下*/
	                case 3:
	                    domNode["left"] = this.circleX;
	                    domNode["top"] = this.circleY;
	                    circleIcon = {
	                        top: val,
	                        left: val
	                    };
	                    labelContent["top"] = this.canvasHeight;
                        labelContent["left"] =  offset;
	                    break;
	                /*左下*/
	                case 5:
	                    domNode["left"] = this.circleX-this.domNode.width();
	                    domNode["top"] = this.circleY;
	                    circleIcon = {
	                        top: val,
	                        right: val
	                    };
	                    labelContent["top"] = this.canvasHeight;
	                    labelContent["right"] =  offset;
	                    break;
	                /*左上*/
	                case 7:
	                    domNode["left"] = this.circleX-this.domNode.width();
	                    domNode["top"] = this.circleY-this.canvasHeight;
	                    circleIcon = {
	                        bottom: val,
	                        right: val
	                    };
	                    labelContent["bottom"] = this.canvasHeight;
	                    labelContent["right"] =  offset;
	                    break;
	            }
	            this.domNode.css(domNode);
	            this.domNode.find(".circle-icon").css(circleIcon);
	            this.domNode.find(".label-content-bottom-left").css({width:labelContent.width-5});
                this.labelNode.css(labelContent);
	        },
	        /**
	         * 添加到指定的dom
	         * @param node（class or node）
	         */
	        placeAt: function(node){
	            switch(typeof node) {
	                case "string":
	                    node = $("."+node);
	                    break;
	                case "object":
	                    node = $(node);
	                    break;
	            }
	            node?node.append(this.domNode):"";
	        }
	    };
	    return Label;
	})(framePro);
});