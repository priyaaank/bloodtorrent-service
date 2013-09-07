(function() {
  var __hasProp = Object.prototype.hasOwnProperty;

  if (calatrava.pageView == null) calatrava.pageView = {};

  calatrava.pageView.userSetup = function() {
    var $p, $page, $radiusDropdownIsInitialized, initializeRadiusDropdown, initializeValues, renderSection;
    $page = $('#userSetup');
    $p = function(sel) {
      return $(sel, $page);
    };
    $radiusDropdownIsInitialized = false;
    initializeRadiusDropdown = function() {
      var radiusDropdown, radiusValue, _i, _len, _ref;
      radiusDropdown = $p('#notificationRadius');
      _ref = [5, 10, 15, 25, 50, 75, 100, 150, 200, 300];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        radiusValue = _ref[_i];
        radiusDropdown.append(new Option(radiusValue + " kms", radiusValue));
      }
      return $radiusDropdownIsInitialized = true;
    };
    initializeValues = function($select, data) {
      if (!$radiusDropdownIsInitialized) initializeRadiusDropdown();
      $select.find("#userName").val(data.userName);
      $select.find("#notificationRadius").val(data.notificationRadius);
      return $select.find("#bloodGroup").val(data.bloodGroup);
    };
    renderSection = function(key, data) {
      switch (key) {
        case 'initValues':
          return initializeValues($p('#setupData'), data);
        case 'transitionNext':
          return $p('#saveUserPreferences').triggerHandler("transition:next");
        default:
          return $p("#" + key).val(data);
      }
    };
    return {
      bind: function(event, handler) {
        switch (event) {
          case "transitionNext":
            return $p("#saveUserPreferences").off("transition:next").on('transition:next', handler);
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
        return $page.show();
      },
      hide: function() {
        return $page.hide();
      }
    };
  };

}).call(this);
