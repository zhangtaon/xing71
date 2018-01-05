/**
 * 公共模块
 * 获取搭配图数据对象
 * 组织图片域的url
 * author zto
 */
define(function(require, exports, module) {

        return {
            webLabelTypes: [1,3,4,5,50],
            get: function(option,data){
                return $.ajax({
                    async:true,
                    cache:false,
                    url:option.url,
                    data:data,
                    type:"get",
                    context: option.context||this
                });
            },
            /**
             * 获取字符串的长度按中文字符为一个的长度（每个英文字母相当于半个中文）
             * @param str
             */
            getTextLength: function (str) {
                var realLength=0;
                for (var i = 0; i < str.length; i++) {
                    var charCode = str.charCodeAt(i);
                    if (charCode >= 0 && charCode <= 128){
                        realLength += 0.5;
                    }else {
                        realLength += 1;
                    }
                }
                return realLength;
            },
            /**
             * web
             * 绑定搭配图事件
             * @param containerClass 容器的样式名称
             */
            bindMapEvent: function(containerClass){
//                var troopUrl =  "/web/troop/";
                var troopUrl =  "./troopOrSearch.html?troop";
                var containerNode = $(containerClass);
                containerNode.on("click",".map",function(e){
                    var target = $(e.target);
                    target.hasClass("label-content-top")?target=target.parent():"";
                    var vid = $(e.currentTarget).attr("vid");
//                    var venusDetailUrl =  "/web/venus/"+vid+"/";
                    var venusDetailUrl =  "./singleProductDetails.html";

                    var isLabelContent = target.hasClass("label-content");
                    var isLabelText = target.hasClass("label-text");
                    isLabelContent&&(window.open(venusDetailUrl+"?vdid="+target.attr("label-id")));
//                    isLabelText&&(window.open(troopUrl+target.attr("the-id")+"/"));
                    isLabelText&&(window.open(troopUrl));
                    !isLabelContent && !isLabelText && (window.open(venusDetailUrl));
                });

                containerNode.on("click",".collocation-map-bottom",function(e){
                    var target = $(e.target);
                    var isMapStyle = target.hasClass("map-style");
                    isMapStyle && (window.open(troopUrl+target.attr("the-id")+"/"));
                    var isAddress = target.hasClass("address-span");
                    isAddress && (window.open(troopUrl+target.attr("the-id")+"/"));
                });
                return true;
            },
            /**
             * wap
             * 绑定页面响应事件，搭配图分享系列专用（点击跳转下载页）
             * @param downUrl
             */
            bindDownloadEvent: function(downUrl){
                var clickEvent = function(){
                    window.location.href = downUrl;
                };
                $("body").on("click",".container-fluid",clickEvent);
            },
            /**
             * 根据mid获取图片的完整路径 （宽高如果不指定的话默认按设备的宽度作为图片的宽度，宽高比例为3:4，以此来计算高度）
             * @param mid 图片mid，用来生成图片的url
             * @param picCdnDomains 生成图片地址function
             * @param w 图片的宽度
             * @param h 图片的高度
             * @param type 裁切还是缩放（1：裁切；2：缩放）
             * @returns {string} 图片url
             */
            getPicCdnDomainUrl: function (mid,picCdnDomains,w,h,type){
                /*
                w && !h && (h=Math.floor(w/3*4));//暂时web端使用
                if(!w && !h){//手机端时使用
                    w = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                    w<480 && (w=480,h=640);
                    w>480 && (h=Math.floor(w/3*4));
                }
                var picCdnDomains = picCdnDomains.split(",");
                var index = mid % picCdnDomains.length;
                return picCdnDomains[index]+"c/"+mid+"_"+ (w||0)+"_"+(h||0)+"_"+(type||1)+"_80.jpg";
                */
                if(typeof mid == "string"){
                    return "./static/venus/image/timer/"+mid;
                }else{
                    return "./static/venus/image/timer/"+mid+".jpg";
                }
            },
            /**
             * 解析搭配图初始化所需要的数据
             * @param datas 后台数据    example： {"id":411,"user":{"level":1,"uid":150491,"headFace":199077,"nick":"happyman","rcode":1999,"fashion":0},"status":10,"home":0,"mid":221244,"commentCount":29,"descrp":"的非官方的华国锋和规范化222222222222222222222222222","pubTime":1426647600000,"laudCount":1,"venusDetails":[{"name":"老农民","id":888,"type":1,"startTime":null,"endTime":null,"descrp":null,"theId":893,"amount":0,"fashion":0,"x":746,"y":9080,"d":1,"answer":null},{"name":"测试1","id":918,"type":1,"startTime":null,"endTime":null,"descrp":null,"theId":932,"amount":0,"fashion":0,"x":3093,"y":5860,"d":1,"answer":null},{"name":"地点团哈哈","id":889,"type":3,"startTime":null,"endTime":null,"descrp":null,"theId":883,"amount":0,"fashion":0,"x":5306,"y":7660,"d":1,"answer":null},{"name":"狐猴团1515","id":890,"type":5,"startTime":null,"endTime":null,"descrp":null,"theId":826,"amount":0,"fashion":0,"x":7893,"y":8980,"d":1,"answer":null},{"name":"喇叭裤商品","id":891,"type":50,"startTime":null,"endTime":null,"descrp":"伊都锦","theId":69,"amount":852145,"fashion":0,"x":6240,"y":2800,"d":1,"answer":null},{"name":"Generic H2 (Server)","id":894,"type":50,"startTime":null,"endTime":null,"descrp":"朱塞佩·萨诺第","theId":917,"amount":111100,"fashion":0,"x":5386,"y":3300,"d":1,"answer":null}],"lauded":0};
             * 				 example.config 配置文件 {
                                            url:"$resourcev.url/xingji/asset/static/venus/image/share",
                                            picCdnDomains:'${resourcev.picCdnDomains}',
                                            downUrl:"$downUrl"
                                        };
         * @param vd
         * @returns {{data: {star: Array, place: string, style: Array, descrp: string}, labels: Array}}
         */
        resolveData :function(datas,types){
            var data={stars:[],place:"",style:[],descrp:""},
                labels=[],types = types || [1,3,4,5,50,60,61,62];
            if(datas.venusDetails && datas.venusDetails.length>0){
                datas.venusDetails.forEach(function(item){
                    item.name = item.name || "";
                    item.descrp = item.descrp || "";

                    for (var i=0;i<types.length;i++){
                        //明星-1
                        if(item.type==types[i] && item.type==1){
                            data.stars.push({starName:item.name,starId:item.id,theId:item.theId});
                            break;
                        }
                        //地点-3
                        if(item.type==types[i] && item.type==3){
                            data.place = item;
                            break;
                        }
                        //风格-4
                        if((item.type==types[i] && item.type==4) || (item.type==types[i] && item.type==5)){
                            data.style.push({name:item.name,theId:item.theId});
                            break;
                        }
                        //商品-50
                        if(item.type==types[i] && item.type==50){
                            labels.push({d:item.d,x:item.x,y:item.y,descr:item.name,labelId:item.id,theId:item.theId});
                            break;
                        }
                        //红包-60
                        if(item.type==types[i] && item.type==60){
                            labels.push({d:item.d,x:item.x,y:item.y,descr:"领红包"});
                            break;
                        }
                        //悬赏-61；猜字-62
                        if((item.type==types[i] && item.type==61) || (item.type==types[i] && item.type==62)){
                            labels.push({d:item.d,x:item.x,y:item.y,descr:item.descrp,labelId:item.id});
                            break;
                        }
                    };
                    /*
                    switch (item.type){
                        case 1:
                            data.stars.push({starName:item.name,starId:item.id,theId:item.theId});
//                            data.stars.push(item.name);
//							mapData.stars.push(item.name);
                            break;
                        case 3:
                            data.place = item;
                            break;
                        case 4:
                        case 5:
                            data.style.push({name:item.name,theId:item.theId});
                            break;
                        case 50:
                            labels.push({d:item.d,x:item.x,y:item.y,descr:item.name,labelId:item.id,theId:item.theId});
                            break;
                        case 60:
                            labels.push({d:item.d,x:item.x,y:item.y,descr:"领红包"});
                            break;
                        case 61:
                        case 62:
                            labels.push({d:item.d,x:item.x,y:item.y,descr:item.descrp,labelId:item.id});
                            break;
                    }
                    */
                });
            }
            data["url"]=datas.config.url;
            data["vid"]=datas.id;
            data["laudCount"]=datas.laudCount||"还没有被";
            data["descrp"]=datas.descrp;
            data["mapUrl"]=this.getPicCdnDomainUrl(datas.mid,datas.config.picCdnDomains,datas["w"],datas["h"]);

            return {data:data,labels:labels};
        }
    };
});