# myapp.rb
require 'sinatra'
require 'json'

get '/hello' do
   content_type :json
   { :blood_group => "#{params[:bg]}", :radius => "#{params[:radius]}" }.to_json
   #"Hello  #{params[:bg]} #{params[:radius]}!"
end
