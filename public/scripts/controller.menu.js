(function() {

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  if (bloodtorrent.menu == null) bloodtorrent.menu = {};

  bloodtorrent.menu.controller = function(_arg) {
    var bindMenuOptions, controllers, initialize, showDonationRequestsListing, showMenu, showNewDonationRequestPage, showSettingsPage, views;
    views = _arg.views, controllers = _arg.controllers;
    initialize = function() {
      return bindMenuOptions();
    };
    bindMenuOptions = function() {
      views.menuPage.bind("donationRequests", showDonationRequestsListing);
      views.menuPage.bind("newDonationRequest", showNewDonationRequestPage);
      return views.menuPage.bind("settings", showSettingsPage);
    };
    showMenu = function() {
      return bloodtorrent.menu.start();
    };
    showDonationRequestsListing = function() {
      return controllers.donationRequest.showDonationListing();
    };
    showNewDonationRequestPage = function() {
      return controllers.donationRequest.showNewDonationPage();
    };
    showSettingsPage = function() {
      return bloodtorrent.settings.start(false, showMenu);
    };
    return initialize();
  };

}).call(this);
