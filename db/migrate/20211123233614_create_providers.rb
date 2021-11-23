class CreateProviders < ActiveRecord::Migration[5.2]
  def change
    create_table :providers do |t|
      t.string :npi, null: false
      t.string :name, null: false
      t.string :provider_type
      t.string :address_1
      t.string :address_2
      t.string :city
      t.string :state
      t.string :zipcode
      t.float :latitude
      t.float :longitude

      t.timestamps
    end

    add_index :providers, :npi, unique: true
  end
end
