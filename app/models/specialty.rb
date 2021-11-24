class Specialty < ApplicationRecord
  validates :specialty_code,  presence: true, uniqueness: true
  validates :specialty_name,  presence: true

  has_many :npi,
    primary_key: :specialty_code,
    class_name: "ProviderSpecialty",
    foreign_key: :specialty_code

  has_many :provider,
    through: :npi,
    source: :provider
end
