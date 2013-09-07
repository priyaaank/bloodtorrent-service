(function() {

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  if (bloodtorrent.donationRequest == null) bloodtorrent.donationRequest = {};

  bloodtorrent.donationRequest.repository = function(_arg) {
    var ajax;
    ajax = _arg.ajax;
    return {
      requestDonations: function(options) {
        var queryString, url;
        url = "" + (bloodtorrent.environment().apiEndpoint) + "/donation/search";
        queryString = "?blood_group=" + options.bloodGroup + "&latitude=" + options.location.latitude + "&longitude=" + options.location.longitude + "&radius=" + options.radius;
        return ajax({
          url: url + queryString,
          method: "GET",
          contentType: "application/json",
          success: function(responseData) {
            return options.successCallback(JSON.parse(responseData));
          },
          failure: function(errorCode, errorMsg) {
            return options.failureCallback({
              "status": "Error",
              errorMessage: "Shucks! The call to server failed. Is you internet connection active?"
            });
          }
        });
      },
      createDonation: function(options) {
        var url;
        url = "" + (bloodtorrent.environment().apiEndpoint) + "/donation/new";
        return ajax({
          url: url,
          method: "POST",
          contentType: "application/json",
          body: {
            blood_group: options.donationRequest.bloodGroup,
            latitude: options.donationRequest.location.latitude,
            longitude: options.donationRequest.location.longitude,
            quantity: options.donationRequest.units,
            requestor: options.donationRequest.requestor || "unknown",
            contact_details: options.donationRequest.contactDetails
          },
          success: function(responseData) {
            var parsedResponse;
            parsedResponse = _(responseData).isEmpty() ? "success" : JSON.parse(responseData);
            return options.onDonationCreateSuccess(parsedResponse);
          },
          failure: function(errorCode, errorMsg) {
            return options.onDonationCreateFailure({
              "status": "Error",
              errorMessage: errorMsg
            });
          }
        });
      }
    };
  };

}).call(this);
