class PinsController < ApplicationController
  before_action :set_pin, only: %i[show edit update]
  before_action :set_user, only: %i[new create edit update]
  before_action :set_journey, only: %i[new create edit update]
  before_action :remember_page, only: %i[index show]

  def index
    @pins = @user.pins
  end

  def show
    @template_content = @pin.pin_templates.last&.html_content
  end

  def new
    @pin = Pin.new
  end

  def create
    @pin = Pin.new(pin_params)
    @journey.user = @user
    @pin.journey = @journey
    if @pin.save
      redirect_to pin_templates_path(@pin)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @pin.update(pin_params)
      redirect_to pin_path(@pin)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @pin.destroy
    redirect_to pins_path, status: :see_other
  end

  private

  def set_user
    @user = current_user
  end

  def set_pin
    @pin = Pin.find(params[:id])
  end

  def set_journey
    @journey = Journey.find(params[:journey_id])
  end

  def pin_params
    params.require(:pin).permit(:journey_id, :user_id, :date, :location)
  end

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
