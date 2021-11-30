class Api::InsurancesController < ApplicationController
  def show
    # note: params come in string
    # p params[:id]

    # @Insurance = Insurance.find_by(id: params[:id].to_i)
    # searching all insurances that match carrier id (hios_id)
    @insurances = Insurance.where(hios_id: "27603")

    render "api/insurances/show"
  end
end
