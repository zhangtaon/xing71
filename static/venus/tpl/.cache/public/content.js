/*TMODJS:{"version":27,"md5":"07ca72e0f664c3e2d23a869d35d95455"}*/
template('public/content',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$escape=$utils.$escape,config=$data.config,currentTpid=$data.currentTpid,$each=$utils.$each,styles=$data.styles,style=$data.style,i=$data.i,$out='';$out+='<div class="web-content"> <div class="content-top"> <div class="container"> <div class="row"> <div class="col-xs-8"> ';
include("./carousel");
$out+=' </div> <div class="col-xs-4"> <div class="carousel-right pull-right"> <a href="/xing71.html" target="_blank"><img src="';
$out+=$escape(config.url);
$out+='/home/download.png"/></a> <a href="./troopOrSearch.html" target="_blank"><img src="';
$out+=$escape(config.url);
$out+='/home/daily.png"/></a> </div> </div> </div> </div> </div> <div class="content-body"> <div class="container"> <div class="row"> <div class="star-menu"> <ul class="style-navebar"> <li ';
if(currentTpid=="-1"){
$out+='class="active"';
}
$out+=' tpid=-1><span>全部</span></li> ';
$each(styles,function(style,i){
$out+=' <li ';
if(currentTpid == style.tpid){
$out+='class="active"';
}
$out+=' tpid=';
$out+=$escape(style.tpid);
$out+='><span>';
$out+=$escape(style.tpName);
$out+='</span></li> ';
});
$out+=' </ul> <div class="slash-bottom"></div> </div> <div class="waterfall-flow"> </div> </div> </div> </div> </div>';
return new String($out);
});