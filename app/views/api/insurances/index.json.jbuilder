if @insurances.length != 0
  @insurances.each do |insurance|
    json.set! insurance.plan_id do 
      json.extract! insurance, :plan_id, :hios_id, :carrier, :plan
    end
  end
else
  {}
end