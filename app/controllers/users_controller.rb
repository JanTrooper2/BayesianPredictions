class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  def show
    @user = User.find(params[:id])
  end
  def index
    #@users = User.all
    @predictions = current_user.predictions.all
    @fullfilled = @predictions.select { |prediction| prediction.outcome != nil }
    @uncertain = @predictions.select { |prediction| prediction.outcome == nil }
  end
end
