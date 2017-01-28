class App < Sinatra::Base

  enable :sessions
  set :session_secret, 'itg-makerspace'

  get '/pictures' do
    erb :pictures
  end

  get '/*' do
    erb :index
  end
end