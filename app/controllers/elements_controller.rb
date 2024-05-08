class ElementsController < ApplicationController
  before_action :set_element, only: %i[show edit update]
  before_action :set_pin, only: %i[new create edit update]

  def index
    @elements = Element.all
  end

  def show
  end

  def new
    @element = Element.new
  end

  def create
    @element = Element.new(element_params)
    @element.pin = @pin
    if @element.save
      redirect_to element_path(@element)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @element.update(element_params)
      redirect_to element_path(@element)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @element.destroy
    redirect_to elements_path, status: :see_other
  end

  private

  def set_element
    @element = Element.find(params[:id])
  end

  def set_pin
    @pin = Journey.find(params[:pin_id])
  end

  def element_params
    params.require(:element).permit(:pin_id, :type, :x_position, :y_position, :width, :height, :content, :rotation)
  end
end
