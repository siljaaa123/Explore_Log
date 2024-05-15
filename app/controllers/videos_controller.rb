class VideosController < ApplicationController
  before_action :set_journey

  def index
    generate_frames
  end

  def generate_frames
    @animation_frames = @journey.pins.map do |pin|
      @template = Grover.new("https://www.explorelog.me/pins/#{pin.id}", format: 'A4')
      @template.to_png
    end
    # Directory where the image files will be saved
    @map = Grover.new("https://www.explorelog.me/journeys/#{@journey.id}/map", format: 'A4')
    @animation_frames << @map.to_png
    if @animation_frames.present?
      # Create temporary files and perform further processing
      temp_dir = Rails.root.join('tmp', 'images', 'test')
      FileUtils.mkdir_p(temp_dir)
      @temp_files = @animation_frames.each_with_index.map do |frame, i|
        file_path = File.join(temp_dir, "frame_#{i+1}.png")  # Create sequential filenames
        File.binwrite(file_path, frame)
        file_path
      end
    else
      flash[:error] = "No animation frames found."
    end
    output_file = Rails.root.join('tmp', 'output_movie.mp4')
    framerate = 0.5  # Each image shown for 2 seconds
    input_pattern = File.join(temp_dir, 'frame_%d.png')
    # Using system call to ffmpeg directly
    system("ffmpeg -framerate #{framerate} -i '#{input_pattern}' -vcodec libx264 -pix_fmt yuv420p -vf 'scale=1920:1080' '#{output_file}'")
    @movie = output_file.to_s

  # ensure
    # Ensure temporary files are cleaned up
    # @temp_files.each { |file| FileUtils.rm_f if File.exist?(file) }
  end

  private

  def set_journey
    @journey = Journey.find(params[:journey_id])
  end
end

# SLIDESHOW VIDEO
# -----------------
# 1. screenshot of map
# 2. screenshot of each template page
# 3. Add all screenshots, i.e. frames, into @animation_frames
