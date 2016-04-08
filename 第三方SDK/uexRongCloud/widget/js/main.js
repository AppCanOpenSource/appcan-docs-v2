function init() {
  var params = {};
  var data = JSON.stringify(params);
  uexRongCloud.init(data);
}
var globalTargetId = "123456";
var globalMsgId = "56";

function connect() {
  //{"userId":"123456","token":"g3fqLjRWtJdOkUCd+uqMRFYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2VryZSnIEN2vTPv9T56shgMwGSAC9SfCY27A=="}
  //{"userId":"55666","token":"l6pQSRcGYrZeC74XWtMt9lYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2Vr2VWSk7VAC9zdJcAMydT35mS0vr73Hd/gw=="}
  var params = {
    // token: "g3fqLjRWtJdOkUCd+uqMRFYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2VryZSnIEN2vTPv9T56shgMwGSAC9SfCY27A=="
    token: "l6pQSRcGYrZeC74XWtMt9lYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2Vr2VWSk7VAC9zdJcAMydT35mS0vr73Hd/gw=="
  };
  var data = JSON.stringify(params);
  uexRongCloud.connect(data);
}

function sendMessage() {

  var params = {
    objectName: "RC:CmdNtf",
    conversationType: "PRIVATE",
    targetId: globalTargetId,
    // targetId: "55666",
    extra: "extra info ...", //消息的附加字段
    localId: 111, //消息的唯一id，用于标识接收发送回调的处理

    //objectName 为"RC:TxtMsg"时(文字消息)
    text: "text content ...", //消息的文字内容

    //objectName 为"RC:VcMsg"时(语音消息)
    voicePath: 'res://voice.mp3', //语音文件的路径
    duration: 3, //Number类型 语音消息的时长，单位为秒

    //objectName 为"RC:ImgMsg"时(图片消息)
    // imgPath: 'res://img.png', //图片的本地路径
    thumbPath: 'res://img.png', //缩略图

    //objectName 为"RC:ImgTextMsg"时(图文消息)
    title: '消息的标题', //消息的标题
    description: '消息的内容描述', //消息的内容描述
    // imgPath: 'http://img1.3lian.com/2015/w7/90/d/1.jpg', //发送图片的网络路径
    url: 'http://www.baidu.com', //图文消息中包含的需要跳转到的URL

    //objectName 为"RC:LBSMsg"时(位置消息)
    latitude: '39.9087202', //维度
    longitude: '116.3974799', //经度
    poi: '北京天安门', //地理位置的名称
    imgPath: 'res://img.png', //地图略缩图的路径


    //objectName 为"RC:CmdNtf"时(命令消息)
    name: 'action_name', //命令的名称
    data: 'action_data .....', //命令的数据
  };
  var data = JSON.stringify(params);
  uexRongCloud.sendMessage(data);
}

function getConversationList() {
  var params = uexRongCloud.getConversationList();
  alert(params);
}

function getConversation() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId
  };
  var data = JSON.stringify(params);
  var result = uexRongCloud.getConversation(data);
  alert(result);
}

function removeConversation() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId
  };
  var data = JSON.stringify(params);
  uexRongCloud.removeConversation(data);
}

function clearConversations() {
  var types = new Array();
  types[0] = "PRIVATE";
  var params = {
    conversationTypes: types
  };
  var data = JSON.stringify(params);
  uexRongCloud.clearConversations(data);
}

function setConversationToTop() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId,
    isTop: true
  };
  var data = JSON.stringify(params);
  uexRongCloud.setConversationToTop(data);
}

function getConversationNotificationStatus() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId,
  };
  var data = JSON.stringify(params);
  uexRongCloud.getConversationNotificationStatus(data);
}

function setConversationNotificationStatus() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId,
    status: 1
  };
  var data = JSON.stringify(params);
  uexRongCloud.setConversationNotificationStatus(data);
}

function getLatestMessages() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId,
    count: 20
  };
  var data = JSON.stringify(params);
  uexRongCloud.getLatestMessages(data);
}

function getHistoryMessages() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId,
    count: 20,
    oldestMessageId: -1
  };
  var data = JSON.stringify(params);
  uexRongCloud.getHistoryMessages(data);
}

function deleteMessages() {
  var ids = new Array();

  var params = {
    messageIds: ids
  };
  var data = JSON.stringify(params);
  uexRongCloud.deleteMessages(data);
}

function clearMessages() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId,
  };
  var data = JSON.stringify(params);
  uexRongCloud.clearMessages(data);
}

function getTotalUnreadCount() {
  var count = uexRongCloud.getTotalUnreadCount();
  alert(count);
}

