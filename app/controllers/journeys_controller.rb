class JourneysController < ApplicationController
  before_action :set_journey, only: %i[show edit update map destroy]
  before_action :set_user, only: %i[new create edit update index]

  def index
    @journeys = @user.journeys.order(start_date: :DESC)
    if params[:query].present?
      @journeys = @journeys.where("name ILIKE ?", "%#{params[:query]}%")
    else
      puts "Journey does not exist"
    end
  end

  def show
  end

  def new
    @journey = Journey.new
  end

  def create
    @journey = Journey.new(journey_params)
    @journey.user = @user
    if @journey.save
      redirect_to map_journey_path(@journey)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @journey.update(journey_params)
      redirect_to journey_path(@journey)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @journey.destroy
    redirect_to journeys_path, status: :see_other
  end

  def map
    @pins = @journey.pins
    if @pins.any?
      # @pin = Pin.find(params[:pin_id])
      @markers = @pins.geocoded.map do |pin|
        {
          lat: pin.latitude,
          lng: pin.longitude,
          info_window_html: render_to_string(partial: "pins/info_window", locals: { pin: pin }),
          marker_html: render_to_string(partial: "pins/marker")
        }
      end
    else
      @journey_location = {
        lat: @journey.latitude,
        lng: @journey.longitude
      }
    end

  end

  private

  def set_user
    @user = current_user
  end

  def set_journey
    @journey = Journey.find(params[:id])
  end

  def journey_params
    params.require(:journey).permit(:description, :user_id, :name, :location, :completed, :start_date, :end_date, :cover_photo)
  end
end
