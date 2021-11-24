class Provider < ApplicationRecord
  validates :npi,   presence: true, uniqueness: true
  validates :name,  presence: true

  has_one :specialty_code,
    primary_key: :npi,
    class_name: "ProviderSpecialty",
    foreign_key: :npi

  has_many :specialty,
    through: :specialty_code,
    source: :specialty
end
