require 'spec_helper'

describe DonationRequest do

  context "attributes" do
    it { should respond_to :blood_group     }
    it { should respond_to :quantity        }
    it { should respond_to :latitude        }
    it { should respond_to :longitude       }
    it { should respond_to :requestor       }
    it { should respond_to :contact_details }
  end

  context "for validation" do

    let(:valid_donation_request) { DonationRequest.new( :blood_group => "bpositive",
                                                        :quantity => 1000,
                                                        :latitude => 18.5236,
                                                        :longitude => 73.8478,
                                                        :requestor => "Jonny",
                                                        :contact_details => "9923299222") }
    context "to be successful" do

      it "should have a valid attributes" do
        valid_donation_request.should be_valid
      end

    end

    context "to be a failure" do

      it "should have a valid blood group value" do
        donation_request_with_incorrect_blood_group = valid_donation_request
        donation_request_with_incorrect_blood_group.blood_group = "zpositive"

        donation_request_with_incorrect_blood_group.should_not be_valid
        donation_request_with_incorrect_blood_group.error_messages.should include("Incorrect or missing blood group")
      end

      it "should have a valid quantity" do
        donation_request_with_incorrect_quantity = valid_donation_request
        donation_request_with_incorrect_quantity.quantity = 0

        donation_request_with_incorrect_quantity.should_not be_valid
        donation_request_with_incorrect_quantity.error_messages.should include("Incorrect or missing quantity")
      end

    end

  end


end
