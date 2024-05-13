class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  # before_action :remember_page, only: %i[index show]

  def configure_permitted_parameters
    # For additional fields in app/views/devise/registrations/new.html.erb
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])

    # For additional in app/views/devise/registrations/edit.html.erb
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end

  private

  def remember_page
    if params[:is_back]
      session[:previous_pages].pop
    else
      session[:previous_pages] ||= []
      session[:previous_pages] << url_for(params.to_unsafe_h) if request.get?
      session[:previous_pages]
    end
  end
end
