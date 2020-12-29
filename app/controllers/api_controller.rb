class ApiController < ApplicationController
  def index
    if params[:override] == "all"
      @predictions = current_user.predictions
    else
      @predictions = current_user.predictions.select { |prediction| 
        if params[:outcome] != nil
          prediction.outcome == ActiveModel::Type::Boolean.new.cast(params[:outcome])
        else 
          prediction.outcome == nil
        end 
      }
      unless params[:amount].nil?
        @predictions = @predictions.first(params[:amount].to_i)
      end
    end
    render json: @predictions
  end

  private

  # def params 
  #   params.permit(:hi);
  # end
end
