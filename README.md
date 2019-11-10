# Rank My App Test

This repo is a Rank My App test for a recruiting process.

The test consist in a CRUD Node.JS based application which can set alerts for products with [Ebay FindingAPI](https://developer.ebay.com/devzone/finding/Concepts/FindingAPIGuide.html).

These alerts are set, exclusively for **2,** **10** or **30** minutes. You have to provide an **email** and a **Search Phrase** (what product you want to find). After that, the application will send an email according to your search, ainda at specified time.

There are 7 controllers in the application, as it follows:

- **getAlerts** (GET): which returns all the alerts saved in the DB;
- **getAlertsByEmail** (GET): which returns all the alerts given the email in the parameters of the request;
- **getAlertsByTime** (GET): which returns all the alerts given the time (**2MIN**, **10MIN** or **30MIN**, writed as it is) in the parameters of the request;
- **createAlert** (POST): which create an alert. You have to specify and email, an updateTime and a searchPhrase;
- **updateAlertSearchPhrase** (PUT): which will update an alert searchPhrase, given the email and the old searchPhrase;
- **updateAlertTime** (PUT): which will update the time of the alert, given the email and the searchPhrase;
- **deleteAlert** (DELETE): which delete the alert specified, given the email and the searchPhrase.

## Sending Requests

To sending the requests, in the command line (using **curl**).
Examples:

- **getAlerts**: curl -v http://localhost:3040/alert/get
- **getAlertsByEmail**: curl -v http://localhost:3040/alert/get/email?email=someemail@email.com
- **getAlertsByTime**: curl -v http://localhost:3040/alert/get/uptime?updateTime=2MIN
- **createAlert**: curl -d '{"searchPhrase":"Harry Potter Toy","email":"someemail@email.com","updateTime":"30MIN"}' -H 'Content-Type: application/json' http://localhost:3040/alert/create
- **updateAlertSearchPhrase**: curl -d '{"searchPhrase":"Harry Potter Toy","email":"someemail@email.com","updatedSearchPhrase":"Harry Potter Toy Hermione"}' -H 'Content-Type: application/json' -X PUT http://localhost:3040/alert/update
- **updateAlertTime**: curl -d '{"searchPhrase":"Harry Potter Toy Hermione","email":"someemail@email.com","newTime":"10MIN"}' -H 'Content-Type: application/json' -X PUT http://localhost:3040/alert/update/time
- **deleteAlert**: curl -d '{"searchPhrase":"Harry Potter Toy Hermione","email":"someemail@email.com"}' -H 'Content-Type: application/json' -X DELETE http://localhost:3040/alert/delete

## Running the application

The application was made in Node.JS using the MongoDB as the DB. So, it was created a Dockerfile and a docker-compose.yml file to up the application. to run, just (in the app folder):

> docker-compose up

## Features used

For the application, it was used Express, Mongoose, Axios and NodeMailer.
The MongoDB version used was the 4.0.3 (based on test with the MongoDB Atlas) and the Node.JS version was 8.x.