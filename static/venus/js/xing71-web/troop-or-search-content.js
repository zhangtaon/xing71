/**
 * web站中间内容大模块（包括轮播区域和瀑布流区域）
 * Created by ZTO on 2015/4/20.
 */
define(function(require, exports, module){
    return (function($){
        return function(data,parentNode){
            var webTmpl = require("tpl/xing71-web.tmpl");
            var comm = require("js/common");
            var name = data.key?data.key:data.troopJson?data.troopJson.name:"";
            data["menus"] = [{name:"首页",url:"/web/index/"}];
            if(data.type=="daily"){
                data["menus"].push({name:"最佳搭配",url:""})
            }else{
                data["menus"].push({name:name + "的全部搭配",url:""})
            }

            data.url = comm.getPicCdnDomainUrl(data.troopJson.icon,data.config.picCdnDomains,50,50);
            var domNode = $(webTmpl("public/troop-or-search-content",data));

            parentNode.append(domNode);


            /*if(data.type == "troop"){
                data["loadUrl"] = "/web/getindexdatas.json";
                data["currentTpid"] = data.troopJson.id;
            }else{
                data["loadUrl"] = "/web/somore.json";
            }*/

            switch (data.type){
                //团
                case "troop":
                    data["loadUrl"] = "/share/data/waterfallData.json";
                    data["currentTpid"] = (data.troopJson && data.troopJson.id);
                    break;
                //搜索
                case "so":
                    data["loadUrl"] = "/web/somore.json";
                    break;
                //每日最佳
                case "daily":
                    data["loadUrl"] = "/web/dailytopmore.json";
                    break;
            }

//            data.details = [{"id":878,"source":0,"user":{"level":1,"uid":2322795,"headFace":0,"nick":"L.J.K","rcode":1999,"fashion":0},"status":10,"home":0,"mid":222593,"commentCount":0,"descrp":"测试","amount":0,"pubTime":1429585200000,"laudCount":0,"auth":0,"safe":0,"venusDetails":null,"lauded":0},{"id":877,"source":0,"user":{"level":1,"uid":2322795,"headFace":0,"nick":"L.J.K","rcode":1999,"fashion":0},"status":10,"home":0,"mid":222592,"commentCount":0,"descrp":"测试","amount":0,"pubTime":1429585200000,"laudCount":0,"auth":0,"safe":0,"venusDetails":null,"lauded":0},{"id":432,"source":0,"user":{"level":1,"uid":150491,"headFace":199077,"nick":"happyman","rcode":1999,"fashion":0},"status":10,"home":0,"mid":221312,"commentCount":21,"descrp":"好美好美！！！好美好美！！！好美好美！！！好美好美！！！好美好美！！！好美好美！！！好美好美！！！好美好美！！！","amount":0,"pubTime":1429326000000,"laudCount":13,"auth":0,"safe":0,"venusDetails":[{"name":"ABC","id":951,"type":1,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":959,"amount":0,"fashion":0,"answer":null,"x":1680,"y":2220,"d":1},{"name":"肌肉男","id":2003,"type":1,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":1527,"amount":0,"fashion":0,"answer":null,"x":2560,"y":7860,"d":1},{"name":"精品购物","id":952,"type":3,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":896,"amount":0,"fashion":0,"answer":null,"x":1733,"y":2100,"d":1},{"name":"地点团团","id":1019,"type":3,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":885,"amount":0,"fashion":0,"answer":null,"x":560,"y":320,"d":3},{"name":"大屯","id":1302,"type":3,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":93,"amount":0,"fashion":0,"answer":null,"x":2446,"y":7780,"d":5},{"name":"test风格","id":953,"type":4,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":850,"amount":0,"fashion":0,"answer":null,"x":2373,"y":3940,"d":5},{"name":"英伦","id":1035,"type":5,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":826,"amount":0,"fashion":0,"answer":null,"x":746,"y":8860,"d":1},{"name":"早春搭配","id":1986,"type":5,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":1523,"amount":0,"fashion":0,"answer":null,"x":4480,"y":5220,"d":1}],"lauded":0},{"id":846,"source":0,"user":{"level":6,"uid":151685,"headFace":221203,"nick":"醉凡尘","rcode":1999,"fashion":3121},"status":10,"home":0,"mid":220825,"commentCount":0,"descrp":"时光机","amount":0,"pubTime":1429241100000,"laudCount":0,"auth":0,"safe":0,"venusDetails":null,"lauded":0},{"id":823,"source":0,"user":{"level":3,"uid":151681,"headFace":221625,"nick":"ishehui1","rcode":1999,"fashion":162},"status":10,"home":1,"mid":222408,"commentCount":5,"descrp":"BOX004","amount":0,"pubTime":1429088400000,"laudCount":6,"auth":0,"safe":0,"venusDetails":[{"name":"范·迪赛尔","id":1905,"type":1,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":1508,"amount":0,"fashion":0,"answer":null,"x":3181,"y":4540,"d":1},{"name":"Oscar De La Renta粉色抹胸刺绣曳地礼服","id":1906,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"Oscar De La Renta","theId":487,"amount":12121212,"fashion":0,"answer":null,"x":5882,"y":2819,"d":1},{"name":"SWAROVSKI 镶钻水晶重工双圈戒指","id":1907,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"施华洛世奇","theId":738,"amount":1299,"fashion":0,"answer":null,"x":2566,"y":1660,"d":1},{"name":"SWAROVSKI 金色镶钻耳钉","id":1908,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"施华洛世奇","theId":737,"amount":499,"fashion":0,"answer":null,"x":2245,"y":8800,"d":1}],"lauded":0},{"id":821,"source":0,"user":{"level":3,"uid":151681,"headFace":221625,"nick":"ishehui1","rcode":1999,"fashion":162},"status":10,"home":1,"mid":222407,"commentCount":0,"descrp":"BOX003","amount":0,"pubTime":1429088400000,"laudCount":3,"auth":0,"safe":0,"venusDetails":[{"name":"范·迪赛尔","id":1901,"type":1,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":1508,"amount":0,"fashion":0,"answer":null,"x":2642,"y":1980,"d":1},{"name":"Oscar De La Renta粉色抹胸刺绣曳地礼服","id":1902,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"Oscar De La Renta","theId":487,"amount":12121212,"fashion":0,"answer":null,"x":5195,"y":3700,"d":1},{"name":"Roger Vivier 2014款银色小牛皮手拿包","id":1903,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"Roger Vivier","theId":491,"amount":11111111,"fashion":0,"answer":null,"x":6456,"y":7020,"d":7},{"name":"GENTLE MONSTER 豹纹圆框眼镜","id":1904,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"GENTLE MONSTER","theId":500,"amount":11111111,"fashion":0,"answer":null,"x":5315,"y":2640,"d":7}],"lauded":0},{"id":820,"source":0,"user":{"level":3,"uid":151681,"headFace":221625,"nick":"ishehui1","rcode":1999,"fashion":162},"status":10,"home":1,"mid":222406,"commentCount":0,"descrp":"BOX002","amount":0,"pubTime":1429088400000,"laudCount":2,"auth":0,"safe":0,"venusDetails":[{"name":"范·迪赛尔","id":1897,"type":1,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":1508,"amount":0,"fashion":0,"answer":null,"x":3867,"y":859,"d":1},{"name":"Steve J & Yoni P 2014秋冬花朵印花连衣裙","id":1898,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"Steve J & Yoni P","theId":736,"amount":2999,"fashion":0,"answer":null,"x":4531,"y":2520,"d":1},{"name":"Dior 2014秋冬 Bedior白色手提包","id":1899,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"迪奥","theId":499,"amount":1111111,"fashion":0,"answer":null,"x":3564,"y":2780,"d":3},{"name":"Giuseppe Zanotti 鱼嘴水钻超高防水台高跟鞋","id":1900,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"Oscar De La Renta","theId":490,"amount":121212121,"fashion":0,"answer":null,"x":3897,"y":8920,"d":1}],"lauded":0},{"id":819,"source":0,"user":{"level":3,"uid":151681,"headFace":221625,"nick":"ishehui1","rcode":1999,"fashion":162},"status":10,"home":1,"mid":222405,"commentCount":0,"descrp":"BOX001","amount":0,"pubTime":1429066800000,"laudCount":1,"auth":0,"safe":0,"venusDetails":[{"name":"范·迪赛尔","id":1893,"type":1,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":1508,"amount":0,"fashion":0,"answer":null,"x":2372,"y":2060,"d":1},{"name":"喇叭裤商品","id":1894,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"伊都锦","theId":69,"amount":852145,"fashion":0,"answer":null,"x":5075,"y":840,"d":3},{"name":"范冰冰-连衣裙","id":1895,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":960,"amount":0,"fashion":0,"answer":null,"x":5045,"y":3680,"d":3},{"name":"zhaohe","id":1896,"type":50,"startTime":null,"endTime":null,"status":10,"descrp":"O'clock1","theId":914,"amount":1000,"fashion":0,"answer":null,"x":8378,"y":5180,"d":5}],"lauded":0},{"id":790,"source":0,"user":{"level":2,"uid":2322635,"headFace":218622,"nick":"平","rcode":1000,"fashion":31},"status":10,"home":0,"mid":221743,"commentCount":0,"descrp":"无为用","amount":0,"pubTime":1429002000000,"laudCount":0,"auth":0,"safe":0,"venusDetails":[{"name":"无为","id":1818,"type":4,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":1507,"amount":0,"fashion":0,"answer":null,"x":1180,"y":1360,"d":1}],"lauded":0},{"id":779,"source":0,"user":{"level":2,"uid":2322635,"headFace":218622,"nick":"平","rcode":1000,"fashion":31},"status":10,"home":0,"mid":221226,"commentCount":0,"descrp":"xxi","amount":0,"pubTime":1428915600000,"laudCount":0,"auth":0,"safe":0,"venusDetails":[{"name":"列表测试专用","id":1792,"type":1,"startTime":null,"endTime":null,"status":10,"descrp":"","theId":116,"amount":0,"fashion":0,"answer":null,"x":3483,"y":2280,"d":1}],"lauded":0}]

            var node = domNode.find(".waterfall-flow").get(0);
            var waterfall = require("js/xing71-web/waterfall");
            waterfall(data,$(node));
        };
    })(jQuery);
});