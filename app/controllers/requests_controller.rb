require "rest-client"
require 'fileutils'
require 'open-uri'

class RequestsController < ApplicationController
  def index
    #@user = current_user
    @plots = current_user.plots
  end
  
  def show

  end

  def new
    #execute_working()
    execute_experimental()
    #experimental_get_trace()
  end

  def execute_working()
    working_get_trace()
    working_get_svg()
  end

  def working_get_trace()
    raw = RestClient::Request.execute(
      method: :get,
      url: 'http://badprior.com:5001/utils/get_trace?samples=2000&x=0.6,0.7,0.8&y=1,1,0',
      raw_response: true
    )
    FileUtils.mv(raw.file.path, 'app/assets/traces/trace.bin')
  end

  def working_get_svg()
    RestClient.post(
      'http://badprior.com:5001/utils/posterior.svg', 
      :file => File.new("app/assets/traces/trace.bin", "rb"),
      timeout: 15
    ) { |response, request, result, &block|
      File.write("app/assets/images/plotGraph.svg", response)
    }
  end

  def execute_experimental()
    experimental_get_trace()
    experimental_get_svg()
  end

  def experimental_get_trace()
    raw = RestClient::Request.execute(
      method: :get,
      url: 'http://badprior.com:5001/utils/get_trace?samples=2000&x=0.6,0.7,0.8&y=1,1,0',
      raw_response: true
    )
    current_user.traces.attach(io: File.open(raw.file.path), filename: 'trace.bin', content_type: 'application/octet-stream')
  end

  def experimental_get_svg()
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


### DEPRECIATED ###
  #:upload => {
    #:file => File.new(URI.open(url_for(current_user.traces[-1])), "rb")
    #:file => URI.open(url_for(current_user.traces[-1]))
    #:file => File.new(file_path, "rb")
  # },

  #FileUtils.mv(raw.file.path, 'app/assets/traces/trace.bin')
  #@user = User.find_by email: "developer@testing.com"