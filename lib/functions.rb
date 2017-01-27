def check_database(user:, pass:)
  u = Users.first(:email => user)
  if u != nil
    return BCrypt::Password.new(u.password) == pass
  else
    p user + " doesn't exist"
  end
  false
end

def change_user_password(user:, pass:)
  u = Users.first(:email => user)
  if u.update(:password => encode_password(pass))
    p "Changed password for " + user
    true
  else
    p "Failed to change password for " + user
    u.errors.each do |e|
      puts "Problem: " + e
    end
    false
  end
end

def create_user(user:, pass:)
  u = Users.create({:email => user, :password => encode_password(pass), :clearence_level => 1})
  if u.save
    true
  else
    u.errors.each do |e|
      puts "Problem: " + e.to_s
    end
    false
  end
end

def delete_user(user:)
  users = Users.all(email: params["username"])
  if users.empty?
    false
  else
    users.each do |u|
      p "Deleted User: " + u.email
      u.destroy
    end
    true
  end
end

def change_user_theme(user:, theme:)
  u = Users.first(:email => user)
  if u.update(:theme =>  theme.to_i)
    true
  else
    u.errors.each do |e|
      puts "Problem: " + e
    end
    false
  end
end

def get_token
  # Get the environment configured authorization
  scopes =  ['https://www.googleapis.com/auth/analytics.readonly']
  authorization = Google::Auth.get_application_default(scopes)

# Clone and set the subject
  auth_client = authorization.dup
  auth_client.sub = 'nbemovieproductions@gmail.com'
  token = auth_client.fetch_access_token!["access_token"]
  if token == nil || token == ""
    p "Failed to get key."
  else
    p "Got key from google!"
    token.to_s
  end
end

def save_personal_key(user:, key:)
  u = Users.first(:email => user)
  if u.update(:personal_key => key)
    p "Saved personal key for " + user
    true
  else
    p "Failed to save personal key for " + user
    u.errors.each do |e|
      puts "Problem: " + e.to_s
    end
    false
  end
end

def delete_personal_key(user:)
  u = Users.first(:email => user)
  if u != nil
    if u.update(:personal_key => "no_key")
      p "Deleted personal key for " + user
      return true
    else
      p "Failed to delete personal key for " + user
      u.errors.each do |e|
        puts "Problem: " + e.to_s
      end
      return false
    end
  else
    p "Failed to delete personal_key: User not found!"
  end
end

def get_personal_key(user:)
  u = Users.first(:email => user)
  if u != nil
    u.personal_key
  end
end

def get_user_names
  usernames = Array.new
  Users.all().each do |user|
    usernames << user.email
  end
  usernames
end

def get_user_levels
  levels = Array.new
  Users.all().each do |user|
    levels << user.clearence_level
  end
  levels
end

def get_files(folder:)
  file_hash = Array.new
  file_hash << {:empty => Dir.glob("#{folder}/*.*").empty?}
  Dir.glob("#{folder}/*.*").each do |file|
    file_hash << {
        :name => file.split('/').last.to_s,
        :type => file.split('.').last.to_s.upcase,
        :size => ('%.3f' % (File.size(file).to_f / 1024.0)).to_s + " kB",
        :src => file.to_s
    }
  end
  JSON.generate(file_hash)
end