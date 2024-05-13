class TemplatesController < ApplicationController
  before_action :set_pin, only: %i[show]
  before_action :remember_page, only: %i[index show]

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
