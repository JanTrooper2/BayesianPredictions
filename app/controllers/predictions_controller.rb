class PredictionsController < ApplicationController
  before_action :set_prediction, only: [:show, :edit, :update, :destroy]

  # GET /predictions
  # GET /predictions.json
  def index
    if user_signed_in?
      @predictions = current_user.predictions
    end
  end

  # GET /predictions/1
  # GET /predictions/1.json
  def show
  end

  # GET /predictions/new
  def new
    @prediction = Prediction.new
  end

  # GET /predictions/1/edit
  def edit
  end

  # POST /predictions
  # POST /predictions.json
  def create
    @prediction = Prediction.new(prediction_params)

    respond_to do |format|
      if @prediction.save
        format.html { redirect_to @prediction, notice: 'Prediction was successfully created.' }
        format.json { render :show, status: :created, location: @prediction }
      else
        format.html { render :new }
        format.json { render json: @prediction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /predictions/1
  # PATCH/PUT /predictions/1.json
  def update
    respond_to do |format|
      if @prediction.update(prediction_params)
        format.html { redirect_to @prediction, notice: 'Prediction was successfully updated.' }
        format.json { render :show, status: :ok, location: @prediction }
      else
        format.html { render :edit }
        format.json { render json: @prediction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /predictions/1
  # DELETE /predictions/1.json
  def destroy
    @prediction.destroy
    respond_to do |format|
      format.html { redirect_to predictions_url, notice: 'Prediction was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_prediction
      @prediction = Prediction.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def prediction_params
      params.require(:prediction).permit(:name, :description, :probability_in_percent, :user_id)
    end
end
