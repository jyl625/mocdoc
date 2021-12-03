class Specialty < ApplicationRecord
  validates :specialty_code,  presence: true, uniqueness: true
  validates :specialty_name,  presence: true

  has_many :npis,
    primary_key: :specialty_code,
    class_name: "ProviderSpecialty",
    foreign_key: :specialty_code

  has_many :providers,
    through: :npis,
    source: :provider

  def self.searchSpecialtyName(name)
    Specialty.where("lower(specialty_name) LIKE lower(?) OR lower(specialty_name) LIKE lower(?) ",
     "#{name}%", "% #{name}%")
  end
end
