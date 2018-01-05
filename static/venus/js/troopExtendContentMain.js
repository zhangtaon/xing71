define(function(require, exports, module) {
	
	var MapWidget = require("js/MapWidget");
    var comm = require("js/common");
    return function(datas,config){
        var dataStore = comm.resolveData(datas,config);
        dataStore.data["footer"] = true;
        new MapWidget(dataStore.data,dataStore.labels,'troopExtend');
    };
});