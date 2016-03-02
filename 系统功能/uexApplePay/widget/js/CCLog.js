var CCLog = function(info){
    console.log(info);
    if(uexWindow.log){
        uexWindow.log(info);
    }
}