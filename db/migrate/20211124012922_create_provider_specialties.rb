class CreateProviderSpecialties < ActiveRecord::Migration[5.2]
  def change
    create_table :provider_specialties do |t|
      t.string :npi, null: false
      t.string :specialty_code, null: false
    end

    add_index :provider_specialties, :npi
    add_index :provider_specialties, [:npi, :specialty_code], unique: true
  end
end
