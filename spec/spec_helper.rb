require 'mongoid'
require 'database_cleaner'

Dir["models/**/*.rb"].sort.each {|file| require_relative "../#{file}" }

ENV['RACK_ENV'] = 'test'
Mongoid.load!("./config/mongoid.yml")

RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner[:mongoid].strategy = :truncation
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
