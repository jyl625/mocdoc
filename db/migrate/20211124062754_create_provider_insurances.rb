class CreateProviderInsurances < ActiveRecord::Migration[5.2]
  def change
    create_table :provider_insurances do |t|
      t.string :npi, null: false
      t.string :hios_id, null: false
    end

    add_index :provider_insurances, :npi
    add_index :provider_insurances, :hios_id
    add_index :provider_insurances, [:npi, :hios_id], unique: true
  end
end
