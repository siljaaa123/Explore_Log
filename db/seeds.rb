# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'open-uri'

puts 'Cleaning database'
 Template.destroy_all
 Pin.destroy_all
 Journey.destroy_all
 User.destroy_all

puts 'Creating a user, a journey, a pin and a template'
user = User.create!(email: "me@me.com", password: "password", username: "me")
journey = Journey.new(name: "Ibiza", location: "Spain", start_date: Date.new(2024, 5, 1), end_date: Date.new(2024, 5, 10), completed: false, description: "Bob & Brian honeymoon", user_id: user.id)
photo = URI.open("https://res.cloudinary.com/dsqjxikd6/image/upload/v1715267267/SummerHolidays_khutfu.png")
journey.cover_photo.attach(io: photo, filename: "SummerHolidays.png", content_type: "image/png")
journey.save!
Pin.create(location: "Ibiza", date: Date.new(2024, 5, 7), journey_id: journey.id)
Template.create!(name: "floral")
puts 'Finished'
