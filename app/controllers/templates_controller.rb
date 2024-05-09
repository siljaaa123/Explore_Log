class TemplatesController < ApplicationController
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
end
