/**
 * Created by ZTO on 2015/4/24.
 */
define(function(require, exports, module){
    !Array.prototype.forEach && (Array.prototype.forEach = function (callback,context) {
        if(!this){
            throw new TypeError("Array.prototype.forEach called on null or undefined")
        }
        if(typeof callback != "function"){
            throw new TypeError("undefined is not a function");
        }
        var i= 0;
        while(i<this.length){
            callback.call(context,this[i],i,this);
            i++;
        }
    });
    !Array.prototype.filter && (Array.prototype.filter = function (callback,context) {
        if(!this){
            throw new TypeError("Array.prototype.filter called on null or undefined")
        }
        if(typeof callback != "function"){
            throw new TypeError("undefined is not a function");
        }
        var i= 0;
        var arr=[];
        var result;
        while(i<this.length){
            result = callback.call(context,this[i],i,this);
            result && arr.push(this[i]);
            i++;
        }
        return arr;
    });
    !Array.prototype.some && (Array.prototype.some = function (callback,context) {
        if(!this){
            throw new TypeError("Array.prototype.filter called on null or undefined")
        }
        if(typeof callback != "function"){
            throw new TypeError("undefined is not a function");
        }
        var i= 0;
        var arr=[];
        var result = false;
        while(i<this.length){
            var r = callback.call(context,this[i],i,this);
            if(r){
                result = r;
                break;
            }
            i++;
        }
        return result;
    });
    return "";
});
