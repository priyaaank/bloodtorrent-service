(function() {
  var __hasProp = Object.prototype.hasOwnProperty;

  if (calatrava.pageView == null) calatrava.pageView = {};

  calatrava.pageView.donationRequestListing = function() {
    var $p, $page, renderAllRequests, renderDonations, renderSection, showNoRecordsBanner, triggerListingRefresh;
    $page = $('#donationRequestListing');
    $p = function(sel) {
      return $(sel, $page);
    };
    renderAllRequests = function($select, donationRequests) {
      $p("#loadingBanner").hide();
      if ((donationRequests != null) && donationRequests.length > 0) {
        return renderDonations($select, donationRequests);
      } else {
        return showNoRecordsBanner($select);
      }
    };
    renderDonations = function($select, donationRequests) {
      return $select.empty().html(ich.donationListingTmpl({
        donations: donationRequests
      }));
    };
    showNoRecordsBanner = function($select) {
      return $select.empty().html(ich.noDonationRecordsBannerTmpl());
    };
    renderSection = function(key, data) {
      switch (key) {
        case 'donations':
          return renderAllRequests($p('#donationListing'), data);
        default:
          return p("#" + key).val(data);
      }
    };
    triggerListingRefresh = function(location) {
      var coordinates;
      coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
      return $p('#donationListing').trigger("refreshDonations", JSON.stringify(coordinates));
    };
    return {
      bind: function(event, handler) {
        switch (event) {
          case "refreshDonations":
            return $p('#donationListing').off('refreshDonations').on('refreshDonations', function(event) {
              return handler(event.data);
            });
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
        $p("#loadingBanner").show();
        $p('#donationListing').empty();
        $page.show();
        return navigator.geolocation.getCurrentPosition(triggerListingRefresh);
      },
      hide: function() {
        return $page.hide();
      }
    };
  };

}).call(this);
