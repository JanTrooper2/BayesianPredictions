class ApiController < ApplicationController
  def index
    @predictions = Prediction.select { |prediction| prediction.outcome == ActiveModel::Type::Boolean.new.cast(params[:outcome]) }.first(params[:amount].to_i)
    render json: @predictions
  end

  private

  # def params 
  #   params.permit(:hi);
  # end
end
