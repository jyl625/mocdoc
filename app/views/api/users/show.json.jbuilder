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