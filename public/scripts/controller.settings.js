(function() {

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  if (bloodtorrent.settings == null) bloodtorrent.settings = {};

  bloodtorrent.settings.controller = function(_arg) {
    var askViewToTransition, captureUserSettings, changePage, initialize, isItForFirstTime, persistPreferenceValues, renderExistingValues, savePreferences, settingsSaved, views;
    views = _arg.views, changePage = _arg.changePage, isItForFirstTime = _arg.isItForFirstTime, settingsSaved = _arg.settingsSaved;
    initialize = function() {
      renderExistingValues();
      return captureUserSettings();
    };
    persistPreferenceValues = function(options) {
      calatrava.preferences.add("bloodGroup", options.bloodGroup);
      calatrava.preferences.add("notificationRadius", options.notificationRadius);
      return calatrava.preferences.add("userName", options.userName);
    };
    savePreferences = function() {
      var fields, saveSettingsAndContinue, valueHash;
      valueHash = {};
      fields = ["bloodGroup", "notificationRadius", "userName"];
      saveSettingsAndContinue = _.after(fields.length, function() {
        persistPreferenceValues(valueHash);
        calatrava.preferences.add("firstTimeSetup", "Done");
        if (isItForFirstTime) {
          return settingsSaved();
        } else {
          return askViewToTransition();
        }
      });
      return _.each(fields, function(fieldName) {
        return views.userSetupPage.get(fieldName, function(value) {
          valueHash[fieldName] = value;
          return saveSettingsAndContinue();
        });
      });
    };
    askViewToTransition = function() {
      return views.userSetupPage.render({
        transitionNext: ""
      });
    };
    captureUserSettings = function() {
      views.userSetupPage.bind("saveUserPreferences", savePreferences);
      return views.userSetupPage.bind("transitionNext", settingsSaved);
    };
    renderExistingValues = function() {
      var fields, renderOnceAllFieldsAreFetched, valueHash;
      valueHash = {};
      fields = ["bloodGroup", "notificationRadius", "userName"];
      renderOnceAllFieldsAreFetched = _.after(fields.length, function() {
        changePage("userSetup");
        return views.userSetupPage.render({
          initValues: valueHash
        });
      });
      return _.each(fields, function(fieldName) {
        return calatrava.preferences.retrieve(fieldName, function(value) {
          valueHash[fieldName] = value;
          return renderOnceAllFieldsAreFetched();
        });
      });
    };
    return initialize();
  };

}).call(this);
