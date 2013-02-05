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
  field :coordinates, :type => Array
  field :requestor, :type => String
  field :contact_details, :type => String

  validates_inclusion_of :blood_group , in: BLOOD_GROUPS::ALL, :message => "Incorrect or missing blood group"
  validates_numericality_of :quantity, :greater_than => 0 , :message => "Incorrect or missing quantity"
  validates_presence_of :contact_details, :message => "Incorrect or missing contact details"
  validates_presence_of :requestor, :message => "Incorrect or missing requestor"
  validate :validate_coordinates

  def validate_coordinates
    errors.add(:latitude, "Incorrect or missing latitude") unless valid_latitude?
    errors.add(:longitude, "Incorrect or missing longitude") unless valid_longitude?
  end

  def valid_latitude?
    valid_coordinate?(coordinates[1], MIN_LATITUDE_VALUE, MAX_LATITUDE_VALUE)
  end

  def valid_longitude?
    valid_coordinate?(coordinates[0], MIN_LONGITUDE_VALUE, MAX_LONGITUDE_VALUE)
  end

  private
  def valid_coordinate?(value, min, max)
    !value.nil? && value.is_a?(Float) &&
        value >= min && value <= max
  end
end
