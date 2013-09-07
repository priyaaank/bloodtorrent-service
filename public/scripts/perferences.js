(function() {

  if (calatrava.preferences == null) calatrava.preferences = {};

  calatrava.preferences.add = function(key, value) {
    return calatrava.bridge.plugins.call('preferences', 'add', {
      message: {
        key: key,
        value: value
      }
    });
  };

  calatrava.preferences.retrieve = function(key, onOkExecute) {
    var okCallbackHandle;
    okCallbackHandle = calatrava.bridge.plugins.rememberCallback(function(value) {
      calatrava.bridge.plugins.deleteCallback(okCallbackHandle);
      return onOkExecute(value);
    });
    return calatrava.bridge.plugins.call('preferences', 'retrieve', {
      message: {
        key: key
      },
      okHandler: okCallbackHandle
    });
  };

}).call(this);
