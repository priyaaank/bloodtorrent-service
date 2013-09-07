(function() {

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  if (bloodtorrent.menu == null) bloodtorrent.menu = {};

  bloodtorrent.menu.start = function() {
    bloodtorrent.menu.controller({
      views: {
        menuPage: calatrava.bridge.pages.pageNamed("menu")
      },
      controllers: {
        donationRequest: bloodtorrent.donationRequest.init()
      }
    });
    return calatrava.bridge.changePage("menu");
  };

}).call(this);
