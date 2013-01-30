class DonationRequest

  module BLOOD_GROUPS
    O_POSITIVE = "opositive"
    O_NEGATIVE = "onegative"
    A_POSITIVE = "apositive"
    A_NEGATIVE = "anegative"
    B_POSITIVE = "bpositive"
    B_NEGATIVE = "bnegative"
    ALL = [O_POSITIVE, O_NEGATIVE, A_POSITIVE, A_NEGATIVE, B_POSITIVE, B_NEGATIVE]
  end

  include Mongoid::Document

  field :blood_group,   :type => String
  field :quantity, :type => Integer
  field :latitude, :type => Float
  field :longitude, :type => Float
  field :requestor, :type => String
  field :contact_details, :type => String

  attr_accessor :error_messages

  def valid?
    reset_error_messages
    add_error("Incorrect or missing blood group") unless valid_blood_group?
    add_error("Incorrect or missing quantity") unless valid_quantity?
    @error_messages.empty?
  end

  private

  def valid_quantity?
    !quantity.nil? && quantity.is_a?(Integer) && quantity > 0
  end

  def valid_blood_group?
    !blood_group.nil? && BLOOD_GROUPS::ALL.include?(blood_group)
  end

  def reset_error_messages
    @error_messages = []
  end

  def add_error message
    @error_messages << message
  end

end
