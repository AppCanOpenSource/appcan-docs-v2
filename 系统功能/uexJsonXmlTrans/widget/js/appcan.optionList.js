appcan.define("optionList", function($, exports, module) {
var model_hiddenLine =  '<li style="position: relative;border-bottom:1px solid #BABABA;color: black;display: -webkit-box !important;display: box !important;-webkit-box-align: center;box-align: center; padding:0;min-height: 6em;"  <%if(group){%>data-group="<%=group%>"<%}%> <%if(data.id){%>id="<%=data.id%>"<%}%> data-index="<%=index%>">\
<div class="scroll-bar" data-index="<%=index%>" style="width: 100%;z-index:99;overflow:hidden;background-color: aliceblue;margin-left: 0px; display: -webkit-box !important;display: box !important;-webkit-box-align: center;box-align: center; min-height: 6em;<%if(data.height){%>height:<%=data.height%>;line-height:<%=data.height%>;<%}else{%>height:100%;line-height:100%;<%}%>">\
<%=data.content%>\
</div>\
<div class="scroll-right" data-index="<%=index%>" style="position: absolute;top: 0;right: 0; color: #FFF;display: -webkit-box !important;display: box !important;-webkit-box-align: center;box-align: center;min-height: 6em;<%if(data.height){%>height:<%=data.height%>;line-height:<%=data.height%>;<%}else{%>height:100%;line-height:100%;<%}%>;background:<%=data.hideOption.style.background%>;"><div style="clear:both;font-size:<%=data.hideOption.style.fontSize%>;">\
<%if(Object.prototype.toString.call(data.hideOption.content) === "[object Array]"){%>\
<%data.hideOption.content.length%>\
<%for(var index in data.hideOption.content){%>\
<div style="float:left;"><%=data.hideOption.content[index]%></div>\
<%}%>\
<%}else{%>\
<div><%=data.hideOption.content%></div>\
<%}%>\
</div></div>\
</div>\
</li>';
    
    var bounceState;
    
    var hiddenLineTmp = appcan.view.template(model_hiddenLine);
    var viewid = 1;
    function isWindows() {
        if (!('ontouchstart' in window))
            return true;
    }

    function OptionListView(option) {
        appcan.extend(this, appcan.eventEmitter);
        var self = this;
        self.option = $.extend({
            selector : "body",
            type : "hiddenLine",
            hasIcon : true,
            hasAngle : true,
            hasSubTitle : false,
            hasTouchEffect : true,
            hasCheckbox : false,
            hasRadiobox : false,
            hasControl : false,
            hasGroup:false,
            align : 'left',
            multiLine : 1,
            multiShow : false,
            duration :"300ms",
            id : viewid++
        }, option, true);
        if(uexWindow.getBounce && typeof uexWindow.getBounce === 'function'){
            appcan.window.getBounceStatus(function(dt,dataType,opId){
                bounceState = dt;
            });
        }

        self.ele = $(self.option.selector);
        if (self.option.data) {
            self.set(data);
        }

    };

    OptionListView.prototype = {
        buildListview : function(data,group) {
             
            var container = $("<ul></ul>")
            var self = this;
            var html = (self.option.type == "hiddenLine") ? hiddenLineTmp : hiddenLineTmp;
            for (var i in data) {
                var ele = $(html({
                    data : data[i],
                    option : self.option,
                    index:i,
                    group:group
                }));
                ele[0]["lv_data"] = data[i];
                ele.on('tap', function(evt) {
                    self.itemClick(evt);
                });
                ele.on('longTap', function(evt) {
                    if(evt.currentTarget && $(evt.currentTarget)[0].tagName =="LI"){
                        var index = $(evt.currentTarget).data("index");
                        if(data[index].onLongTap && typeof data[index].onLongTap == "function"){
                            data[index].onLongTap($(evt.currentTarget)[0],index);
                        }else{
                            self.longTapItem(evt);
                        }
                    }
                });
                ele.on('cancleTap', function(evt) {
                    self.longTapItem(evt)
                });
               
                container.append(ele);
            }
            
            var startX = 0,startY = 0,moveX = 0,moveY = 0;
            var delWidth = $(".scrollRight").width();
            var startMarginLeft = 0;
            var scrollEnable = true;//是否允许左右滑动
            var flag = 0;//是否已经计算过角度
            var mousedown = false;
    
            //返回角度
            function angle(start, end) {
                var diff_x = end.x - start.x,
                    diff_y = end.y - start.y;
                return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
            }
    
            $(document).on("touchstart", ".scroll-bar", function(evt) {
                if(bounceState == 1){
                    appcan.window.disableBounce();
                }
                //appcan.window.setMultilPopoverFlippingEnbaled(1);
                if(!self.option.multiShow){
                    var index = $(this).data("index");
                    $(".scroll-bar").not(this).css({
                        '-webkit-transition-duration' : "100ms",
                        marginLeft : 0
                    });
                }
                scrollEnable = true;
                flag = 0;//是否已经计算角度标记
                var touch = evt.touches[0];
                startX = touch.pageX;//起始x坐标
                startY = touch.pageY;//起始Y坐标
                moveX = touch.pageX;//移动X坐标
                moveY = touch.pageY;//移动Y坐标
                startMarginLeft = parseInt($(this)[0].style.marginLeft);//起始marginLeft
                delWidth = $(this).siblings(".scroll-right").width();//
                $(".scroll-bar").css({
                    '-webkit-transition-duration' : "0s"
                });
            });
            $(document).on("touchmove", ".scroll-bar", function(evt) {
                // if(bounceState == 1){
                    // appcan.window.disableBounce();
                // }
                //appcan.window.setMultilPopoverFlippingEnbaled(1);
                if (scrollEnable == false) {
                    return;
                } else {
                    var touch = evt.touches[0];
                    moveX = touch.pageX;
                    moveY = touch.pageY;
                    if (isNaN(startMarginLeft)) {
                        startMarginLeft = 0;
                    }
                    
                    var marginLeft = startMarginLeft + moveX - startX;
                    marginLeft = marginLeft<0?marginLeft:0;//不能滑动到右边界外
                    if (flag == 0) {
                        var startPoint = {
                            x : startX,
                            y : startY
                        };
                        var movePoint = {
                            x : moveX,
                            y : moveY
                        };
                        var angles = angle(startPoint, movePoint);
                        flag = 1;
                        if (parseInt(angles) < -30 || parseInt(angles) > 30) {
                            if(bounceState == 1){
                                appcan.window.enableBounce();
                            }
                            scrollEnable = false;
                        } else {
                            
                            if (parseInt($(this)[0].style.marginLeft) > 0) {
                                return;
                            }
                           
                            $(this).css({
                                '-webkit-transition-duration' : "0s",
                                marginLeft : marginLeft
                            });
                            evt.preventDefault();
                        }
                    } else {
                        if (scrollEnable == false) {
                            return;
                        }
                        if (parseInt($(this)[0].style.marginLeft) > 0) {
                            return;
                        }
                        $(this).css({
                            '-webkit-transition-duration' : "0s",
                            marginLeft : marginLeft
                        });
                    }
                }
    
            });
            $(document).on("touchend", ".scroll-bar", function(evt) {
                if(bounceState == 1){
                    appcan.window.enableBounce();
                }
                //appcan.window.setMultilPopoverFlippingEnbaled(0);
                if (!scrollEnable)
                    return;
                if ((startX - moveX) > delWidth / 2) {
                    $(this).css({
                        '-webkit-transition-duration' : self.option.duration,
                        marginLeft : -delWidth
    
                    }); 
                } else {
                    $(this).css({
                        '-webkit-transition-duration' : self.option.duration,
                        marginLeft : 0
                    });
                } 
            });
            $(document).on("touchcancel", ".scroll-bar", function(evt) {
                if(bounceState == 1){
                    appcan.window.enableBounce();
                }
                //appcan.window.setMultilPopoverFlippingEnbaled(0);
                if (!scrollEnable)
                    return;
                if ((startX - moveX) > delWidth / 2) {
                    $(this).css({
                        '-webkit-transition-duration' : self.option.duration,
                        marginLeft : -delWidth
                    });
                } else {
                    $(this).css({
                        '-webkit-transition-duration' : self.option.duration,
                        marginLeft : 0
                    });
                }
            });    

            $(document).on("mousedown", ".scroll-bar", function(evt) {
                var that = this;
                if(!self.option.multiShow){
                    $(".scroll-bar").css({
                        '-webkit-transition-duration' : "100ms",
                        marginLeft : 0
                    });
                }
                mousedown = true;
                scrollEnable = true;
                flag = 0;
                var touch = evt.touches ? evt.touches[0]:evt;
                startX = touch.pageX;
                startY = touch.pageY;
                moveX = touch.pageX;
                moveY = touch.pageY;
                startMarginLeft = parseInt($(this)[0].style.marginLeft);
                delWidth = $(this).siblings(".scroll-right").width();
            });
            $(document).on("mousemove", ".scroll-bar", function(evt) {
                
                if(!mousedown)
                    return;
                if (scrollEnable == false) {
                    return;
                } else {
                    var touch = evt.touches ? evt.touches[0]:evt;
                    moveX = touch.pageX;
                    moveY = touch.pageY;
                    if (isNaN(startMarginLeft)) {
                        startMarginLeft = 0;
                    }
                    var marginLeft = startMarginLeft + moveX - startX;
                    marginLeft = marginLeft<0?marginLeft:0;//不能滑动到右边界外
                    if (flag == 0) {
                        var startPoint = {
                            x : startX,
                            y : startY
                        };
                        var movePoint = {
                            x : moveX,
                            y : moveY
                        };
                        var angles = angle(startPoint, movePoint);
                        flag = 1;
                        if (parseInt(angles) < -30 || parseInt(angles) > 30) {
                            scrollEnable = false;
                        } else {
                            if (parseInt($(this)[0].style.marginLeft) > 0) {
                                return;
                            } 
                           
                            $(this).css({
                                '-webkit-transition-duration' : "0s",
                                marginLeft : marginLeft
                            });
                            
                        }
                    } else {
                        if (scrollEnable == false) {
                            return true;
                        }
                        if (parseInt($(this)[0].style.marginLeft) > 0) {
                            return;
                        } 
                        $(this).css({
                            '-webkit-transition-duration' : "0s",
                            marginLeft : marginLeft
                        });
                        
                    }
                }
    
            });
            $(document).on("mouseup", ".scroll-bar", function(evt) {
                mousedown = false;
                if (!scrollEnable)
                    return;
                if ((startX - moveX) > delWidth / 2) {
                    $(this).css({
                        '-webkit-transition-duration' : self.option.duration,
                        marginLeft : -delWidth
    
                    }); 
                } else {
                    $(this).css({
                        '-webkit-transition-duration' : self.option.duration,
                        marginLeft : 0
                    });
                } 
            });
            
            return container;
        },
        buildGroupview:function(data){
            var self = this;
            var con = $("<ul></ul>");
            for(var i in data){
                var ele = $(groupLineTmp({
                    data : data[i],
                    option : self.option,
                    index:i
                }));
                con.append(ele);
                con.append(self.buildListview(data[i].items,i));
            }
            return con;
        },
        add : function(data, dir) {
            var self = this;
            var container = self.buildListview(data);
            if (dir || dir == 1)
                self.ele.append(container)
            else {
                var first = self.ele.children().first();
                first.prepend(container);
            };
            return self;
        },
        set : function(data) {
            var self = this;
            if(uexWindow.getBounce && typeof uexWindow.getBounce === 'function'){
                appcan.window.getBounceStatus(function(dt,dataType,opId){
                    bounceState = dt;
                    
                    var container;
                    if(self.option.hasGroup){
                        container = self.buildGroupview(data);
                    }
                    else{
                        container = self.buildListview(data);
                    }
                    
                    self.ele.html(container);
                    
                    //点击右边隐藏部分执行回调
                    $(".scroll-right").on("tap",function(e){
                        var that = this;
                        var index = $(that).data("index");
                        var length = $(".scroll-right").length;
        
                        if(data[index].hideOption.onClick && typeof data[index].hideOption.onClick == "function"){
                            data[index].hideOption.onClick(e,index,length);
                            e.stopPropagation();
                        }
                    }); 
        
                    return self;
                });
            }else{
                var container;
                if(self.option.hasGroup){
                    container = self.buildGroupview(data);
                }
                else{
                    container = self.buildListview(data);
                }
                
                self.ele.html(container);
                
                //点击右边隐藏部分执行回调
                $(".scroll-right").on("tap",function(e){
                    var that = this;
                    var index = $(that).data("index");
                    var length = $(".scroll-right").length;
                    if(data[index].hideOption.onClick && typeof data[index].hideOption.onClick == "function"){
                        data[index].hideOption.onClick(e,index,length);
                        e.stopPropagation();
                    }
                }); 
                
    
                return self;
            }
            
        },
        itemClick : function(evt) {
            var self = this;
            var obj = $(evt.currentTarget);
            this.emit("click", self, obj, obj[0]["lv_data"], $(evt.target));
        },
        longTapItem : function(evt) {
            if (this.option.hasTouchEffect) {
                var obj = $(evt.currentTarget);
                obj.removeClass(this.option.touchClass);
            }
        },delete : function(e){
            if(e.currentTarget){
                $(e.currentTarget).parent("li").remove();
            }
        }
        
    }
    module.exports = function(option) {
        return new OptionListView(option);
    };
});
