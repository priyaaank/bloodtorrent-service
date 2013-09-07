(function() {
  var DonationRequest;

  if (typeof bloodtorrent === "undefined" || bloodtorrent === null) {
    bloodtorrent = {};
  }

  if (bloodtorrent.models == null) bloodtorrent.models = {};

  bloodtorrent.models.donationRequest = DonationRequest = (function() {
    var BLOOD_GROUPS, integerRegex, isInteger;

    BLOOD_GROUPS = {
      "A+": "apositive",
      "A-": "anegative",
      "O+": "opositive",
      "O-": "onegative",
      "B+": "bpositive",
      "B-": "bnegative",
      "AB+": "abpositive",
      "AB-": "abnegative"
    };

    integerRegex = /^\d+$/;

    function DonationRequest(_arg) {
      var bloodGroup, contactDetails, location, requestor, units;
      bloodGroup = _arg.bloodGroup, units = _arg.units, location = _arg.location, contactDetails = _arg.contactDetails, requestor = _arg.requestor;
      this.bloodGroup = BLOOD_GROUPS[bloodGroup.toUpperCase()] || "unknown";
      this.units = units;
      this.location = location;
      this.contactDetails = contactDetails;
      this.requestor = requestor;
    }

    isInteger = function(value) {
      return integerRegex.test(value);
    };

    DonationRequest.prototype.isValid = function() {
      this.errors = [];
      if (this.bloodGroup === "unknown") this.errors.push("Invalid blood group");
      if (!isInteger(this.units)) this.errors.push("Units is not an integer");
      if (_(this.contactDetails).isEmpty()) {
        this.errors.push("Contact details must be supplied");
      }
      return _.isEmpty(this.errors);
    };

    return DonationRequest;

  })();

}).call(this);
