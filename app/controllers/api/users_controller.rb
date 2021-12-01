class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
      #unprecessible entity
    end
  end

  #maybe this is unnecessary, instead will use session#create to get current user
  # def show
  #   @user = User.find_by(id: params[:id])

  #   if @user
  #     render "api/users/show"
  #   else
  #     render json: ["User Not Found"], status: 404
  #     # Not Found
  #   end
  # end


  private
  def user_params
    params.require(:user).permit(
      :email, 
      :password, 
      :first_name, 
      :last_name, 
      :date_of_birth,
      :plan_id
    )
  end

end

