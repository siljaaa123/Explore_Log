class StickersController < ApplicationController
  def index
    @stickers = Sticker.all
  end

  def show
    @sticker = Sticker.find(params[:id])
  end
end
