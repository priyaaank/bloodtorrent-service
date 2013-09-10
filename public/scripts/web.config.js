(function() {

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  bloodtorrent.environment = function() {
    return {
      sessionTimeout: 600,
      apiEndpoint: ""
    };
  };

}).call(this);
