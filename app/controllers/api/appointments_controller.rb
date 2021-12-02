class Api::AppointmentsController < ApplicationController
  def show
    @appointment = Appointment.find(params[:id])

    render "api/appointments/show"
  end

  def create 
    p appointment_params

    dateHash = {
      year: appointment_params[:year],
      month: appointment_params[:month],
      day: appointment_params[:day],
      hour: appointment_params[:hour],
      min: appointment_params[:min],
    }

    @appointment = Appointment.new(
      appointment_time: Appointment.pacificDateTime(dateHash), 
      user_id: appointment_params[:user_id], 
      provider_id: appointment_params[:provider_id], 
      reason: appointment_params[:reason], 
      new_patient: appointment_params[:new_patient], 
      in_person: appointment_params[:in_person],
      plan_id: appointment_params[:plan_id])

    if @appointment.save
      render "api/appointments/show"
    else
      render json: @appointment.errors.full_messages, status: 422
    end
  end

  def destroy 
    @appointment = Appointment.find(params[:id])
    @appointment.destroy

    render "api/appointments/show"
  end

  def update
    dateHash = {
      year: appointment_params[:year],
      month: appointment_params[:month],
      day: appointment_params[:day],
      hour: appointment_params[:hour],
      min: appointment_params[:min],
    }

    @appointment = Appointment.find(params[:id])

    p @appointment
    if @appointment.update(
      appointment_time: Appointment.pacificDateTime(dateHash), 
      user_id: appointment_params[:user_id], 
      provider_id: appointment_params[:provider_id], 
      reason: appointment_params[:reason], 
      new_patient: appointment_params[:new_patient], 
      in_person: appointment_params[:in_person],
      plan_id: appointment_params[:plan_id])
      
      render "api/appointments/show"
    else
      render json: @appointment.errors.full_messages, status: 422
    end
  end

  private
  def appointment_params
    params.require(:appointment).permit(
      :year, 
      :month, 
      :day, 
      :hour, 
      :min, 
      :user_id, 
      :provider_id, 
      :plan_id,
      :reason, 
      :new_patient, 
      :in_person, 
    )
  end
end
