class ApplicationController < ActionController::Base
  #for testing
  protect_from_forgery with: :null_session

  helper_method :current_user, :logged_in?

  def current_user
    p "session token is..."
    p session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logged_in?
    !!current_user
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_logged_in
    unless logged_in?
      render json: ['Login required'], status: 401
      #Unauthorized
    end
  end
end
