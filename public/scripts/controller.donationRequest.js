(function() {

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  if (bloodtorrent.donationRequest == null) bloodtorrent.donationRequest = {};

  bloodtorrent.donationRequest.controller = function(_arg) {
    var bindCaptureLocationPage, bindCreateDonationView, changePage, createNewRequest, failureCallback, fetchAndUpdateDonationListing, goHome, initialize, lookupBloodGroup, lookupRadius, onDonationCreateFailure, onDonationCreateSuccess, renderErrors, repositories, requestDonations, selectedLocation, showDonationListing, showLocationCapturePage, showNewDonationPage, successCallback, updateLocationForDonation, validateAndCreateDonationRequest, views;
    views = _arg.views, repositories = _arg.repositories, changePage = _arg.changePage;
    lookupBloodGroup = null;
    lookupRadius = null;
    selectedLocation = {
      latitude: null,
      longitude: null
    };
    goHome = function() {
      return changePage("menu");
    };
    showDonationListing = function() {
      views.donationRequestListingPage.bind("refreshDonations", function(location) {
        return fetchAndUpdateDonationListing(location);
      });
      return requestDonations();
    };
    showNewDonationPage = function() {
      changePage("newDonationRequest");
      return bindCreateDonationView();
    };
    showLocationCapturePage = function() {
      changePage("captureLocation");
      views.captureLocationPage.render({
        mapView: ""
      });
      return bindCaptureLocationPage();
    };
    updateLocationForDonation = function(latitude, longitude) {
      selectedLocation.latitude = latitude;
      return selectedLocation.longitude = longitude;
    };
    successCallback = function(successResponse) {
      return views.donationRequestListingPage.render({
        donations: successResponse
      });
    };
    failureCallback = function(error) {
      return calatrava.alert(error.errorMessage);
    };
    fetchAndUpdateDonationListing = function(cordinates) {
      var location, options;
      location = JSON.parse(cordinates);
      options = {
        successCallback: successCallback,
        failureCallback: failureCallback,
        bloodGroup: lookupBloodGroup,
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        radius: lookupRadius
      };
      return repositories.donationsRepository.requestDonations(options);
    };
    requestDonations = function() {
      calatrava.preferences.retrieve("notificationRadius", function(radius) {
        return lookupRadius = radius;
      });
      return calatrava.preferences.retrieve("bloodGroup", function(bloodgroup) {
        lookupBloodGroup = bloodgroup;
        return changePage("donationRequestListing");
      });
    };
    bindCaptureLocationPage = function() {
      views.captureLocationPage.bind("updateLocationForDonation", updateLocationForDonation);
      return views.captureLocationPage.bind("selectLocation", function(location) {
        updateLocationForDonation(location.lat(), location.lng());
        return changePage("newDonationRequest");
      });
    };
    bindCreateDonationView = function() {
      views.newDonationRequestPage.bind("submitDonationRequest", validateAndCreateDonationRequest);
      views.newDonationRequestPage.bind("showLocationCapturePage", showLocationCapturePage);
      return views.newDonationRequestPage.bind("goHome", goHome);
    };
    createNewRequest = function(donationRequest) {
      return repositories.donationsRepository.createDonation({
        donationRequest: donationRequest,
        onDonationCreateSuccess: onDonationCreateSuccess,
        onDonationCreateFailure: onDonationCreateFailure
      });
    };
    onDonationCreateSuccess = function(successResponse) {
      return views.newDonationRequestPage.render({
        back: ""
      });
    };
    onDonationCreateFailure = function(errorCode, errorMessage) {
      return calatrava.alert("Oops! That did not go through. Would you please try it later?");
    };
    renderErrors = function(errors) {
      return calatrava.alert("Oh No! Either you missed map location or contact details or both");
    };
    validateAndCreateDonationRequest = function() {
      var bloodGroup, contactDetails, requestor, units;
      bloodGroup = null;
      units = null;
      contactDetails = null;
      requestor = null;
      views.newDonationRequestPage.get("bloodGroup", function(bloodGroupFromView) {
        return bloodGroup = bloodGroupFromView;
      });
      views.newDonationRequestPage.get("quantity", function(unitsFromView) {
        return units = unitsFromView;
      });
      views.newDonationRequestPage.get("contactDetails", function(contactDetailsFromView) {
        return contactDetails = contactDetailsFromView;
      });
      return calatrava.preferences.retrieve("userName", function(requestorNickName) {
        var donationRequest, errors, location;
        requestor = requestorNickName;
        location = selectedLocation;
        donationRequest = new bloodtorrent.models.donationRequest({
          bloodGroup: bloodGroup,
          units: units,
          location: location,
          contactDetails: contactDetails,
          requestor: requestor
        });
        if (!donationRequest.isValid()) errors = donationRequest.errors;
        if (_.isEmpty(errors)) {
          return createNewRequest(donationRequest);
        } else {
          return renderErrors();
        }
      });
    };
    initialize = function() {
      return {
        showDonationListing: showDonationListing,
        showNewDonationPage: showNewDonationPage
      };
    };
    return initialize();
  };

}).call(this);
