# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
# require 'byebug'

# DO NOT DELETE: DEMO USER
User.create({email: "demo@email.com", password:"111111"})


# Providers Seed
PROVIDER_DEV_CSV = 'providers_table-LA.csv'
PROVIDER_PROD_CSV = 'providers_table.csv'

CSV.foreach(Rails.root.join("lib/seed_csv/#{PROVIDER_DEV_CSV}"), headers: true) do |row|

  Provider.create( {
    npi: row["npi"], 
    name: row["name"],
    provider_type: row["provider_type"], 
    address_1: row["address_1"],
    address_2: row["address_2"],
    city: row["city"],
    state: row["state"],
    zipcode: row["zipcode"],
    latitude: row["latitude"].to_f,
    longitude: row["longitude"].to_f,
  } ) 
end
