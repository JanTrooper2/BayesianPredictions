# Welcome to Bayesian Predictions!
This Website was created for the purpose of evaluating the accuracy of your predictions to align yourself closer with reality.
Check out the live version here: https://bayesianpredictions.herokuapp.com

## Instructions

Create a new account or login to your existing account.
If you don't want to create an account, you can use this guest account: Email: guest@user.com Password: guestuser

You will be redirected to your dashboard where you can see your predictions or change your account settings.

With the prediction table, you are able to filter your predictions or create new ones.

If you would like to calibrate the accuracy of your predictions, click the "Calibration" button which will lead you to the Calibration page.
There you can click on Calibrate (You need at least 10 resolved predictions.) or see your previous calibrations.

After you click calibrate, you will receive the Posterior Predictive of the Bayesian Logistic Model made by Jan Christian Refsgaard.


## JSON Upload format
The entire Upload has to be encased with square brackets.
Each prediction has to be seperated by a comma.
Inside of each prediction you need to add the following value pairs: name(with quotation marks), outcome(without quotation marks), description(with quotation marks), probability_in_percent(without quotation marks), expiration_date(YYYY-MM-DD (without quotation marks))

Example:  [{'{"name": "Prediction1", "probability_in_percent": 10, ...}, {"name": "Prediction2","expiration_date": 2020-05-05, ...}'}]

## Latest Major Updates
+ Inclusion of React.
+ Prediction Table now filterable!
+ Prediction Table now sortable
+ Mathjax updated to new Version.
+ support for up- and downloading your predictions with JSON
+ Calibration for selected years


## Copyright
2020 Copyright Jan Görgens & Jan Christian Refsgaard
