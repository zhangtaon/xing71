/*TMODJS:{"version":9,"md5":"e7bcdb472cee5176c1d1d5da1debcdca"}*/
template('troopExtend',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="container-fluid"> ';
include('./public/collocationMap');
$out+=' ';
include('./public/footer');
$out+=' </div> ';
return new String($out);
});