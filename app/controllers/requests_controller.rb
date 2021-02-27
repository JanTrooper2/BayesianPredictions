require "rest-client"
require 'fileutils'
require 'open-uri'

class RequestsController < ApplicationController
  def index
    @plots = current_user.plots
    @ids = @plots.map do |plot|
      plot.id
    end
    @dates = @plots.map do |plot|
      plot.created_at.strftime("%d/%m/%Y" + " at " + "%k:%M") 
    end
    @ids.pop
  end
  
  def show
    @plot = current_user.plots.find_by id: (params[:id].to_i)
    @id = params[:id]
  end

  def new
    percentage_arr = []
    outcome_arr = []
    selected_predictions = (params[:year] == "0" || params[:year].nil?) ? current_user.predictions : current_user.predictions.select{|prediction|
      prediction.expiration_date.year == params[:year].to_i
    }
    selected_predictions = (params[:category] == "all" || params[:category].nil?) ? selected_predictions : selected_predictions.select{|prediction|
      prediction.category == params[:category]
    }
    selected_predictions.each do |prediction| 
      next if prediction.outcome.nil?
      if prediction.probability_in_percent < 50
        percentage_arr.append(((100 - prediction.probability_in_percent) * 0.01).round(2))
        prediction.outcome ? outcome_arr.append(0) : outcome_arr.append(1)
      else
        percentage_arr.append((prediction.probability_in_percent * 0.01).round(2))
        prediction.outcome ? outcome_arr.append(1) : outcome_arr.append(0)
      end
    end
    if percentage_arr.length > 9
      get_trace(percentage_arr.join(","), outcome_arr.join(","))
      get_svg()
      @message = "Successfull!"
    else
      @message = "Error, you need at least 10 Expired Predictions."
    end
  end
  def destroy
    # implement garabage collection for traces
    current_user.plots.find_by(id: params[:id]).delete
    redirect_to requests_path, notice: 'Calibration Plot was successfully destroyed.'
  end

  def get_trace(percentages, outcomes)
    raw = RestClient::Request.execute(
      method: :get,
      url: "http://badprior.com:5001/utils/get_trace?samples=2000&x=#{percentages}&y=#{outcomes}",
      raw_response: true,
      timeout: 60
    )
    current_user.traces.attach(io: File.open(raw.file.path), filename: 'trace.bin', content_type: 'application/octet-stream')
  end

  def get_svg()
    current_user.traces.last.open do |file| 
      FileUtils.mv(file.path, 'app/assets/tmp/trace.bin')
      RestClient.post(
        'http://badprior.com:5001/utils/posterior_predictive.svg', # need to figure out whether I should use only posterior predictive or both
        :file => File.new('app/assets/tmp/trace.bin', "rb"),
        timeout: 15
      ) { |response, request, result, &block|
        File.write("app/assets/tmp/graph.svg", response)
        current_user.plots.attach(io: File.open("app/assets/tmp/graph.svg"), filename: 'plot.svg', content_type: 'image/svg+xml')
      }
    end
  end 

end

