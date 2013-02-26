require 'sinatra'
require 'json'
require 'mongoid'
Dir["models/**/*.rb"].sort.each {|file| require_relative file}
Mongoid.load!("./config/mongoid.yml")

post '/donation/new' do
  blood_group = params[:blood_group]
  latitude = params[:latitude].to_f
  longitude = params[:longitude].to_f
  quantity = params[:quantity]
  requestor_name = params[:requestor]
  contact_details = params[:contact_details]


  request = DonationRequest.new(:blood_group => blood_group,
                                :coordinates => [longitude,latitude],
                                :quantity => quantity,
                                :requestor => requestor_name,
                                :contact_details => contact_details)

  request.save!
end

get '/donation/search' do
  blood_group = params[:blood_group]
  latitude = params[:latitude].to_f
  longitude = params[:longitude].to_f
  radius = params[:radius].to_f #km

  current_location = [longitude, latitude]
  requests = DonationRequest.where(:coordinates => { "$within" => {"$center" => [current_location, (radius.fdiv(111.138)) ] } } )
                            .where(:blood_group => blood_group)


  content_type :json
  requests.to_json
end

get '/' do
  "Dragons be here"
end
