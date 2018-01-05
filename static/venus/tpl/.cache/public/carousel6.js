/*TMODJS:{"version":3,"md5":"d14e57d5a88c62e4b158d387f6e08024"}*/
template('public/carousel6',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,items=$data.items,item=$data.item,i=$data.i,$escape=$utils.$escape,id=$data.id,$out='';$out+='<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">  <ol class="carousel-indicators"> ';
$each(items,function(item,i){
$out+=' <li data-target="#carousel-example-generic" data-slide-to="';
$out+=$escape(i);
$out+='" ';
if(!i){
$out+='class="active"';
}
$out+='></li> ';
});
$out+=' </ol>  <div class="carousel-inner" role="listbox"> <div class="item clearfix ';
if(!i){
$out+='active';
}
$out+='" the-id="';
$out+=$escape(id);
$out+='"> ';
$each(items,function(item,i){
$out+=' <div class="item-img"> <a href="';
$out+=$escape(item.tbUrl);
$out+='" isconvert=1 target="_blank"><img src="';
$out+=$escape(item.url);
$out+='" alt="..."></a> <div class="carousel-caption"> <div class="price">￥';
$out+=$escape(item.price);
$out+='</div> <div class="item-img-hover"></div> </div> </div> ';
});
$out+=' </div> </div>  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev"> <span></span>  <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next"> <span></span>  <span class="sr-only">Next</span> </a> </div> ';
return new String($out);
});