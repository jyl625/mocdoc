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
    search_result_cap = 42
    if specialty && specialty != "" && plan != ""
      matching_specialties = Provider
        .joins(:specialties)
        .where("lower(specialty_name) LIKE lower(?) OR lower(specialty_name) LIKE lower(?) ",
        "#{specialty}%", "% #{specialty}%")

      # SINGLE QUERY - WORKS
      test = Provider
        .joins(:specialties).joins(:insurances)
        .where("(lower(specialty_name) LIKE lower(?) OR lower(specialty_name) LIKE lower(?)) AND insurances.plan_id = (?)",
        "#{specialty}%", "% #{specialty}%", "#{plan}").offset(10).limit(10)

      result = []
      matching_specialties.each do |matched_provider| 
        if matched_provider.insurances.where(plan_id: plan).length == 1
          result << matched_provider
        end

        #return result if result.length == search_result_cap
      end
      return result
    elsif specialty != "" && plan == ""
      result = Provider
        .joins(:specialties)
        .where("lower(specialty_name) LIKE lower(?) OR lower(specialty_name) LIKE lower(?) ",
        "#{specialty}%", "% #{specialty}%").limit(search_result_cap)
      return result
    elsif specialty == "" && plan != "" 
      result = []
      Provider.all.each do |provider|
        result << provider if provider.insurances.any? { |insurance| insurance.plan_id == plan }
        return result if result.length == search_result_cap
      end
    else 
      return Provider.all.sample(search_result_cap)
    end

    # result = result[0...10] if result.length > 20
  end
end
