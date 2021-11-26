class Insurance < ApplicationRecord
  validates :hios_id,   presence: true,   uniqueness: {scope: :plan_id}
  validates :carrier,   presence: true
  validates :plan_id,   presence: true
  validates :plan,   presence: true

  has_many :npis,
    primary_key: :plan_id,
    class_name: "ProviderInsurance",
    foreign_key: :plan_id

  has_many :providers,
    through: :npis,
    source: :provider
end

