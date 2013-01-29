require 'spec_helper'

describe DonationRequest do

  it { should respond_to :blood_group     }
  it { should respond_to :quantity        }
  it { should respond_to :latitude        }
  it { should respond_to :longitude       }
  it { should respond_to :requestor       }
  it { should respond_to :contact_details }

end
