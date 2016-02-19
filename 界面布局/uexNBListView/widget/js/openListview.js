var listViewId1 = "index0";
var listViewId2 = "index1";
var listViewId3 = "video0";
var listViewId4 = "video1";
var listViewId5 = "topic0";
var listViewId6 = "topic1";
var listViewId7 = "me";
var isOpen4 = false;
var meHeight = 0;

function showMe(height){
    meHeight = height;
    if(isOpen4){
        showMeListView(listViewId7);
    }else{
        initMeLayout(listViewId7);
    }
}

function hideMe(){
    hideMeListView(listViewId7);
}

function openIndexListView(containerId, top, height){
    if(containerId == 1){
        initIndexLayout(listViewId1);
        initIndexLayout(listViewId2);
    }else if(containerId == 2){
        initVideoLayout(listViewId3);
        initVideoLayout(listViewId4);
    }else if(containerId == 3){
        initTopicLayout1(listViewId5);
        initTopicLayout2(listViewId6);
    }

    uexNBListView.cbInitLayout = function(data){
        var data = JSON.parse(data);
        if(data.errorCode == 0){
            if(data.listViewId == listViewId1){
                setIndexItem1(listViewId1);
            }else if(data.listViewId == listViewId2){
                setIndexItem2(listViewId2);
            }else if(data.listViewId == listViewId3){
                setVideoItem1(listViewId3);
            }else if(data.listViewId == listViewId4){
                setVideoItem2(listViewId4);
            }else if(data.listViewId == listViewId5){
                setTopicItem1(listViewId5);
            }else if(data.listViewId == listViewId6){
                setTopicItem2(listViewId6);
            }else if(data.listViewId == listViewId7){
                setMeItem(listViewId7);
            }
        }
    }

    uexNBListView.cbSetItems = function(data){
        var data = JSON.parse(data);
        if(data.errorCode == 0){
            if(data.listViewId == listViewId1){
                openIndex(listViewId1, containerId, 0, top, height);
            }else if(data.listViewId == listViewId2){
                openIndex(listViewId2, containerId, 1, top, height);
            }else if(data.listViewId == listViewId3){
                openIndex(listViewId3, containerId, 0, top, height);
            }else if(data.listViewId == listViewId4){
                openIndex(listViewId4, containerId, 1, top, height);
            }else if(data.listViewId == listViewId5){
                openIndex(listViewId5, containerId, 0, top, height);
            }else if(data.listViewId == listViewId6){
                openIndex(listViewId6, containerId, 1, top, height);
            }else if(data.listViewId == listViewId7){
                openMe(listViewId7, top, meHeight);
            }
        }
    }

    uexNBListView.cbOpen = function(data){
        var data = JSON.parse(data);
        if(data.errorCode == 0){
            //alert(data.listViewId);
        }
        if(data.listViewId == listViewId7){
            isOpen4 = true;
        }
    }
}

function initIndexLayout(id){
    var params = {
        listViewId:id,
        layout:{
            center:["res://layout_index_item1.xml",
            "res://layout_index_item2.xml",
            "res://layout_index_item3.xml"]
        }
    }
    uexNBListView.initLayout(JSON.stringify(params));
}

function initVideoLayout(id){
    var params = {
        listViewId:id,
        layout:{
            center:["res://layout_video_item1.xml"]
        }
    }
    uexNBListView.initLayout(JSON.stringify(params));
}

function initTopicLayout1(id){
    var params = {
        listViewId:id,
        layout:{
            center:["res://layout_topic_item1.xml","res://layout_topic_item2.xml"]
        }
    }
    uexNBListView.initLayout(JSON.stringify(params));
}

function initTopicLayout2(id){
    var params = {
        listViewId:id,
        layout:{
            center:["res://layout_topic_item3.xml","res://layout_topic_item4.xml"
            ,"res://layout_topic_item5.xml"]
        }
    }
    uexNBListView.initLayout(JSON.stringify(params));
}

function initMeLayout(id){
    var params = {
        listViewId:id,
        layout:{
            center:["res://layout_me.xml", "res://layout_me1.xml"]
        }
    }
    uexNBListView.initLayout(JSON.stringify(params));
}

