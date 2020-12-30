class ApiController < ApplicationController
  def index
    @predictions = current_user.predictions.select { |prediction| 
      if params[:outcome] != nil
        if params[:outcome] == "both"
          prediction.outcome != nil
        else
          prediction.outcome == ActiveModel::Type::Boolean.new.cast(params[:outcome])
        end
      else 
        prediction.outcome == nil
      end 
    }
    unless params[:amount].nil?
      @predictions = @predictions.first(params[:amount].to_i)
    end
    render json: @predictions
  end

  private

  # def params 
  #   params.permit(:hi);
  # end
end
