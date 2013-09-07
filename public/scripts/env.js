(function() {

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  if (_.isUndefined(bloodtorrent.environment)) {
    bloodtorrent.environment = function() {
      return {
        apiEndpoint: ""
      };
    };
  }

}).call(this);
