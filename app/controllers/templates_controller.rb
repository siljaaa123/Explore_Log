class TemplatesController < ApplicationController
  def index
    @templates = Template.all
  end

  def show
    @template = Template.find(params[:id])
    # check the name of the template and render the view with the associated name
  end
end
