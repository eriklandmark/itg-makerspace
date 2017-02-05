class App < Sinatra::Base

  enable :sessions
  set :session_secret, 'itg-makerspace'
  set :static_cache_control, [:public, max_age: 0]

  get '/projects' do
    erb :projects
  end

  get '/about-us' do
    erb :about
  end

  get '/shoping-cart' do
    erb :shoping_cart
  end

  get '/*' do
    erb :index
  end
end