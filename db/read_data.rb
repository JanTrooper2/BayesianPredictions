File.open("/home/jantrooper2/Projects/BayesianPredictions/db/scotts_predictions_2018.txt", "r") do |f|
  title = ["US", "ECONOMICS AND TECHNOLOGY", "CULTURE WARS", "COMMUNITIES", "PERSONAL", "SECRET"]
  descriptions = []
  @percentages = []
  outcomes = []
  validLinesArr = []
  availableNumbers = (1..100).to_a 
  def check_percent(line)
    if line.include? "95"
      @percentages.push(95)
    elsif line.include? "90"
      @percentages.push(90)
    elsif line.include? "80"
      @percentages.push(80)
    elsif line.include? "70"
      @percentages.push(70)
    elsif line.include? "60"
      @percentages.push(60)
    elsif line.include? "50"
      @percentages.push(50)
    else
      return false
    end
  end
  f.each_line do |line|
    line = line.strip

    if line.include? "<p>"
      next
    elsif line.include? "<s>"
      outcomes.push(false)
      check_percent(line)
      descriptions.push(line.slice(6..-14).strip)
    else
      outcomes.push(true)
      check_percent(line)
      descriptions.push(line.slice(3..-10).strip)
    end
  end

  i = 0
  descriptions.length.times do
    puts (i+1).to_s + ". I predicted that: " + descriptions[i] + " comes true with a probability of: " + @percentages[i].to_s + "%, and it was " + outcomes[i].to_s
    i += 1
  end

end
# availableNumbers.each do |number| 
#   if line[0, 5].include? number.to_s
#     validLinesArr.push(line)
#     if check_percent(line) == false
#       puts line
#     end
#     break
#   end
# end

#puts outcomes.length
#puts @percentages.length
#puts descriptions
#puts validLinesArr.length
#p outcomes
#p @percentages
#puts outcomes[65]
#puts @percentages[65]