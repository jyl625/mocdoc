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

# json.extract! @provider, :id, :npi, :name