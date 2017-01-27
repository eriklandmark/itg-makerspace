# Use bundler to load gems
require 'bundler'

# Load gems from Gemfile
Bundler.require

# Load settings for development/production/test environments
#require 'googleauth'

require_relative 'config/environment'
#require_relative 'lib/functions'

# Start the application
run App