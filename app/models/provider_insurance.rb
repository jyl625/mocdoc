class ProviderInsurance < ApplicationRecord
  validates :npi,      presence: true, uniqueness: {scope: :plan_id}
  validates :plan_id,  presence: true

  belongs_to :insurance_plan,
    primary_key: :plan_id,
    class_name: "Insurance",
    foreign_key: :plan_id

  belongs_to :provider,
    primary_key: :npi,
    class_name: "Provider",
    foreign_key: :npi
end
