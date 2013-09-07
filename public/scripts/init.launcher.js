(function() {

  if (bloodtorrent.launcher == null) bloodtorrent.launcher = {};

  bloodtorrent.launcher.launch = function() {
    var initialize, runThroughInitialSetup, startApp;
    runThroughInitialSetup = function() {
      return bloodtorrent.settings.start(true, startApp);
    };
    startApp = function() {
      return bloodtorrent.menu.start();
    };
    initialize = function() {
      return calatrava.preferences.retrieve("firstTimeSetup", function(isSetupComplete) {
        if (isSetupComplete === "Done") {
          return startApp();
        } else {
          return runThroughInitialSetup();
        }
      });
    };
    return initialize();
  };

}).call(this);
