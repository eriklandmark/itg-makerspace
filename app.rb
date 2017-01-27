class App < Sinatra::Base

  enable :sessions
  set :session_secret, 'itg-makerspace'

  get '/' do
    "Hello World"
  end
end