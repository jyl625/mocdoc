class Api::InsurancesController < ApplicationController
  def index
    # note: params come in string
    # p params[:id]

    # @Insurance = Insurance.find_by(id: params[:id].to_i)
    # searching all insurances that match carrier id (hios_id)
    @insurances = Insurance.where(carrier: params[:carrier])

    render "api/insurances/index"
  end

  def show
    @insurance = Insurance.find_by(plan_id: params[:id])

    render "api/insurances/show"
  end
end
