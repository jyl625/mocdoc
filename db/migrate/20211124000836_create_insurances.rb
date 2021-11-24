class CreateInsurances < ActiveRecord::Migration[5.2]
  def change
    create_table :insurances do |t|
      t.string :hios_id, null: false
      t.string :carrier, null: false
      t.string :plan_id, null: false
      t.string :plan, null: false

      t.timestamps
    end

    add_index :insurances, [:hios_id, :plan_id], unique: true
  end
end
