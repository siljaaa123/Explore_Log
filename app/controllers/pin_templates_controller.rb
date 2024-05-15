class PinTemplatesController < ApplicationController
  def create
    pin = Pin.find(params[:pinId])
    pin_template = pin.pin_templates.create(html_content: params[:htmlContent])
    if pin_template.persisted?
      render json: { success: true, pin_template_id: pin_template.id }
    else
      render json: { success: false, error: "Failed to save template" }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { success: false, error: e.message }, status: :unprocessable_entity
  end
end
