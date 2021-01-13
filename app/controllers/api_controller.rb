class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @predictions = current_user.predictions.order(params[:predictionsOrder]).select { |prediction| 
      if params[:outcome] == "both"
        prediction.outcome != nil
      elsif params[:outcome] == "null"
        prediction.outcome == nil
      elsif params[:outcome] == "all"
        !prediction.name.nil?
      else
        prediction.outcome == ActiveModel::Type::Boolean.new.cast(params[:outcome])
      end
    }
    @predictions = @predictions[params[:pageOffset].to_i, params[:amount].to_i] unless params[:amount] == "all"
    render json: @predictions
  end


  def create
    string = params[:_json]
    params[:_json].map{|object|
      Prediction.create(name: object[:name], description: object[:description], probability_in_percent: object[:probability_in_percent], expiration_date: object[:expiration_date], outcome: object[:outcome], user_id: current_user.id,)
    }
  end
  private

  
  
  # def params 
  #   params.permit(:hi);
  # end
end
