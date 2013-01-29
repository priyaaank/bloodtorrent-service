require 'sinatra'
require 'json'

get '/donation/new' do
  blood_group = params[:blood_group]
  latitude = params[:latitude]
  longitude = params[:longitude]
  quantity = params[:quantity]
  requestor_name = params [:requestor]


  request = DonationRequest.new(:blood_group => blood_group,
                                :latitude => latitude,
                                :longitude => longitude,
                                :quantity => quantity,
                                :requestor_name => requestor_name)
  request.create! if request.valid?
  
   content_type :json
   #{ :blood_group => "#{params[:bg]}", :radius => "#{params[:radius]}" }.to_json
end

get '/donation/search' do

end
