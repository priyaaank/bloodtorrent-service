(function() {

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  if (bloodtorrent.settings == null) bloodtorrent.settings = {};

  bloodtorrent.settings.start = function(isItForFirstTime, callback) {
    return bloodtorrent.settings.controller({
      views: {
        userSetupPage: calatrava.bridge.pages.pageNamed("userSetup")
      },
      changePage: calatrava.bridge.changePage,
      isItForFirstTime: isItForFirstTime,
      settingsSaved: callback
    });
  };

}).call(this);
