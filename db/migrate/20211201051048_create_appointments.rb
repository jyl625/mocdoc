class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.datetime  :appointment_time, null: false
      t.integer   :user_id, null: false
      t.integer   :provider_id, null: false
      t.string    :reason, null: false
      t.boolean   :new_patient, null: false
      t.boolean   :in_person, null: false

      t.timestamps
    end

    add_index :appointments, :user_id
    add_index :appointments, :provider_id
    add_index :appointments, [:appointment_time, :provider_id], unique: true
  end
end
