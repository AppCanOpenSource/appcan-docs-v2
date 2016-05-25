function openContainer1(id, top, height){
    var jsonStr = {
        id : id, //容器id
        x : 0, //容器位置x坐标
        y : top, //容器位置y坐标
        w : screen.availWidth, //容器位置w宽度
        h : height //容器位置h高度
    };
    uexWindow.createPluginViewContainer(JSON.stringify(jsonStr));
}