function setIndexItem1(id){
    var params = {
        listViewId:id,
        dataList:[
            {
                center:{
                    "type":"index-item1",
                    "title":"习近平在阿盟总部演讲 谈中国中东政策",
                    "isHasPic":2,
                    "markImg":"res://img/top.png",
                    "markVisible":0,
                    "source":"专题",
                    "comment":"648评论",
                    "time":"17分钟前"
                }
            },
            {
                center:{
                    "layoutId":"index-item2",
                    "title":"福建7名贪官结拜兄弟对抗组织 被称葫芦娃组合",
                    "markImg":"res://img/hot.png",
                    "markVisible":0,
                    "source":"中国经济网",
                    "comment":"2962评论",
                    "time":"",
                    "picPath":"res://img/news/news1.png"
                }
            },
            {
                center:{
                    "layoutId":"index-item3",
                    "title":"全国迎最冷周末 多地低温破极值",
                    "picPath":"res://img/news/news2.png",
                    "markImg":"res://img/hot.png",
                    "markVisible":0,
                    "source":"专题",
                    "comment":"4502评论",
                    "time":"37分钟前"
                }
            }
            ,
            {
                center:{
                    "type":"index-item1",
                    "title":"习近平在阿盟总部演讲 谈中国中东政策",
                    "isHasPic":2,
                    "markImg":"res://img/top.png",
                    "markVisible":0,
                    "source":"专题",
                    "comment":"648评论",
                    "time":"17分钟前"
                }
            },
            {
                center:{
                    "type":"index-item1",
                    "title":"日本车站便当能甩中国高铁盒饭几条大街？",
                    "isHasPic":0,
                    "picPath1":"res://img/news/news3.png",
                    "picPath2":"res://img/news/news4.png",
                    "picPath3":"res://img/news/news5.png",
                    "markImg":"res://img/hot.png",
                    "markVisible":2,
                    "source":"日本旅游购物美...",
                    "comment":"754评论",
                    "time":"20分钟前"
                }
            }
        ]
    }
    uexNBListView.setItems(JSON.stringify(params));
}

function setIndexItem2(id){
    var params = {
        listViewId:id,
        dataList:[
            {
                center:{
                    "layoutId":"index-item2",
                    "title":'"平语"近人--习近平心中的政法工作',
                    "markImg":"res://img/hot.png",
                    "markVisible":2,
                    "source":"陈里",
                    "comment":"3评论",
                    "time":"",
                    "picPath":"res://img/news/news6.png"
                }
            },
            {
                center:{
                    "type":"index-item1",
                    "title":'什么事情让习近平"花精力最多"？',
                    "isHasPic":2,
                    "markImg":"res://img/top.png",
                    "markVisible":2,
                    "source":"专题",
                    "comment":"3247评论",
                    "time":"20分钟前"
                }
            },
            {
                center:{
                    "type":"index-item1",
                    "title":'一张GIF图告诉你"超级"寒潮如何速冻全国',
                    "isHasPic":0,
                    "picPath1":"res://img/news/news7.png",
                    "picPath2":"res://img/news/news8.png",
                    "picPath3":"res://img/news/news9.png",
                    "markImg":"res://img/hot.png",
                    "markVisible":2,
                    "source":"中国天气",
                    "comment":"467评论",
                    "time":"20分钟前"
                }
            },
            {
                center:{
                    "type":"index-item1",
                    "title":"中央政法委书记为何突然迷上这个？",
                    "isHasPic":2,
                    "markImg":"res://img/top.png",
                    "markVisible":2,
                    "source":"长安街知事",
                    "comment":"235评论",
                    "time":"17分钟前"
                }
            },
        ]
    }
    uexNBListView.setItems(JSON.stringify(params));
}

function setVideoItem1(id){
    var params = {
        listViewId:id,
        dataList:[
            {
                center:{
                    "layoutId":"video-item1",
                    "picPath":"res://img/news/video1.jpg",
                    "title":"贾云馨说都来看我的大板牙",
                    "time":"4:05",
                    "favorable":"0",
                    "dislike":"0",
                    "comment":"0"
                }
            },
            {
                center:{
                    "layoutId":"video-item1",
                    "picPath":"res://img/news/video2.jpg",
                    "title":"神经奶爸贾乃亮和鬼马精灵贾云馨的那些奇葩事",
                    "time":"5:15",
                    "favorable":"0",
                    "dislike":"0",
                    "comment":"0"
                }
            },
            {
                center:{
                    "layoutId":"video-item1",
                    "picPath":"res://img/news/video3.jpeg",
                    "title":"怪我咯",
                    "time":"47:05",
                    "favorable":"0",
                    "dislike":"0",
                    "comment":"0"
                }
            },
            {
                center:{
                    "layoutId":"video-item1",
                    "picPath":"res://img/news/video4.jpg",
                    "title":"你再说我黑，试试！",
                    "time":"24:42",
                    "favorable":"0",
                    "dislike":"0",
                    "comment":"0"
                }
            }
        ]
    }
    uexNBListView.setItems(JSON.stringify(params));
}

