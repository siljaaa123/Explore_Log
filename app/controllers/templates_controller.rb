class TemplatesController < ApplicationController
  before_action :set_pin, only: %i[show]

  def index
    @templates = Template.all
  end

  def show
    if params[:id] == 'floral'
      render 'floral'
    else
      @template = Template.find(params[:id])
    end
  end


  private

  def set_pin
    @pin = Pin.find(params[:pin_id])
  end
end
