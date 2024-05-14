class TemplatesController < ApplicationController
  before_action :set_pin, only: %i[show]


  def index
    @templates = Template.all
  end

  def show
    case params[:id]
    when 'floral'
      render 'floral'
    when 'blank'
      render 'blank'
    when 'christmas'
      render 'christmas'
    when 'roadtrip'
      render 'roadtrip'
    when 'ocean'
      render 'ocean'
    when 'vintage'
      render 'vintage'
    when 'family'
      render 'family'
    when 'love'
      render 'love'
    else
      @template = Template.find(params[:id])
    end
  end

  private

  def set_pin
    @pin = Pin.find(params[:pin_id])
  end
end
