class CreateProviderInsurances < ActiveRecord::Migration[5.2]
  def change
    create_table :provider_insurances do |t|
      t.string :npi, null: false
      t.string :plan_id, null: false
    end

    add_index :provider_insurances, :npi
    add_index :provider_insurances, :plan_id
    add_index :provider_insurances, [:npi, :plan_id], unique: true
  end
end