function updateFavoriteVideoListView(listViewId, index, num){
    var params = {
        listViewId:listViewId,
        index:index,
        data:{
            center:{
                "favorable":num
            }
        }
    }
    uexNBListView.update(JSON.stringify(params));
}

function updateDislikeVideoListView(listViewId, index, num){
    var params = {
        listViewId:listViewId,
        index:index,
        data:{
            center:{
                "dislike":num
            }
        }
    }
    uexNBListView.update(JSON.stringify(params));
}

function updateCommentVideoListView(listViewId, index, num){
    var params = {
        listViewId:listViewId,
        index:index,
        data:{
            center:{
                "comment":num
            }
        }
    }
    uexNBListView.update(JSON.stringify(params));
}

function setVideoItem2(id){
    var params = {
        listViewId:id,
        dataList:[
            {
                center:{
                    "layoutId":"video-item1",
                    "picPath":"res://img/news/video11.jpg",
                    "title":"what?!",
                    "time":"4:05",
                    "favorable":"0",
                    "dislike":"0",
                    "comment":"0"
                }
            },
            {
                center:{
                    "layoutId":"video-item1",
                    "picPath":"res://img/news/video12.jpg",
                    "title":"好重啊！",
                    "time":"5:15",
                    "favorable":"0",
                    "dislike":"0",
                    "comment":"0"
                }
            },
            {
                center:{
                    "layoutId":"video-item1",
                    "picPath":"res://img/news/video13.jpg",
                    "title":"粑粑的假期",
                    "time":"47:05",
                    "favorable":"0",
                    "dislike":"0",
                    "comment":"0"
                }
            },
            {
                center:{
                    "layoutId":"video-item1",
                    "picPath":"res://img/news/video14.jpg",
                    "title":"看我们的小花",
                    "time":"24:42",
                    "favorable":"0",
                    "dislike":"0",
                    "comment":"0"
                }
            }
        ]
    }
    uexNBListView.setItems(JSON.stringify(params));
}

function setTopicItem1(id){
    var params = {
        listViewId:id,
        dataList:[
            {
                center:{
                    "layoutId":"topic-item1",
                    "title":"<font color = '#0000ff'>#Angela</font> 我的男神爸爸",
                    "picPath1":"res://img/news/video14.jpg",
                    "picPath2":"res://img/news/video13.jpg",
                    "isThreePic":1,
                    "nickName":"笑看风云变",
                    "time":"12小时前",
                    "favorable":0,
                    "comment":0
                }
            },
            {
                center:{
                    "layoutId":"topic-item2",
                    "title":"<font color = '#0000ff'>#甜馨</font> 我的逗比爸爸",
                    "picPath":"res://img/news/video1.jpg",
                    "nickName":"大王叫我来巡山",
                    "time":"14小时前",
                    "favorable":0,
                    "comment":0
                }
            }
        ]
    }
    uexNBListView.setItems(JSON.stringify(params));
}

function setTopicItem2(id){
    var params = {
        listViewId:id,
        dataList:[
            {
                center:{
                    "layoutId":"topic-item3",
                    "topicName":"我关注的话题"
                }
            },
            {
                center:{
                    "layoutId":"topic-item5",
                    "icon":"res://img/attention/4.png",
                    "topicName":"短发控"
                }
            },
            {
                center:{
                    "layoutId":"topic-item3",
                    "topicName":"可能感兴趣的话题"

                }
            },
            {
                center:{
                    "layoutId":"topic-item4",
                    "icon":"res://img/attention/1.png",
                    "description":"456345人已关注 398233条帖子",
                    "topicName":"爆料"
                }
            },
            {
                center:{
                    "layoutId":"topic-item4",
                    "icon":"res://img/attention/2.png",
                    "description":"456345人已关注 398233条帖子",
                    "topicName":"韩剧"
                }
            },
            {
                center:{
                    "layoutId":"topic-item4",
                    "icon":"res://img/attention/3.png",
                    "description":"456345人已关注 398233条帖子",
                    "topicName":"双眼皮"
                }
            }
        ]
    }
    uexNBListView.setItems(JSON.stringify(params));
}

