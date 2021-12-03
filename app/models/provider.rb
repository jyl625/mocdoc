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

  has_many :appointments,
    primary_key: :id,
    class_name: :Appointment,
    foreign_key: :provider_id

  has_many :users, 
    -> { distinct },
    through: :appointments,
    source: :user

  def self.searchByPlanAndSpecialty(plan, specialty)
    matching_specialties = Provider
      .joins(:specialties)
      .where("lower(specialty_name) LIKE lower(?) OR lower(specialty_name) LIKE lower(?) ",
      "#{specialty}%", "% #{specialty}%")

    result = matching_specialties.select do |matched_provider| 
      matched_provider.insurances.where(plan_id: plan).length == 1
    end

    # result = result[0...10] if result.length > 20
  end
end
