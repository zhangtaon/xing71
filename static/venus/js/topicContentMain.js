define(function(require, exports, module) {
	var MapWidget = require("js/MapWidget");
    var comm = require("js/common");
    return function(datas,config,node){
        var dataStore = comm.resolveData(datas,config);
        new MapWidget(dataStore.data,dataStore.labels,'collocationMap',node);
    };
});