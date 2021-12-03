if @specialties.length != 0
  @specialties.each do |specialty|
    json.set! specialty.id do 
      json.extract! specialty, :id, :specialty_name
    end
  end
else
  {}
end