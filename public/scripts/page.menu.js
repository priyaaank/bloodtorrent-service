(function() {
  var __hasProp = Object.prototype.hasOwnProperty;

  if (calatrava.pageView == null) calatrava.pageView = {};

  calatrava.pageView.menu = function() {
    var $p, $page, renderSection;
    $page = $('#menu');
    $p = function(sel) {
      return $(sel, $page);
    };
    renderSection = function(key, data) {
      return $p("#" + key).val(data);
    };
    return {
      bind: function(event, handler) {
        return $p("#" + event).off('click').on('click', handler);
      },
      render: function(message) {
        var data, section, _results;
        _results = [];
        for (section in message) {
          if (!__hasProp.call(message, section)) continue;
          data = message[section];
          _results.push(renderSection(section, data));
        }
        return _results;
      },
      get: function(field) {
        return $page.find("#" + field).val();
      },
      show: function() {
        return $page.show();
      },
      hide: function() {
        return $page.hide();
      }
    };
  };

}).call(this);
