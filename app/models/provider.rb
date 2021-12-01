class Provider < ApplicationRecord
  validates :npi,   presence: true, uniqueness: true
  validates :name,  presence: true

  has_one :specialty_code,
    primary_key: :npi,
    class_name: "ProviderSpecialty",
    foreign_key: :npi

  has_many :specialties,
    through: :specialty_code,
    source: :specialty

  has_many :insurance_plan_ids,
    primary_key: :npi,
    class_name: "ProviderInsurance",
    foreign_key: :npi

  has_many :insurances,
    through: :insurance_plan_ids,
    source: :insurance_plan

  has_many :appointments

  has_many :users, 
    -> { distinct },
    through: :appointments,
    source: :user
end
