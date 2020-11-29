require "rest-client"
require 'fileutils'

class RequestsController < ApplicationController
  def show
  end
  def new
    def get_trace()
      #{samples: "2000", x:"0.6,0.7", y: "1,1"}
      raw = RestClient::Request.execute(
        method: :get,
        url: 'http://badprior.com:5001/utils/get_trace?samples=2000&x=0.6,0.7,0.8&y=1,1,0',
        raw_response: true
      )
      FileUtils.mv(raw.file.path, 'app/assets/traces/trace.bin') 
    end
    def get_svg()
      RestClient.post(
        'http://badprior.com:5001/utils/posterior.svg', 
        :file => File.new("app/assets/traces/trace.bin", "rb"),
        timeout: 15
      ) { |response, request, result, &block|
        File.write("app/assets/images/plotGraph.svg", response)
      }
    end
    get_trace()
    get_svg()
  end
end


