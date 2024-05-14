class VideosController < ApplicationController
  def index
    @journey = Journey.find(params[:journey_id])
    generate_frames
  end

  def generate_frames
    @journey = Journey.find(params[:journey_id])
    @animation_frames = @journey.pins.map do |pin|
      template = Grover.new("http://localhost:3000/pins/#{pin.id}", format: 'A4')
      template.to_png
    end
    # Directory where the image files will be saved
    map = Grover.new("http://localhost:3000/journeys/#{@journey.id}/map", format: 'A4')
    @animation_frames << map.to_png
    temp_dir = Rails.root.join('tmp', 'images', 'test')
    FileUtils.mkdir_p(temp_dir) unless Dir.exist?(temp_dir)
    temp_files = @animation_frames.each_with_index.map do |frame, i|
      file_path = File.join(temp_dir, "frame_#{i+1}.png")  # Create sequential filenames
      File.binwrite(file_path, frame)
      file_path
    end
    output_file = Rails.root.join('tmp', 'output_movie.mp4')
    framerate = 0.5  # Each image shown for 2 seconds
    input_pattern = File.join(temp_dir, 'frame_%d.png')
    # Using system call to ffmpeg directly
    system("ffmpeg -framerate #{framerate} -i '#{input_pattern}' -vcodec libx264 -pix_fmt yuv420p -vf 'scale=1920:1080' '#{output_file}'")
    @movie = output_file.to_s
  ensure
    # Ensure temporary files are cleaned up
    temp_files.each { |file| File.delete(file) if File.exist?(file) }
  end
end

# SLIDESHOW VIDEO
# -----------------
# 1. screenshot of map
# 2. screenshot of each template page
# 3. Add all screenshots, i.e. frames, into @animation_frames
