/*TMODJS:{"version":3,"md5":"99290a3c02944c1c97c874ef087742f8"}*/
template('public/singleProduct-detail-content',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,brand=$data.brand,logoUrl=$data.logoUrl,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},items=$data.items,config=$data.config,venus=$data.venus,$out='';$out+='<div class="web-content product-detail"> <div class="content-top"> <div class="container"> <div class="row"> <div class="content-top-left detailMap"></div> <div class="content-top-right"> <div class="right-top"> <div class="label-info clearfix right-top-warp"> <div class="label-name"> ';
$out+=$escape(name);
$out+=' </div> <div class="label-logo"> <a href="';
$out+=$escape(brand.logoLink);
$out+='" target="_blank"><img class="';
if(!logoUrl){
$out+='hidden';
}
$out+='" src="';
$out+=$escape(logoUrl);
$out+='"></a> </div> </div> <div class="right-top-warp clearfix"> <div class="double-line-left"></div> <div class="recommend">推荐同款</div> <div class="double-line-right"></div> </div> <div class="carousel6"> ';
include("./carousel6");
$out+=' </div> <div class="more text-center" ';
if(items.length<6){
$out+='style="display: none"';
}
$out+='> 更多... </div> </div> <div class="right-bottom"> <div class="clearfix user-option" style="margin: 0 auto;width: 535px;"> <div class="lab" style="padding-right: 99px;"><img src="';
$out+=$escape(config.url);
$out+='/home/zan_icon.png">';
$out+=$escape(venus.laudCount);
$out+='人赞过</div> <div class="lab-line"></div> <div class="lab hidden"><img src="';
$out+=$escape(config.url);
$out+='/home/share.png">分享</div> <div class="lab" style="padding-left: 99px"><i></i><a href="/xing71.html" target="_blank">手机端下载</a></div> </div> <div class="slash-bottom"></div> </div> </div> </div> </div> </div> <div class="content-body"> <div class="container"> <div class="row"> <div class="relevant-title"> <div class="relevant-colloctaion-left"></div> <div class="relevant-colloctaion"> 相关搭配 </div> </div> <div class="relevant-maps waterfall-flow"> </div> </div> </div> </div> </div>';
return new String($out);
});