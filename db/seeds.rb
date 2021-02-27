require 'open-uri'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Prediction.create(name: "US Presidency", description: "Donald Trump remains president at end of year", probability_in_percent: 95, outcome: true, user_id: 1, expiration_date: "2018-12-31")

## Creating a Guest User Account
if User.find_by(email: "guest@user.com").nil?
  User.create(email: "guest@user.com", password: "guestuser", username: "GuestAcc")
  def create_exp_prediction(category, probability, outcome)
    Prediction.create!(category: category, name: "Sample Title", description: "This is a sample prediction's description.", probability_in_percent: probability, outcome: outcome, user_id: User.find_by(email: "guest@user.com").id, expiration_date: "2020-12-31")
  end
  def create_prediction(category, probability)
    Prediction.create(category: category, name: "Sample Title", description: "This is a sample prediction's description.", probability_in_percent: probability, outcome: nil, user_id: User.find_by(email: "guest@user.com").id, expiration_date: "2021-12-31")
  end
  categories = ["Global Events", "Economics", "Personal Life", "Sports", "ETC"]
  probabilities = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
  outcomes = [true, false]
  categories.each do |category|
    5.times do
      create_prediction(category, probabilities.sample)
    end
    50.times do
      create_exp_prediction(category, probabilities.sample, outcomes.sample)
    end
  end
end


## Creating Developer User Account
if User.find_by(email: "developer@testing.com").nil?
  User.create(email: "developer@testing.com", password: 123456, username: "DeveloperAcc")

  def create_prediction(title, description, probability, outcome)
    Prediction.create(category: title, name: title, description: description, probability_in_percent: probability, outcome: outcome, user_id: User.find_by(email: "developer@testing.com").id, expiration_date: "2018-12-31")
  end

  def open_and_read_file
    URI.open("https://pastebin.com/raw/en8UFUr2") do |f|
      descriptions = []
      @percentages = []
      outcomes = []
      validLinesArr = []
      availableNumbers = (1..100).to_a 
      def check_percent(line)
        if line.include? "95"
          @percentages.push(95)
        elsif line.include? "90"
          @percentages.push(90)
        elsif line.include? "80"
          @percentages.push(80)
        elsif line.include? "70"
          @percentages.push(70)
        elsif line.include? "60"
          @percentages.push(60)
        elsif line.include? "50"
          @percentages.push(50)
        else
          return false
        end
      end
      f.each_line do |line|
        line = line.strip
        if line.include? "<p>"
          next
        elsif line.include? "<s>"
          outcomes.push(false)
          check_percent(line)
          descriptions.push(line.slice(6..-14).strip)
        else
          outcomes.push(true)
          check_percent(line)
          descriptions.push(line.slice(3..-10).strip)
        end
      end
      return descriptions, @percentages, outcomes
    end
  end

  values = open_and_read_file()
  @title = ["US", "ECONOMICS AND TECHNOLOGY", "CULTURE WARS", "COMMUNITIES", "PERSONAL", "SECRET"]
  @descriptions = values[0]
  @probability = values[1]
  @outcome = values[2]
  #puts @title[0], @descriptions[0], @probability[0], @outcome[0]
  i = 0
  # US
  14.times do 
    create_prediction(@title[0], @descriptions[i], @probability[i], @outcome[i])
    i += 1
  end

  # Economics and Technology
  12.times do 
    create_prediction(@title[1], @descriptions[i], @probability[i], @outcome[i])
    i += 1
  end

  # Culture Wars
  2.times do 
    create_prediction(@title[2], @descriptions[i], @probability[i], @outcome[i])
    i += 1
  end

  # Communities
  17.times do 
    create_prediction(@title[3], @descriptions[i], @probability[i], @outcome[i])
    i += 1
  end

  # Personal
  18.times do 
    create_prediction(@title[4], @descriptions[i], @probability[i], @outcome[i])
    i += 1
  end

  # Secret
  36.times do 
    create_prediction(@title[5], @descriptions[i], @probability[i], @outcome[i])
    i += 1
  end
end