function getUnreadCount() {
  var params = {};
  var data = JSON.stringify(params);
  var result = uexRongCloud.getUnreadCount(data);
  alert(result);
}

function getUnreadCountByConversationTypes() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId,
  };
  var data = JSON.stringify(params);
  var result = uexRongCloud.getUnreadCountByConversationTypes(data);
  alert(result);
}

function setMessageReceivedStatus() {
  var params = {
    messageId: globalMsgId, // Number 消息 Id
    receivedStatus: "READ", //"UNREAD","READ","LISTENED","DOWNLOADED"
  };
  var data = JSON.stringify(params);
  uexRongCloud.setMessageReceivedStatus(data);
}

function clearMessagesUnreadStatus() {
  var params = {
    conversationType: "PRIVATE",
    targetId: globalTargetId
  };
  var data = JSON.stringify(params);
  uexRongCloud.clearMessagesUnreadStatus(data);
}


window.uexOnload = function(type) {
  if (type == 0) {
    uexRongCloud.cbInit = cbInit;
    uexRongCloud.cbConnect = cbConnect;
    uexRongCloud.cbSendMessage = cbSendMessage;
    uexRongCloud.onMessageReceived = onMessageReceived;
    uexRongCloud.cbRemoveConversation = cbRemoveConversation;
    uexRongCloud.cbClearConversations = cbClearConversations;
    uexRongCloud.cbSetConversationToTop = cbSetConversationToTop;
    uexRongCloud.cbGetConversationNotificationStatus =
      cbGetConversationNotificationStatus;
    uexRongCloud.cbSetConversationNotificationStatus =
      cbSetConversationNotificationStatus;
    uexRongCloud.cbGetLatestMessages = cbGetLatestMessages;
    uexRongCloud.cbGetHistoryMessages = cbGetHistoryMessages;
    uexRongCloud.cbDeleteMessages = cbDeleteMessages;
    uexRongCloud.cbClearMessages = cbClearMessages;
    uexRongCloud.cbGetTotalUnreadCount = cbGetTotalUnreadCount;
    uexRongCloud.cbGetUnreadCount = cbGetUnreadCount;
    uexRongCloud.cbGetUnreadCountByConversationTypes =
      cbGetUnreadCountByConversationTypes;
    uexRongCloud.cbSetMessageReceivedStatus = cbSetMessageReceivedStatus;
    uexRongCloud.cbClearMessagesUnreadStatus = cbClearMessagesUnreadStatus;
  }
};

function cbInit(info) {
  alert('cbInit: ' + info.result);
}

function cbConnect(info) {
  alert('cbConnect: ' + info.userId);
}

function cbSendMessage(info) {
  if (info.resultCode == 0) {
    alert('准备发送 localId: ' + info.localId + "  messageId: " + info.messageId);
  } else if (info.resultCode == 1) {
    alert("发送成功 messageId: " + info.messageId);
  }
}

function onMessageReceived(info) {
  alert('onMessageReceived: ' + JSON.stringify(info));
}

function cbRemoveConversation(info) {
  alert('cbRemoveConversation: ' + JSON.stringify(info));
}

function cbClearConversations(info) {
  alert('cbClearConversations: ' + JSON.stringify(info));
}

function cbSetConversationToTop(info) {
  alert('cbSetConversationToTop: ' + JSON.stringify(info));
}

function cbGetConversationNotificationStatus(info) {
  alert('cbGetConversationNotificationStatus: ' + JSON.stringify(info));
}

function cbSetConversationNotificationStatus(info) {
  alert('cbSetConversationNotificationStatus: ' + JSON.stringify(info));
}

function cbGetLatestMessages(info) {
  alert('cbGetLatestMessages: ' + JSON.stringify(info));
}

function cbGetHistoryMessages(info) {
  alert('cbGetHistoryMessages: ' + JSON.stringify(info));
}

function cbDeleteMessages(info) {
  alert('cbDeleteMessages: ' + JSON.stringify(info));
}

function cbClearMessages(info) {
  alert('cbClearMessages: ' + JSON.stringify(info));
}

function cbGetTotalUnreadCount(info) {
  alert('cbGetTotalUnreadCount: ' + JSON.stringify(info));
}

function cbGetUnreadCount(info) {
  alert('cbGetUnreadCount: ' + JSON.stringify(info));
}

function cbGetUnreadCountByConversationTypes(info) {
  alert('cbGetUnreadCountByConversationTypes: ' + JSON.stringify(info));
}

function cbSetMessageReceivedStatus(info) {
  alert('cbSetMessageReceivedStatus: ' + info);
}

function cbClearMessagesUnreadStatus(info) {
  alert('cbClearMessagesUnreadStatus: ' + info);
}
