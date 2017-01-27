class App < Sinatra::Base

  enable :sessions
  set :session_secret, 'itg-makerspace'

  get '/*' do
    erb :index
  end
end