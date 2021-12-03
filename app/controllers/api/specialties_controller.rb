class Api::SpecialtiesController < ApplicationController

  def index
    # @specialties = Specialty.where("specialty_name LIKE ? OR specialty_name LIKE ? ", "#{params[:name]}%", "% #{params[:name]}%")
    @specialties = Specialty.searchSpecialtyName(params[:name])

    render 'api/specialties/index'
  end
end
