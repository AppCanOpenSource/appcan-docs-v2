    function openCustom1(){
        var w = window.screen.width;
        var h = window.screen.height-100;
        var top = 400;
        var params = {
            listViewId:1,
            left: 0,//(必选) 左间距
            top: top,//(必选) 上间距
            width:w,//(必选) 宽
            height:h-top,//(必选) 高
            swipeMode:3,//(可选) 侧滑模式，0-右滑，1-左滑，2-左右滑，3-不能滑。默认3
            refreshMode:0,//(可选) 刷新模式，0-无，1-下拉，2-上拉，3-上拉下拉。默认3
            layout:{//(必选) 布局
                center:[
                    {
                        type:1,
                        src:"res://case1/layout_item1.xml"
                    },
                    {
                        type:2,
                        src:"res://case1/layout_item2.xml"
                    }
                ]
            },
            data:[//列表数据
                {
                    center:{
                        type:1,
                        elementData:[
                            {
                                elementType:"text",
                                id:"txt1",
                                text:"景点"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:2,
                        elementData:[
                            {
                                id:"txt2-1",
                                elementType:"text",
                                text:"东圣九州国际大饭店"
                            },
                            {
                                id:"txt2-2",
                                elementType:"text",
                                text:"大面山"
                            },
                            {
                                id:"linearlayout2-1",
                                elementType:"linearlayout",
                                bgImg:"res://case1/BaDongQian.jpg"
                            },
                            {
                                id:"linearlayout2-2",
                                elementType:"linearlayout",
                                bgImg:"res://case1/BaDongQian.jpg"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:2,
                        elementData:[
                            {
                                id:"txt2-1",
                                elementType:"text",
                                text:"巴黎金苑大厦"
                            },
                            {
                                id:"txt2-2",
                                elementType:"text",
                                text:"无源洞"
                            },
                            {
                                id:"linearlayout2-1",
                                elementType:"linearlayout",
                                bgImg:"res://case1/BaDongQian.jpg"
                            },
                            {
                                id:"linearlayout2-2",
                                elementType:"linearlayout",
                                bgImg:"res://case1/BadongChu.jpg"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:2,
                        elementData:[
                            {
                                id:"txt2-1",
                                elementType:"text",
                                text:"三里城"
                            },
                            {
                                id:"linearlayout2-1",
                                elementType:"linearlayout",
                                bgImg:"res://case1/BadongChu.jpg"
                            },
                            {
                                id:"linearlayout2-2",
                                elementType:"linearlayout",
                                visible:1
                            }
                        ]
                    }
                }
            ],
            scrollPicture:{
                interval:"2000",
                height:400,
                width:1080,
                urls:["res://case1/BadongChu.jpg","res://case1/BaDongQian.jpg","res://case1/BadongChu.jpg","res://case1/BaDongQian.jpg"],
                viewId:"1"
            }
        };
        var data = JSON.stringify(params);
        uexNBListView.openCustom(data);
    }

    function openCustom2(){
        var w = window.screen.width;
        var h = window.screen.height-100;
        var top = 400;
        var params = {
            listViewId:2,
            left: 0,//(必选) 左间距
            top: top,//(必选) 上间距
            width:w,//(必选) 宽
            height:h-top,//(必选) 高
            swipeMode:3,//(可选) 侧滑模式，0-右滑，1-左滑，2-左右滑，3-不能滑。默认3
            refreshMode:0,//(可选) 刷新模式，0-无，1-下拉，2-上拉，3-上拉下拉。默认3
            layout:{//(必选) 布局
                center:[
                    {
                        type:1,
                        src:"res://case1/layout_item3.xml"
                    },
                    {
                        type:2,
                        src:"res://case1/layout_item4.xml"
                    },
                    {
                        type:3,
                        src:"res://case1/layout_item5.xml"
                    }
                ]
            },
            data:[//列表数据
                {
                    center:{
                        type:3
                    }
                },
                {
                    center:{
                        type:1,
                        elementData:[
                            {
                                elementType:"img",
                                id:"icon",
                                imgSrc:"res://case1/collect.png"
                            },
                            {
                                elementType:"text",
                                id:"description",
                                text:"我的收藏"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:1,
                        elementData:[
                            {
                                elementType:"img",
                                id:"icon",
                                imgSrc:"res://case1/comment.png"
                            },
                            {
                                elementType:"text",
                                id:"description",
                                text:"我的评论"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:1,
                        elementData:[
                            {
                                elementType:"img",
                                id:"icon",
                                imgSrc:"res://case1/journal.png"
                            },
                            {
                                elementType:"text",
                                id:"description",
                                text:"我的游记"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:2
                    }
                },
                {
                    center:{
                        type:1,
                        elementData:[
                            {
                                elementType:"img",
                                id:"icon",
                                imgSrc:"res://case1/phone.png"
                            },
                            {
                                elementType:"text",
                                id:"description",
                                text:"帮助中心"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:1,
                        elementData:[
                            {
                                elementType:"img",
                                id:"icon",
                                imgSrc:"res://case1/shezhi.png"
                            },
                            {
                                elementType:"text",
                                id:"description",
                                text:"意见反馈"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:2
                    }
                }
            ]
        };
        var data = JSON.stringify(params);
        uexNBListView.openCustom(data);
    }