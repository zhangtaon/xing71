/*TMODJS:{"version":66,"md5":"90876c5cc8368af0b3632a85e9a55b64"}*/
template('public/groupExtendHeader',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,url=$data.url,logoUrl=$data.logoUrl,name=$data.name,attention=$data.attention,$each=$utils.$each,addresses=$data.addresses,$index=$data.$index,userBrand=$data.userBrand,brand=$data.brand,$out='';$out+='<div class="container-fluid group-header font-big"> <div class="row logo warp"> <div class="col-xs-12"> <div class="pull-left logo-left"> <img src="';
$out+=$escape(url);
$out+='/';
$out+=$escape(logoUrl);
$out+='" width="100%"/> </div> <div class="pull-left logo-center"> <div class="cell"> <div class="star-name">';
$out+=$escape(name);
$out+='</div> <div class="attention">关注：<span>';
$out+=$escape(attention);
$out+='</span></div> </div> </div> <div class="pull-right logo-right table"> <div class="cell"> <span class="btn">+关注</span> </div> </div> </div> </div> <div class="row used addresses warp"> <div class="col-xs-12 clearfix"> <div class="prop table"> <span class="group-text cell">TA去过：</span> </div> <div class="prop-val"> <ul class="clearfix"> ';
$each(addresses,function(name,$index){
$out+=' <li> <img src="';
$out+=$escape(url);
$out+='/address_icon.png"> <span class="group-text">';
$out+=$escape(name);
$out+='</span> </li> ';
});
$out+=' </ul> </div> <div class="more"> > </div> </div> </div> <div class="row used user-brand warp"> <div class="col-xs-12 clearfix "> <div class="prop table"> <span class="group-text cell">TA用过：</span> </div> <div class="prop-val"> <ul class="clearfix"> ';
$each(userBrand,function(brand,$index){
$out+=' <li> <img src="';
$out+=$escape(url);
$out+='/';
$out+=$escape(brand);
$out+='"/> </li> ';
});
$out+=' </ul> </div> <div class="more"> > </div> </div> </div> </div>';
return new String($out);
});