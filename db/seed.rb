require 'mongoid'
require './models/donation_request'
Mongoid.load!("./config/mongoid.yml")

DonationRequest.delete_all

DonationRequest.collection.indexes.create({ coordinates: "" }, { min: -200, max: 200 })

DonationRequest.create!(:blood_group => DonationRequest::BLOOD_GROUPS::O_POSITIVE, :quantity => 12, :coordinates => [73.8478, 18.5236], :requestor => "pg", :contact_details => "twitter")
DonationRequest.create!(:blood_group => DonationRequest::BLOOD_GROUPS::A_POSITIVE, :quantity => 10, :coordinates => [77.5833, 12.9833], :requestor => "qg", :contact_details => "9929929929")
DonationRequest.create!(:blood_group => DonationRequest::BLOOD_GROUPS::O_NEGATIVE, :quantity => 8, :coordinates => [77.3833, 29.0167], :requestor => "ap", :contact_details => "myemail@gmail.com")