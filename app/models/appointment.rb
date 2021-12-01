class Appointment < ApplicationRecord
  validates :appointment_time,  presence: true
  validates :user_id,           presence: true
  validates :provider_id,       presence: true
  validates :reason,            presence: true
  validates :new_patient,       inclusion: {in: [true, false]} 
  validates :in_person,         inclusion: {in: [true, false]} 


  belongs_to :provider
  belongs_to :user

  def self.pacificDateTime(dateHash)
    DateTime.new.in_time_zone('Pacific Time (US & Canada)').change(
      year: dateHash[:year],
      month: dateHash[:month],
      day: dateHash[:day],
      hour: dateHash[:hr],
      min: dateHash[:min]
    )
  end



  def appointment_time_pacific
    self[:appointment_time].in_time_zone('Pacific Time (US & Canada)')
  end

  #testing..
  # dateHash = {year: 2021, month: 12, day: 2, hr: 10, min: 0}

  # test = Appointment.new(appointment_time: Appointment.pacificDateTime(dateHash), user_id: 1, provider_id: 2, reason: "illness", new_patient: true, in_person: true)

end
