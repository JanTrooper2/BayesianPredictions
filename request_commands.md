wget 'http://badprior.com:5001/utils/get_trace?samples=2000&x=0.6,0.7&y=1,1' -O trace2.bin
curl -X POST -F "file=@trace2.bin;filename=trace.bin" "http://badprior.com:5001/utils/posterior.png" > test123.png
curl -X POST -F "file=@trace2.bin;filename=trace.bin" "http://badprior.com:5001/utils/posterior_predictive.png" > test123.png
curl -X POST -F "file=@trace2.bin;filename=trace.bin" "http://badprior.com:5001/utils/posterior_predictive.svg" > test123.svg
