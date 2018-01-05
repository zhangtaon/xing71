/*TMODJS:{"version":3,"md5":"e5588b67ea18c2c0704f3685164dce97"}*/
template('public/troop-or-search-content',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,menus=$data.menus,menu=$data.menu,i=$data.i,$escape=$utils.$escape,troopJson=$data.troopJson,url=$data.url,config=$data.config,$out='';$out+='<div class="web-content troop"> <div class="content-top"> <div class="container"> <div class="row"> <div class="troop-navbar"> <ol class="breadcrumb"> ';
$each(menus,function(menu,i){
$out+=' <li ';
if(i==menus.length-1){
$out+='class="active"';
}
$out+='> ';
if(i!=menus.length-1){
$out+=' <a href="';
$out+=$escape(menu.url);
$out+='"> ';
}
$out+=' ';
$out+=$escape(menu.name);
$out+=' ';
if(i!=menus.length-1){
$out+=' </a> ';
}
$out+=' </li> ';
});
$out+=' </ol> </div> </div> ';
if(troopJson){
$out+=' <div class="row troop-star"> <div class="troop-star-content clearfix"> <div class="pull-left star-name"> <img src="';
$out+=$escape(url);
$out+='">';
$out+=$escape(troopJson.name);
$out+=' </div> <div class="attention pull-right"> <img src="';
$out+=$escape(config.url);
$out+='/home/diamond.png"><span>关注：</span><span class="num">';
$out+=$escape(troopJson.followCount);
$out+='</span> </div> <div class="same-paragraph pull-right"> <img src="';
$out+=$escape(config.url);
$out+='/home/diamond.png"><span>同款：</span><span class="num">';
$out+=$escape(troopJson.itemCount);
$out+='</span> </div> <div class="collocation pull-right"> <img src="';
$out+=$escape(config.url);
$out+='/home/diamond.png"><span>搭配：</span><span class="num">';
$out+=$escape(troopJson.venusCount);
$out+='</span> </div> </div> <div class="slash-bottom"></div> </div> ';
}
$out+=' </div> </div> <div class="content-body"> <div class="container"> <div class="row"> <div class="waterfall-flow"> </div> </div> </div> </div> </div>';
return new String($out);
});