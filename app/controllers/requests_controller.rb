require "rest-client"
require 'fileutils'
require 'open-uri'

class RequestsController < ApplicationController
  def index
    @plots = current_user.plots
  end
  
  def show
    @plot = current_user.plots.find_by id: (params[:id].to_i)
  end

  def new
    get_trace()
    get_svg()
  end

  def get_trace()
    raw = RestClient::Request.execute(
      method: :get,
      url: 'http://badprior.com:5001/utils/get_trace?samples=2000&x=0.6,0.7,0.8&y=1,1,0',
      raw_response: true
    )
    current_user.traces.attach(io: File.open(raw.file.path), filename: 'trace.bin', content_type: 'application/octet-stream')
  end

  def get_svg()
    current_user.traces.last.open do |file| 
      FileUtils.mv(file.path, 'app/assets/traces/trace.bin')
      RestClient.post(
        'http://badprior.com:5001/utils/posterior.svg', 
        :file => File.new('app/assets/traces/trace.bin', "rb"),
        timeout: 15
      ) { |response, request, result, &block|
        File.write("app/assets/images/tmp.svg", response)
        current_user.plots.attach(io: File.open("app/assets/images/tmp.svg"), filename: 'plot.svg', content_type: 'image/svg+xml')
      }
    end
  end 
end

