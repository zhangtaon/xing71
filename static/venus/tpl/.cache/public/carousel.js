/*TMODJS:{"version":32,"md5":"083b349ee9243ab076d48bde07dd9ea8"}*/
template('public/carousel',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,items=$data.items,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">  <ol class="carousel-indicators"> ';
$each(items,function(item,i){
$out+=' <li data-target="#carousel-example-generic" data-slide-to="';
$out+=$escape(i);
$out+='" ';
if(!i){
$out+='class="active"';
}
$out+='></li> ';
});
$out+=' </ol>  <div class="carousel-inner" role="listbox"> ';
$each(items,function(item,i){
$out+=' <div class="item ';
if(!i){
$out+='active';
}
$out+='"> <a href="';
$out+=$escape(item.url);
$out+='" target="_blank"><img src="';
$out+=$escape(item.imgUrl);
$out+='" alt="..."></a> <div class="carousel-caption"> </div> </div> ';
});
$out+=' </div>  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev"> <span class="fa fa-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next"> <span class="fa fa-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div> ';
return new String($out);
});