var CCLog = function(info){
    if(console.log){
        console.log(info);
    }
    if(uexWindow.log){
        uexWindow.log(info);
    }
}