# Sentiment-Analysis---Enron-

The aim of the project is to create an email analyser with the focus on Sentiment analysis. 5 methods of sentiment analysis will be used to determine a sentiment score per email. The results from the all analysis methods will be visualised on 1 line chart to show the variation in scores given for the same email. 

Other types of visulisation should include a bar graph to show the number of emails per year/month/day etc and perhaps a node diagram to determine frequent communication between senders and recievers. 


The Enron dataset in CSV format can be downloaded from here: 
              https://www.dropbox.com/s/ennih2d7z261zru/enron.csv?dl=0

The CSV can then be uploaded to mongo using the follow command in terminal in the same directory as the csv is saved:


              mongoimport --db enron --collection emails --type csv --headerline --file enron.csv


Once the csv has finshed uploading, you can check the db has been created using 'show dbs' which should show 'enron' in the list.


Next the time format needs to be modified so that it fits with the mongo iso format:


        	-Navigate to the db - 'use enron'
          
          
         	-Enter the following command:
          
          
                            db.emails.find().forEach(function(doc) { 
                                doc.headers.DateStamp=new Date(doc.DateStamp);
                                db.emails.save(doc); 
                                })
                                
              
 
 Visulisation will be done using Flask and chart.js or D3.
 
In order to start a bar graph for emails per day, a mongo query must be run to determine the years associated with the dataset. 
To do this, run 'date analysis.py' which will find all the years associated with the dataset and provide a count of emails for each year. The script will insert this information into mongo under collection name 'years'.
 
To visualise the data above, install flask and run 'years.py' with 'chart.html' in a seperate folder names templates. 


          


