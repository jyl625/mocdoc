class CreateSpecialties < ActiveRecord::Migration[5.2]
  def change
    create_table :specialties do |t|
      t.string :specialty_code, null: false
      t.string :specialty_name, null: false
      t.timestamps
    end

    add_index :specialties, :specialty_code, unique: true
  end
end
