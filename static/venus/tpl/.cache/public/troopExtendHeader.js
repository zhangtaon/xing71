/*TMODJS:{"version":19,"md5":"014807798e0aa04c69aac5076442fde1"}*/
template('public/troopExtendHeader',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,logoUrl=$data.logoUrl,troop=$data.troop,attention=$data.attention,empty=$data.empty,$each=$utils.$each,addresses=$data.addresses,item=$data.item,$index=$data.$index,url=$data.url,userBrand=$data.userBrand,brand=$data.brand,$out='';$out+='<div class="container-fluid group-header font-big"> <div class="row logo warp"> <div class="col-xs-12"> <div class="pull-left logo-left"> <img src="';
$out+=$escape(logoUrl);
$out+='" width="100%"/> </div> <div class="pull-left logo-center"> <div class="cell"> <div class="star-name">';
$out+=$escape(troop.name);
$out+='</div> <div class="attention">关注：<span>';
$out+=$escape(attention);
$out+='</span></div> </div> </div> <div class="pull-right logo-right table"> <div class="cell"> <span class="btn">+关注</span> </div> </div> </div> </div> ';
if(!empty){
$out+=' <div class="row used addresses warp"> <div class="col-xs-12 clearfix"> <div class="prop table"> <span class="group-text cell">TA去过：</span> </div> <div class="prop-val"> <ul class="clearfix"> ';
$each(addresses,function(item,$index){
$out+=' <li> <img src="';
$out+=$escape(url);
$out+='/address_icon.png"> <span class="group-text">';
$out+=$escape(item.name);
$out+='</span> </li> ';
});
$out+=' </ul> </div> <div class="more"> > </div> </div> </div> <div class="row used user-brand warp"> <div class="col-xs-12 clearfix "> <div class="prop table"> <span class="group-text cell">TA用过：</span> </div> <div class="prop-val"> <ul class="clearfix"> ';
$each(userBrand,function(brand,$index){
$out+=' <li> <img src="';
$out+=$escape(brand.url);
$out+='"/> </li> ';
});
$out+=' </ul> </div> <div class="more"> > </div> </div> </div> ';
}
$out+=' ';
if(empty){
$out+=' <div class="row"> <div class="col-xs-12 clearfix"> <div class="empty-icon"> <img src="';
$out+=$escape(url);
$out+='/one.png"> </div> <div class="empty"> <span class="empty-label">空空如也</span> <span class="empty-desc">如果你有"明星名字"的时尚搭配图，可以投稿到op@ishehui.com,采纳有礼品</span> </div> <div class="best-match"> <span>每日最佳搭配</span> </div> </div> </div> ';
}
$out+=' </div>';
return new String($out);
});