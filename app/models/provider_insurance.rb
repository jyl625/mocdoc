class ProviderInsurance < ApplicationRecord
  validates :npi,      presence: true, uniqueness: {scope: :hios_id}
  validates :hios_id,  presence: true
end
