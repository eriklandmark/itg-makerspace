# Load all models
Dir["./models/*.rb"].each {|model| require model}

#Load all helpers
Dir["./helpers/*.rb"].each {|helper| require helper}


# Used during local development (on your own machine)
configure :development do

  puts "*******************"
  puts "* DEVELOPMENT ENV *"
  puts "*******************"

  # Enable logging to console
  DataMapper::Logger.new($stdout, :debug)

  # Use SQLite
  DataMapper.setup(:default, "sqlite:///#{Dir.pwd}/db/app-dev.sqlite")

  # Enable pretty printing of Slim-generated HTML (for debugging)
  Slim::Engine.set_options pretty: true, sort_attrs: false

end

# Used during production (on Heroku), when your application is 'live'
configure :production do

  puts "******************"
  puts "* PRODUCTION ENV *"
  puts "******************"

  # Use Postgresql
  DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://fnkusucuathyqa:8cd7376f69b94fec5ebf676238f0a1f27962f2a8e88cc67672f7b3fd18dfc0dc@ec2-54-83-194-208.compute-1.amazonaws.com:5432/d8gr9qh51h9nku")


end

# Used when running tests (rake test:[acceptance|models|routes])
configure :test do

  # Use SQLite db in RAM (for speed & since we do not need to save data between test runs
  DataMapper.setup(:default, 'sqlite::memory:')

end

# Load the application
require_relative '../app'

# Check that all models and associations are ok
#DataMapper::Property::String.length(100)

DataMapper.finalize.auto_upgrade!