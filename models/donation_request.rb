class DonationRequest

  module BLOOD_GROUPS
    O_POSITIVE = "opositive"
    O_NEGATIVE = "onegative"
    A_POSITIVE = "apositive"
    A_NEGATIVE = "anegative"
    B_POSITIVE = "bpositive"
    B_NEGATIVE = "bnegative"
    AB_POSITIVE = "abpositive"
    AB_NEGATIVE = "abnegative"
    ALL = [O_POSITIVE, O_NEGATIVE, A_POSITIVE, A_NEGATIVE, B_POSITIVE, B_NEGATIVE, AB_POSITIVE, AB_NEGATIVE]
  end

  MAX_LATITUDE_VALUE = 90
  MIN_LATITUDE_VALUE = -90
  MAX_LONGITUDE_VALUE = 180
  MIN_LONGITUDE_VALUE = -180

  include Mongoid::Document

  field :blood_group,   :type => String
  field :quantity, :type => Integer
  field :cordinates, :type => Array
  field :requestor, :type => String
  field :contact_details, :type => String

  attr_accessor :error_messages

  def valid?
    reset_error_messages
    add_error("Incorrect or missing blood group") unless valid_blood_group?
    add_error("Incorrect or missing quantity") unless valid_quantity?
    add_error("Incorrect or missing latitude") unless valid_latitude?
    add_error("Incorrect or missing longitude") unless valid_longitude?
    add_error("Incorrect or missing requestor") unless valid_requestor?
    add_error("Incorrect or missing contact details") unless valid_contact_details?
    @error_messages.empty?
  end

  private

  def valid_quantity?
    !quantity.nil? && quantity.is_a?(Integer) && quantity > 0
  end

  def valid_blood_group?
    !blood_group.nil? && BLOOD_GROUPS::ALL.include?(blood_group)
  end

  def valid_latitude?
    latitude = cordinates[0]
    !latitude.nil? && latitude.is_a?(Float) && 
      latitude >= MIN_LATITUDE_VALUE && latitude <= MAX_LATITUDE_VALUE
  end

  def valid_longitude?
    longitude = cordinates[1]
    !longitude.nil? && longitude.is_a?(Float) && 
      longitude >= MIN_LONGITUDE_VALUE && longitude <= MAX_LONGITUDE_VALUE
  end

  def valid_requestor?
    !requestor.nil? && requestor.is_a?(String)
  end

  def valid_contact_details?
    !contact_details.nil? && contact_details.is_a?(String)
  end

  def reset_error_messages
    @error_messages = []
  end

  def add_error message
    @error_messages << message
  end

end
