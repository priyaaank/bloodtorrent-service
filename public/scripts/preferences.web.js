(function() {

  if (calatrava.web == null) calatrava.web = {};

  calatrava.web.preferences = function(method, _arg) {
    var message, okHandler, retrievedValue;
    message = _arg.message, okHandler = _arg.okHandler;
    if (method === 'add') {
      if (localStorage) return localStorage[message.key] = message.value;
    } else if (method === 'retrieve') {
      retrievedValue = localStorage ? localStorage[message.key] : void 0;
      return calatrava.bridge.runtime.invokePluginCallback(okHandler, retrievedValue);
    }
  };

  calatrava.bridge.runtime.registerPlugin('preferences', calatrava.web.preferences);

}).call(this);
