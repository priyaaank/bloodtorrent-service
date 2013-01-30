require 'spec_helper'

describe DonationRequest do

  context "attributes" do
    it { should respond_to :blood_group     }
    it { should respond_to :quantity        }
    it { should respond_to :cordinates      }
    it { should respond_to :requestor       }
    it { should respond_to :contact_details }
  end

  context "blood groups" do
    
    it "should be of 8 types" do
      DonationRequest::BLOOD_GROUPS::ALL.size.should be 8
    end

    it "should have 8 defined types" do
      ["apositive","bpositive","opositive", "abpositive", "anegative", "bnegative", "abnegative", "onegative"].each do |blood_group|
        DonationRequest::BLOOD_GROUPS::ALL.should include(blood_group)
      end
    end

  end

  context "validation" do

    let(:valid_donation_request) { DonationRequest.new( :blood_group => "bpositive",
                                                        :quantity => 1000,
                                                        :cordinates => [18.5236, 73.8478],
                                                        :requestor => "Jonny",
                                                        :contact_details => "9923299222") }
    context "is successful" do

      it "has valid attributes" do
        valid_donation_request.should be_valid
      end

    end

    context "is a failure" do

      it "has invalid blood group" do
        donation_request_with_incorrect_blood_group = valid_donation_request
        donation_request_with_incorrect_blood_group.blood_group = "zpositive"

        donation_request_with_incorrect_blood_group.should_not be_valid
        donation_request_with_incorrect_blood_group.error_messages.should include("Incorrect or missing blood group")
      end

      it "has missing blood group" do
        donation_request_with_missing_blood_group = valid_donation_request
        donation_request_with_missing_blood_group.blood_group = nil

        donation_request_with_missing_blood_group.should_not be_valid
        donation_request_with_missing_blood_group.error_messages.should include("Incorrect or missing blood group")
      end

      it "has invalid quantity" do
        donation_request_with_incorrect_quantity = valid_donation_request
        donation_request_with_incorrect_quantity.quantity = 0

        donation_request_with_incorrect_quantity.should_not be_valid
        donation_request_with_incorrect_quantity.error_messages.should include("Incorrect or missing quantity")
      end

      it "has missing quantity" do
        donation_request_with_missing_quantity = valid_donation_request
        donation_request_with_missing_quantity.quantity = nil

        donation_request_with_missing_quantity.should_not be_valid
        donation_request_with_missing_quantity.error_messages.should include("Incorrect or missing quantity")
      end

      it "has invalid latitude" do
        donation_request_with_incorrect_latitude = valid_donation_request
        donation_request_with_incorrect_latitude.cordinates = [117.8753, 127.353]

        donation_request_with_incorrect_latitude.should_not be_valid
        donation_request_with_incorrect_latitude.error_messages.should include("Incorrect or missing latitude")
      end

      it "has missing latitude" do
        donation_request_with_missing_latitude = valid_donation_request
        donation_request_with_missing_latitude.cordinates = [nil, 127.353]

        donation_request_with_missing_latitude.should_not be_valid
        donation_request_with_missing_latitude.error_messages.should include("Incorrect or missing latitude")
      end

      it "has invalid longitude" do
        donation_request_with_incorrect_longitude = valid_donation_request
        donation_request_with_incorrect_longitude.cordinates = [19.352, 187.8753]

        donation_request_with_incorrect_longitude.should_not be_valid
        donation_request_with_incorrect_longitude.error_messages.should include("Incorrect or missing longitude")
      end

      it "has invalid longitude" do
        donation_request_with_missing_longitude = valid_donation_request
        donation_request_with_missing_longitude.cordinates = [19.352, nil]

        donation_request_with_missing_longitude.should_not be_valid
        donation_request_with_missing_longitude.error_messages.should include("Incorrect or missing longitude")
      end

      it "has invalid requestor" do
        donation_request_with_incorrect_requestor = valid_donation_request
        donation_request_with_incorrect_requestor.requestor = nil

        donation_request_with_incorrect_requestor.should_not be_valid
        donation_request_with_incorrect_requestor.error_messages.should include("Incorrect or missing requestor")
      end

      it "has invalid contact details" do
        donation_request_with_incorrect_contact = valid_donation_request
        donation_request_with_incorrect_contact.contact_details = nil

        donation_request_with_incorrect_contact.should_not be_valid
        donation_request_with_incorrect_contact.error_messages.should include("Incorrect or missing contact details")
      end

    end

  end


end
