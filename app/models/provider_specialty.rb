class ProviderSpecialty < ApplicationRecord
  validates :npi,             presence: true, uniqueness: {scope: :specialty_code}
  validates :specialty_code,  presence: true

  belongs_to :specialty,
    primary_key: :specialty_code,
    class_name: "Specialty",
    foreign_key: :specialty_code
  
  belongs_to :provider,
    primary_key: :npi,
    class_name: "Provider",
    foreign_key: :npi
end
