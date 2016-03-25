var CCLog = function(data){
    if(console.log){
        console.log(data);
    }
    if(uexWindow.log){
        uexWindow.log(data);
    }
}