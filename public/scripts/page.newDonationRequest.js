(function() {
  var __hasProp = Object.prototype.hasOwnProperty;

  if (calatrava.pageView == null) calatrava.pageView = {};

  calatrava.pageView.newDonationRequest = function() {
    var $p, $page, $quantityValueIsInitialized, initializeQuantityDropdown, renderSection;
    $page = $('#newDonationRequest');
    $p = function(sel) {
      return $(sel, $page);
    };
    $quantityValueIsInitialized = false;
    initializeQuantityDropdown = function() {
      var quantityDropdown, quantityValue, _i, _len, _ref;
      quantityDropdown = $p('#quantity');
      _ref = [1, 2, 3, 5, 8, 10, 15, 20];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quantityValue = _ref[_i];
        quantityDropdown.append(new Option(quantityValue + " units", quantityValue));
      }
      return $quantityValueIsInitialized = true;
    };
    renderSection = function(key, data) {
      switch (key) {
        case "back":
          return $p("#goHome").triggerHandler("goHome");
        default:
          return $p("#" + key).val(data);
      }
    };
    return {
      bind: function(event, handler) {
        switch (event) {
          case "showLocationCapturePage":
            return $p("#location").off("click").on('click', handler);
          case "goHome":
            return $p("#goHome").off("goHome").on('goHome', handler);
          default:
            return $p("#" + event).off('click').on('click', handler);
        }
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
        if (!$quantityValueIsInitialized) initializeQuantityDropdown();
        return $page.show();
      },
      hide: function() {
        return $page.hide();
      }
    };
  };

}).call(this);
