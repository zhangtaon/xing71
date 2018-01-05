/*TMODJS:{"version":23,"md5":"4c7ad47c7a3c50116d37a7691e9a8859"}*/
template('shareVenus',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+=' <div class="container-fluid"> ';
include('./public/header');
$out+=' ';
include('./public/collocationMap');
$out+=' ';
include('./public/footer');
$out+=' </div> ';
return new String($out);
});