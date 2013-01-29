class DonationRequest

  module BLOOD_GROUPS
    O_POSITIVE = "opositive"
    O_NEGATIVE = "onegative"
    A_POSITIVE = "apositive"
    A_NEGATIVE = "anegative"
    B_POSITIVE = "bpositive"
    B_NEGATIVE = "bnegative"
  end

  include Mongoid::Document

  field :blood_group,   :type => String
  field :quantity, :type => Float
  field :latitude, :type => Float
  field :longitude, :type => Float
  field :requestor, :type => String
  field :contact_details, :type => String
end
