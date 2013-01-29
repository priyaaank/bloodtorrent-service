class DonationRequest

  include Mongoid::Document

  field :blood_group,   :type => String
  field :quantity, :type => Float
  field :latitude, :type => Float
  field :longitude, :type => Float
  field :requestor, :type => String
  field :contact_details, :type => String
end
