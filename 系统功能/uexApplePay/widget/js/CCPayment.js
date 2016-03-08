
define("CCPayment", function (x) {
  var _newItem = function(label,price){
    var item = {};
    item.label = label;
    if (price) {
        item.price = price;
    };
    return item;
  }
  var _newShippingMethod = function(label,identifier,detail,price){
    var shippingMethod = _newItem(label,price);
    shippingMethod.identifier = identifier;
    if (detail) {
      shippingMethod.detail = detail;
    };
    return shippingMethod;
  }
  var _shippingMethods = [];
  var _items = [];
  var _payee;
  var _merchantIdentifier;
  var _isUseCredit = false;
  var _shippingCost = -1;
  var _applicationData = "";
  var _getPayment = function(){
    var itemList = _items.concat();
    if(_isUseCredit){
      itemList.push(_newItem("信用卡折扣",-5))
    }
    if (_shippingCost == -1) {
      itemList.push(_newItem("运费"));
    }else{
      itemList.push(_newItem("运费",_shippingCost));
    }
    return{
        items:itemList,
        payee:_payee,
      }
  };
  var _getPayInfo = function(){
    var payinfo = {};
    payinfo.merchantIdentifier = _merchantIdentifier;
    payinfo.payment = _getPayment();
    payinfo.shippingType = 0;
    payinfo.applicationData = _applicationData;
    payinfo.billingContactRequiredFlag = 15;
    payinfo.shippingContactRequiredFlag = 15;
    if (_shippingMethods.length > 0) {
      payinfo.shippingMethods = _shippingMethods;
    };
    return payinfo;
  };
  
  return {
    setMerchantIdentifier : function(merchant){
      _merchantIdentifier = merchant;
    },
    setPayee : function(payee){
      _payee = payee;
    },
    addItem : function(label,price){
      var item = _newItem(label,price);
      _items.push(item);
    },
    newShippingMethod : function(label,identifier,detail,price){
      return _newShippingMethod(label,identifier,detail,price);
    },
    setShippingMethods : function(methodsArray){
      _shippingMethods = methodsArray;
    },
    getShippingMethods : function(){
      return _shippingMethods;
    },
    getPayInfo : function(){
      return _getPayInfo();
    },
    getPayment : function(){
      return _getPayment();
    },
    setShippingCost : function(cost){
      _shippingCost = cost;
    },
    useCreditCard : function(){
      _isUseCredit = true;
    },
    useDebitCard : function(){
      _isUseCredit = false;
    },
    setApplicationData : function(data){
      _applicationData = data;
    }
  }

  
});