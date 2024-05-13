class VideosController < ApplicationController
  def index
    @journey = Journey.find(params[:journey_id])
    generate_frames
  end

  # def show
  #   @journey = Journey.find(params[:journey_id])
  # end

  def generate_frames
    api_endpoint = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/'
    access_token = ENV.fetch("MAPBOX_API_KEY")

    base_params = {
      width: 800, # Width of the map image
      height: 600, # Height of the map image
      style: 'mapbox://styles/mapbox/satellite-streets-v12', # Map style
      access_token: access_token # Mapbox access token
    }

    # Define an array to store animation frames
    @animation_frames = []

    # Iterate through sorted markers to create animation frames
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
      @markers.each do |pin|
        # Construct parameters for the map snapshot
        snapshot_params = {
          zoom: 10, # Zoom level for this frame (adjust as needed)
          center: "#{pin[:lng]},#{pin[:lat]}", # Center coordinates for this frame
          duration: 5 # Duration for this frame (adjust as needed)
        }
        # Merge base parameters with snapshot parameters
        params = base_params.merge(snapshot_params)

        # Construct the URL for the map snapshot
        @snapshot_url = "#{api_endpoint}#{params[:center]},#{params[:zoom]}/#{params[:width]}x#{params[:height]}?access_token=#{params[:access_token]}"

        # Create an animation frame with the snapshot URL and other parameters
        frame = {
          url: @snapshot_url, # URL of the map snapshot
          duration: params[:duration] # Duration of this frame
        }

        # Add the frame to the animation frames array
        @animation_frames << frame
      end
    else
      @journey_location = {
        lat: @journey.latitude,
        lng: @journey.longitude
      }
    end
  end
end
