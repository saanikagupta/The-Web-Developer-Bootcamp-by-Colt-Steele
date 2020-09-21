colors = ["red", "yellow", "green", "purple", "pink"];

function callbackFunction(item, index, array){
    console.log("index: ", index, "item: ", item, "array: ", array);
}

Array.prototype.myForEach = function(callbackFunction){
    for(let i = 0; i < this.length; i++){
        (callbackFunction)(this[i], i, this);
    }
}

colors.myForEach(callbackFunction);