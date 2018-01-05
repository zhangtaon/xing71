/*TMODJS:{"version":12,"md5":"71247a0d83fffd358501067a22447ed9"}*/
template('groupExtend',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+=' <div class="container-fluid"> ';
include('./public/collocationMap');
$out+=' ';
include('./public/footer');
$out+=' </div> ';
return new String($out);
});