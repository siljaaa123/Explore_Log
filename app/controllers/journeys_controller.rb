class JourneysController < ApplicationController
  before_action :set_journey, only: %i[show edit update map]
  before_action :set_user, only: %i[new create edit update]

  def index
    @journeys = Journey.order(start_date: :DESC)
    if params[:query].present?
      @journeys = @journeys.where("title ILIKE ?", "%#{params[:query]}%")
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
      redirect_to journey_path(@journey)
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
    @pins = Pin.all
    @pin = Pin.find(params[:id])
    @markers = @pins.geocoded.map do |pin|
      {
        lat: pin.latitude,
        lng: pin.longitude,
        info_window_html: render_to_string(partial: "pins/info_window", locals: { pin: pin }),
        marker_html: render_to_string(partial: "pins/marker")
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
    params.require(:journey).permit(:description, :user_id, :name, :location, :completed, :start_date, :end_date)
  end
end
