class UsersController < ApplicationController
  def index
    @user = current_user
  end

  def show
    @user = current_user
    # check the name of the template and render the view with the associated name
  end
end
