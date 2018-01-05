/*TMODJS:{"version":3,"md5":"fb3b903cdca7862ea830c36899693560"}*/
template('public/carousel6Item',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,$each=$utils.$each,items=$data.items,item=$data.item,i=$data.i,$out='';$out+='<div class="item clearfix" the-id="';
$out+=$escape(id);
$out+='"> ';
$each(items,function(item,i){
$out+=' <div class="item-img"> <a href="';
$out+=$escape(item.tbUrl);
$out+='" isconvert=1 target="_blank"><img src="';
$out+=$escape(item.url);
$out+='" alt="..."></a> <div class="carousel-caption"> <div class="price">￥';
$out+=$escape(item.price);
$out+='</div> </div> <div class="item-img-hover"></div> </div> ';
});
$out+=' </div>';
return new String($out);
});