(function() {

  if (calatrava.userLocation == null) calatrava.userLocation = {};

  calatrava.userLocation.cordinates = function(onOkExecute) {
    var okCallbackHandle;
    okCallbackHandle = calatrava.bridge.plugins.rememberCallback(function(value) {
      calatrava.bridge.plugins.deleteCallback(okCallbackHandle);
      return onOkExecute(value);
    });
    return calatrava.bridge.plugins.call('userLocation', 'cordinates', {
      okHandler: okCallbackHandle
    });
  };

}).call(this);
