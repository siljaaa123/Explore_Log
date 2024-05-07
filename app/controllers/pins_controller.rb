class PinsController < ApplicationController
  before_action :set_pin, only: %i[show edit update]
  before_action :set_user, only: %i[new create edit update]
  before_action :set_journey, only: %i[new create edit update]

  def index
    @pins = Pin.all
  end

  def show
  end

  def new
    @pin = Pin.new
  end

  def create
    @pin = Pin.new(pin_params)
    @journey.user = @user
    @pin.journey = @journey
    if @pin.save
      redirect_to pin_path(@pin)
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
end
