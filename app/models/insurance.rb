class Insurance < ApplicationRecord
  validates :hios_id,   presence: true,   uniqueness: {scope: :plan_id}
  validates :carrier,   presence: true
  validates :plan_id,   presence: true
  validates :plan,   presence: true
end

