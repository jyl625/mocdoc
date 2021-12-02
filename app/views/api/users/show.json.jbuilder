json.user do   
  json.partial! "api/users/user", user: @user
end

if @user.insurance
  json.insurance do 
    json.set! @user.insurance.plan_id do 
      json.extract! @user.insurance, :plan_id, :hios_id, :carrier, :plan
    end
  end
else
  json.insurance ({})
end

if @user.appointments
  json.appointments do
    @user.appointments.each do |appointment|
      json.set! appointment.id do
        json.id appointment.id
        json.user_id appointment.user_id
        json.provider_id appointment.provider_id
        json.reason appointment.reason
        json.new_patient appointment.new_patient
        json.in_person appointment.in_person
        json.plan_id appointment.plan_id
        json.appointment_time appointment.appointment_time_pacific
      end
    end
  end
end

if @user.providers
  json.providers do 
    @user.providers.each do |provider|
      json.set! provider.id do 
        json.partial! "api/providers/provider", provider: provider
      end
    end
  end
end