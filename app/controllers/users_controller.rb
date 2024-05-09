class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    # check the name of the template and render the view with the associated name
  end
end
