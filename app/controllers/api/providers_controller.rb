class Api::ProvidersController < ApplicationController

  def show
    # note: params come in string
    # p params[:id]

    # @provider = Provider.find_by(id: params[:id].to_i)
    # debugger 
    @provider = Provider.find(params[:id])

    render "api/providers/show"
  end
end
