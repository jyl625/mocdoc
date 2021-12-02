class AddPlanIdToAppointments < ActiveRecord::Migration[5.2]
  def change
    add_column :appointments, :plan_id, :string, null: false
  end
end
