from flask import Flask, render_template, request
from flask_pymongo import PyMongo


app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'enron'
mongo = PyMongo(app)
Senders = []

@app.route('/')
def years():

    years = mongo.db.years.find({}, {"_id":0, "count":0}).sort("year")
    count = mongo.db.years.find({},{"_id":0, "year":0}).sort("year")
    total = mongo.db.mail.count()


    return render_template('chart.html',
                           values=[count['count']for count in count], labels=[years['year'] for years in years], total=total
                           )


<<<<<<< HEAD
@app.route('/h', methods=['GET', 'POST'])
=======
@app.route('/', methods=['GET', 'POST'])
>>>>>>> 68246c7aa7ea52b19621821c291b6803d3e23886
def months():

    clicked = None
    if request.method == "POST":
        clicked = request.json['data']

<<<<<<< HEAD
        return render_template('test.html', value=clicked)
=======
        return render_template('chart.html', value=clicked)
>>>>>>> 68246c7aa7ea52b19621821c291b6803d3e23886

if __name__ == '__main__':
    app.run(debug=True)

