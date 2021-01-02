# Welcome to Bayesian Predictions!
This Website was created for the purpose of evaluating the accuracy of your predictions to align yourself closer with reality.


## Instructions

You need to create a user account in order to use this website. (Currently there is no Email verification.)

Once you are logged in you will see all the predictions you made that are unresolved. You can create new ones, update your existing ones or delete them.

You can click on expired predictions to see all your resolved predictions.

You can evaluate all your resolved predictions by clicking Calibrate. (You need at least 10 resolved predictions.)
You can make a trace request or see your previously requested evaluations. 
You will receive the Posterior Predictive of the Bayesian Logistic Model made by Jan Christian Refsgaard.
The black line is the perfect predictor, the blue line shows your position.



## JSON Upload format
The entire Upload has to be encased with square brackets.
Each prediction has to be seperated by a comma.
Inside of each prediction you need to add the following value pairs: name(with quotation marks), outcome(without quotation marks), description(with quotation marks), probability_in_percent(without quotation marks), expiration_date(YYYY-MM-DD (without quotation marks))

Example:  [{'{"name": "Prediction1", "probability_in_percent": 10, ...}, {"name": "Prediction2","expiration_date": 2020-05-05, ...}'}]

## Latest Major Updates
+ Inclusion of React.
+ Prediction Table now filterable!
+ New User experience improved.
+ Mathjax updated to new Version.
+ support for up- and downloading your predictions with JSON
+ Calibration for selected years

## Steps to Work on:
### Priority High
- allow a button for callibration 2018, 2019, 2020, all, so create buttoms based on each year where predictions exists => change year by year

### Priority Medium

### Priority Low
- make it so that the user lands on a page rather than waiting for the trace request



## Important Links

- https://guides.rubyonrails.org/active_storage_overview.html
- https://s3.console.aws.amazon.com/s3/buckets/bayesian-predictions?region=eu-central-1&tab=objects
- https://github.com/rest-client/rest-client


## Copyright
2020 Copyright Jan Görgens & Jan Christian Refsgaard