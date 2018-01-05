/*TMODJS:{"version":7,"md5":"9a4e8bd0f4ae02d4318a474321ad4821"}*/
template('public/empty',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,url=$data.url,laudCount=$data.laudCount,$each=$utils.$each,style=$data.style,value=$data.value,i=$data.i,place=$data.place,descrp=$data.descrp,$out='';$out+='<div class="row"> <div class="col-xs-12 warp"> <div class="praise clearfix"> <div class="pull-left"><img src="';
$out+=$escape(url);
$out+='/zan_icon1.png"/><label>';
$out+=$escape(laudCount);
$out+='</label>人赞过</div> ';
$each(style,function(value,i){
$out+=' <div class="pull-right">&nbsp;&nbsp;#';
$out+=$escape(value);
$out+='</div> ';
});
$out+=' </div> <div class="address"> <img src="';
$out+=$escape(url);
$out+='/address_icon.png"/>';
$out+=$escape(place);
$out+=' </div> <div class="description font-big"> <p> ';
$out+=$escape(descrp);
$out+=' </p> </div> <div class="clearfix font-big operation hidden"> <div class="pull-left footer-label"><span></span><img src="';
$out+=$escape(url);
$out+='/zan_icon2.png"/>赞</div> <div class="pull-left footer-label remark"><span></span><img src="';
$out+=$escape(url);
$out+='/remark_icon.png"/>评论<label></label></div> <div class="pull-right footer-label"><span></span>...</div> </div> </div> </div>';
return new String($out);
});