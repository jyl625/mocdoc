# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
require 'byebug'

##### DO NOT DELETE: DEMO USER #####
User.create({email: "demo@email.com", password:"111111"})


##### PROVIDERS SEED #####
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
    zip_code: row["zip_code"],
    latitude: row["latitude"].to_f,
    longitude: row["longitude"].to_f,
  } ) 
end

##### INSURANCES SEED #####
INSURANCE_CSV = 'insurances_table.csv'

CSV.foreach(Rails.root.join("lib/seed_csv/#{INSURANCE_CSV}"), headers: true) do |row|

  Insurance.create( {
    hios_id: row["hios_id"], 
    carrier: row["carrier"],
    plan_id: row["plan_id"], 
    plan: row["plan"],
  } ) 
end

##### SPECIALTIES SEED #####
SPECIALTY_CSV = 'specialties_table.csv'

CSV.foreach(Rails.root.join("lib/seed_csv/#{SPECIALTY_CSV}"), headers: true) do |row|

  Specialty.create( {
    specialty_code: row["specialty_code"], 
    specialty_name: row["specialty_name"],
  } ) 

end

##### PROVIDERSPECIALTIES SEED #####

PROVIDER_SPECIALTIES_DEV = "npi_specialties_join-LA.csv"
PROVIDER_SPECIALTIES_PROD = "npi_specialties_join.csv"

CSV.foreach(Rails.root.join("lib/seed_csv/#{PROVIDER_SPECIALTIES_DEV}"), headers: true) do |row|

  ProviderSpecialty.create( {
    npi: row["npi"], 
    specialty_code: row["specialty_code"],
  } ) 

end



##### PROVIDERINSURANCE SEED #####

## SELECT ALL PROVIDERS
# all_npi = Provider.select(:npi).distinct.limit(4).pluck(:npi) #TESTING
# all_npi = Provider.select(:npi).distinct.pluck(:npi)

## RANDOMLY SELECT PLANS
# All Cali Plans
# [["67138", "HealthNet"], 
#  ["18126", "Molina"],               
#  ["84014", "Valley"],               
#  ["93689", "Western"],              
#  ["99110", "HealthNet"],            
#  ["47579", "Chinese Community"],  
#  ["92499", "Sharp"],              
#  ["92815", "L.A. Care"],          
#  ["40513", "Kaiser"],             
#  ["70285", "Blue Shield"],        
#  ["67689", "Bright"],             
#  ["10544", "Oscar"],              
#  ["27603", "Anthem"]]    

# All carrier hios_ids
# carrier_hios_ids = Insurance.select(:hios_id).distinct.pluck(:hios_id)

# Pick a number of random plans
# rand_carrier_hios_ids = carrier_hios_ids.sample(3)

# Find all plans by the randomly selected carriers
# rand_plan_ids = []
# rand_carrier_hios_ids.each {|hios| rand_plan_ids +=  Insurance.where(hios_id: hios).pluck(:plan_id)}

# PRY TEST CODE
# provider_plan = []
# all_npi = Provider.select(:npi).distinct.limit(4).pluck(:npi)
# all_npi.each do |npi|
#   carrier_hios_ids = Insurance.select(:hios_id).distinct.pluck(:hios_id)
#   rand_carrier_hios_ids = carrier_hios_ids.sample(3)
#   rand_plan_ids = []
#   rand_carrier_hios_ids.each {|hios| rand_plan_ids +=  Insurance.where(hios_id: hios).pluck(:plan_id)}
#   provider_plan += rand_plan_ids.map {|plan_id| [npi, plan_id]}
# end

#SEED TEST CODE
# provider_plan = []
# all_npi = Provider.select(:npi).distinct.limit(4).pluck(:npi)
# all_npi.each do |npi|
#   carrier_hios_ids = Insurance.select(:hios_id).distinct.pluck(:hios_id)
#   rand_carrier_hios_ids = carrier_hios_ids.sample(3)
#   all_rand_hios_ids = []
#   rand_carrier_hios_ids.each {|hios| all_rand_hios_ids +=  Insurance.where(hios_id: hios).pluck(:plan_id)}
#   all_rand_hios_ids.each {|hios_id| ProviderInsurance.new({npi: npi, hios_id: hios_id})}
# end