/*TMODJS:{"version":8,"md5":"5287fc19207cb071cbf5dfdc6307b3be"}*/
template('topic',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,url=$data.url,title=$data.title,creator=$data.creator,pubTime=$data.pubTime,$out='';$out+='<div class="container-fluid"> <div class="row"> <div class="col-xs-12"> <div> <img src="';
$out+=$escape(url);
$out+='/share_topic_logo.png" width="100%"/> </div> <div class="container-fluid logo-desc"> <div class="col-xs-8 logo-left"> ';
$out+=$escape(title);
$out+=' </div> <div class="col-xs-4 logo-right"> <div class="logo-right-table pull-right"> <div class="logo-right-cell"> <div>';
$out+=$escape(creator.nick);
$out+='</div> <div>';
$out+=$escape(pubTime);
$out+='</div> </div> </div> </div> </div> </div> </div> <div class="warp"></div> </div> ';
return new String($out);
});