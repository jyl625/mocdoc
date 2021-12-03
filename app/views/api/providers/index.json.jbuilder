if @providers.length > 0
  json.providers do 
    @providers.each do |provider|
      json.set! provider.id do 
        json.partial! "api/providers/provider", provider: provider
      end
    end
  end
else 
  ({})
end

if @specialties.length != 0
  json.specialties do 
    @specialties.each do |specialty|
      json.set! specialty.id do 
        json.extract! specialty, :id, :specialty_name
      end
    end
  end
else
  json.specialties ({})
end