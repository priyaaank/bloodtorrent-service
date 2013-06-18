require 'mongoid'
require './models/donation_request'
Mongoid.load!("./config/mongoid.yml")

DonationRequest.create!(:blood_group => DonationRequest::BLOOD_GROUPS::O_POSITIVE, :quantity => 12, :coordinates => [18.5236, 73.8478], :requestor => "pg", :contact_details => "twitter")
DonationRequest.create!(:blood_group => DonationRequest::BLOOD_GROUPS::A_POSITIVE, :quantity => 10, :coordinates => [12.9833, 77.5833], :requestor => "qg", :contact_details => "9929929929")
DonationRequest.create!(:blood_group => DonationRequest::BLOOD_GROUPS::O_NEGATIVE, :quantity => 8, :coordinates => [29.0167, 77.3833], :requestor => "ap", :contact_details => "myemail@gmail.com")