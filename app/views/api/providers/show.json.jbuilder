json.provider do 
  json.partial! "api/providers/provider", provider: @provider
end

if @provider.specialties.length != 0
  json.specialties do 
    @provider.specialties.each do |specialty|
      json.set! specialty.id do 
        json.extract! specialty, :id, :specialty_name
      end
    end
  end
else
  json.specialties ({})
end

if @provider.insurances.length != 0
  json.insurances do 
    @provider.insurances.each do |insurance|
      json.set! insurance.plan_id do 
        json.extract! insurance, :plan_id, :hios_id, :carrier, :plan
      end
    end
  end
else
  json.insurances ({})
end

if @provider.appointments.length != 0
  json.appointments do
    @provider.appointments.each do |appointment|
      json.set! appointment.id do
        json.id appointment.id
        json.user_id appointment.user_id
        # json.plan_id @appointment.plan_id
        json.appointment_time appointment.appointment_time_pacific
      end
    end
  end
end

# json.extract! @provider, :id, :npi, :name