(function() {
  var __hasProp = Object.prototype.hasOwnProperty;

  if (calatrava.pageView == null) calatrava.pageView = {};

  calatrava.pageView.captureLocation = function() {
    var $p, $page, currentUserLocation, extarctCordinatesAndUpdateLocation, initializeMap, mapHandle, renderMap, renderSection, selectedLocation, selectedLocationMarker, updateLocation, updateUserMarkerLocation;
    $page = $('#captureLocation');
    $p = function(sel) {
      return $(sel, $page);
    };
    mapHandle = null;
    selectedLocationMarker = null;
    selectedLocation = null;
    renderMap = function() {
      if (mapHandle === null) {
        return initializeMap();
      } else {
        return updateUserMarkerLocation(selectedLocation);
      }
    };
    initializeMap = function() {
      var mapContainer, options;
      mapContainer = document.getElementById("mapContainer");
      currentUserLocation;
      options = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(0, 0),
        zoom: 12
      };
      mapHandle = new google.maps.Map(mapContainer, options);
      google.maps.event.addListener(mapHandle, 'click', function(event) {
        return updateUserMarkerLocation(event.latLng);
      });
      return currentUserLocation(extarctCordinatesAndUpdateLocation);
    };
    extarctCordinatesAndUpdateLocation = function(location) {
      var coordinates, latitude, longitude;
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
      coordinates = new google.maps.LatLng(latitude, longitude);
      return updateLocation(coordinates);
    };
    currentUserLocation = function(callback) {
      return navigator.geolocation.getCurrentPosition(callback);
    };
    updateLocation = function(geoPosition) {
      selectedLocationMarker = new google.maps.Marker({
        position: mapHandle.getCenter(),
        map: mapHandle,
        title: "Blood donation here"
      });
      return updateUserMarkerLocation(geoPosition);
    };
    updateUserMarkerLocation = function(geoLocation) {
      mapHandle.panTo(geoLocation);
      selectedLocationMarker.setPosition(geoLocation);
      return selectedLocation = geoLocation;
    };
    renderSection = function(key, data) {
      switch (key) {
        case 'mapView':
          return renderMap();
        default:
          return p("#" + key).val(data);
      }
    };
    return {
      bind: function(event, handler) {
        switch (event) {
          case "selectLocation":
            return $p("#selectLocation").off('click').on('click', function() {
              return handler(selectedLocation);
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
        return $page.show();
      },
      hide: function() {
        return $page.hide();
      }
    };
  };

}).call(this);
