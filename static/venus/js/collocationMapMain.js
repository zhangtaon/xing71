/**
 * 搭配图主入口模块（web || wap）
 * author：zto
 */
define(function(require, exports, module) {
	var MapWidget = require("js/MapWidget");
    var comm = require("js/common");
    return function(datas,tmpl,node,option){
        option && (datas["w"] = option.styles.width);//目前星期衣官网会传option参数
        //统一数据处理解析
        var dataStore = comm.resolveData(datas,(option && option.types));
        return new MapWidget(dataStore.data,dataStore.labels,tmpl,node,option);
    };
});