class Api::ProvidersController < ApplicationController

  def show
    # note: params come in string
    # p params[:id]

    # @provider = Provider.find_by(id: params[:id].to_i)
    # debugger 
    @provider = Provider.find(params[:id])

    render "api/providers/show"
  end

  def index 

    # Check if request is for featured providers

    if params[:featured]
      @providers = []
      @providers << Provider.find(1)
      @providers << Provider.find(2)

    else 
      # p params
      # p params[:plan]
      # p params[:specialty]

      # plan = params[:plan]
      # specialty = params[:specialty]

      @providers = Provider.searchByPlanAndSpecialty(params[:plan], params[:specialty])
    end

    specialty_ids = []
    @providers.map do |provider| 
      provider.specialties.each do |specialty|
        specialty_ids << specialty.id unless specialty_ids.include?(specialty.id)
      end
    end


    @specialties = Specialty.find(specialty_ids)

    # matching_specialties = Provider.joins(:specialties).where("lower(specialty_name) LIKE lower(?) OR lower(specialty_name) LIKE lower(?) ","#{specialty}%", "% #{specialty}%")

    # p matching_specialties.length

    # @providers = matching_specialties.select do |matched_provider| 
    #   matched_provider.insurances.where(plan_id: plan).length == 1
    # end

    # p @providers.length

    # @providers = Provider.all.limit(5)

    render "api/providers/index"
  end
end
# params = {plan:"aller", specialty:"70285CA1310001"}
# Provider.joins(:specialties).where("lower(specialty_name) LIKE lower(?) OR lower(specialty_name) LIKE lower(?) ",
# "aller%", "% aller%")

# aller.select {|prov| prov.insurances.where(plan_id: "70285CA1310001").length == 1}