function setMeItem(id){
    var params = {
        listViewId:id,
        dataList:[
            {
                center:{
                    "layoutId":"me"
                }
            },
            {
                center:{
                    "layoutId":"me1",
                    "title":"离线",
                    "summary-visible":2
                }
            },
            {
                center:{
                    "layoutId":"me1",
                    "title":"活动",
                    "summary-visible":2
                }
            },
            {
                center:{
                    "layoutId":"me1",
                    "title":"商城",
                    "summary":"特卖 电影",
                    "summary-visible":0
                }
            },
            {
                center:{
                    "layoutId":"me1",
                    "title":"我要爆料",
                    "summary-visible":2
                }
            },
            {
                center:{
                    "layoutId":"me1",
                    "title":"反馈",
                    "summary-visible":2
                }
            }
        ]
    }
    uexNBListView.setItems(JSON.stringify(params));
}

function openIndex(listViewId, containerId, containerIndex, top, height){
    //alert(listViewId + "," + containerId + "," + containerIndex);
    var params = {
        listViewId:listViewId,
        left: 0,//(必选) 左间距
        top: top,//(必选) 上间距
        width:window.screen.width,//(必选) 宽
        height:height,//(必选) 高
        openType:2,//(可选) 打开方式,0-webView,1-window,2-容器
        containerID:containerId,
        containerIndex:containerIndex,
        swipeMode:3,//(可选) 侧滑模式，0-右滑，1-左滑，2-左右滑，3-不能滑。默认3
        refreshMode:3,//(可选) 刷新模式，0-无，1-下拉，2-上拉，3-上拉下拉。默认3
        refreshTimeout:5000//(可选)刷新超时时间，单位毫秒。在refreshMode非等于0有效，默认为3000
    }
    uexNBListView.open(JSON.stringify(params));
}

function openMe(listViewId, top, height){
    var params = {
        listViewId:listViewId,
        left: 0,//(必选) 左间距
        top: top,//(必选) 上间距
        width:window.screen.width,//(必选) 宽
        height:height,//(必选) 高
        openType:0,//(可选) 打开方式,0-webView,1-window,2-容器
        swipeMode:3,//(可选) 侧滑模式，0-右滑，1-左滑，2-左右滑，3-不能滑。默认3
        refreshMode:0//(可选) 刷新模式，0-无，1-下拉，2-上拉，3-上拉下拉。默认3
    }
    uexNBListView.open(JSON.stringify(params));
}

function showMeListView(id){
    var params = {
        listViewId:id
    }
    uexNBListView.show(JSON.stringify(params));
}

function hideMeListView(id){
    var params = {
        listViewId:id
    }
    uexNBListView.hide(JSON.stringify(params));
}

function deleteData(listViewId, index){
    var params = {
        listViewId:listViewId,
        indexes:[index]
    }
    uexNBListView.delete(JSON.stringify(params));
}

function addDataToStart(listViewId){
    if(listViewId == listViewId1){
        var params = {
            listViewId:listViewId,
            index:0,
            dataList:[
                {
                    center:{
                        "type":"index-item1",
                        "title":"最新新闻-热点",
                        "isHasPic":2,
                        "markImg":"res://img/top.png",
                        "markVisible":2,
                        "source":"长安街知事",
                        "comment":"235评论",
                        "time":"1分钟前"
                    }
                }
            ]
        }
        uexNBListView.insert(JSON.stringify(params));
    }else if(listViewId == listViewId2){
        var params = {
            listViewId:listViewId,
            index:0,
            dataList:[
                {
                    center:{
                        "type":"index-item1",
                        "title":"最新新闻-推荐",
                        "isHasPic":2,
                        "markImg":"res://img/top.png",
                        "markVisible":2,
                        "source":"长安街知事",
                        "comment":"235评论",
                        "time":"1分钟前"
                    }
                }
            ]
        }
        uexNBListView.insert(JSON.stringify(params));
    }
}

function addDataToEnd(listViewId){
    if(listViewId == listViewId1){
        var params = {
            listViewId:listViewId,
            //index:0,//不传时，添加到列表末尾
            dataList:[
                {
                    center:{
                        "type":"index-item1",
                        "title":"更多新闻-热点",
                        "isHasPic":2,
                        "markImg":"res://img/top.png",
                        "markVisible":2,
                        "source":"长安街知事",
                        "comment":"235评论",
                        "time":"1分钟前"
                    }
                }
            ]
        }
        uexNBListView.insert(JSON.stringify(params));
    }else if(listViewId == listViewId2){
        var params = {
            listViewId:listViewId,
            //index:0,//不传时，添加到列表末尾
            dataList:[
                {
                    center:{
                        "type":"index-item1",
                        "title":"更多新闻-推荐",
                        "isHasPic":2,
                        "markImg":"res://img/top.png",
                        "markVisible":2,
                        "source":"长安街知事",
                        "comment":"235评论",
                        "time":"1分钟前"
                    }
                }
            ]
        }
        uexNBListView.insert(JSON.stringify(params));
    }
}