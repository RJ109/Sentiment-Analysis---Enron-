from flask import Flask, render_template, request
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
import pymongo
import json
import datetime

app = Flask(__name__)


app.config['MONGO_DBNAME'] = 'enron'
mongo = PyMongo(app)


@app.route('/')
def Dashboard():
    return render_template('dashboard.html')


@app.route('/email_count_year')
def email_count_year():
    output = {}

    output['years'] = mongo.db.mail.aggregate([{"$group":{"_id": {"$year": "$headers.DateStamp" },
                       "yearcount":{"$sum":1} } },{ "$sort":{"_id":1} } ])

    return dumps(output);


@app.route('/email_count_month')
def email_count_month():
    input = request.args.get('year');
    output = {}

    GT = datetime.datetime(int(input), 1, 1, 00, 00, 00)
    LT = datetime.datetime(int(input), 12, 31, 23, 59, 59)

    output['year'] = input
    output['months'] = mongo.db.mail.aggregate([{ "$match": { "headers.DateStamp" : {"$gte": GT,"$lt": LT} } },
                                        {"$group": {"_id": {"$month": "$headers.DateStamp"},
                                                    "monthcount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])
    return dumps(output);


@app.route('/top_senders')
def top_senders():
    output = {}

    output['sender'] = mongo.db.mail.aggregate([{ "$group": { "_id": "$headers.From",
        "sendercount": { "$sum": 1}, }}, {"$sort":{"sendercount":-1}},{ "$limit": 10 }]);

    return dumps(output);


@app.route('/message_search')
def message_search():

    input = request.args.get('test');
    messagebody = mongo.db.mail.find_one({'_id': ObjectId(str(input))}, {"_id": 0, "body": 1})

    return json.dumps(messagebody['body']);


@app.route('/sentiment_comparison')
def sentiment_comparison():
    output = {}

    GT = datetime.datetime(1999, 1, 1, 00, 00, 00)
    LT = datetime.datetime(1999, 2, 25, 23, 59, 59)

    sentiment_date = mongo.db.vadar.find({"headers.DateStamp": {"$gte": GT, "$lt": LT}}, {"_id": 0}).sort("date",pymongo.ASCENDING)
    sentiment1_score = mongo.db.vadar.find({"headers.DateStamp": {"$gte": GT, "$lt": LT}},{"_id": 0, "sentiment Score": 1}).sort("date", pymongo.ASCENDING)
    sentiment2_score = mongo.db.textblob.find({"headers.DateStamp": {"$gte": GT, "$lt": LT}},{"_id": 0, "sentiment Score": 1}).sort("date", pymongo.ASCENDING)
    sentiment3_score = mongo.db.senticnet_mean.find({"headers.DateStamp": {"$gte": GT, "$lt": LT}}, {"_id": 0, "sentiment Score": 1}).sort("date", pymongo.ASCENDING)
    sentiment4_score = mongo.db.senticnet_median.find({"headers.DateStamp": {"$gte": GT, "$lt": LT}}, {"_id": 0, "sentiment Score": 1}).sort("date", pymongo.ASCENDING)
    message_id = mongo.db.mail.find({"headers.DateStamp": {"$gte": GT, "$lt": LT}}, {"sentiment Score": 0}).sort("date",pymongo.ASCENDING)

    return dumps(output);


@app.route('/sentiment_comparison_year')
def sentiment_comparison_year():
    output = {}

    output['vadar'] = mongo.db.vadar.aggregate([{"$group": {"_id": {"$year" : "$date"}, "sentimentscore": {"$avg": "$sentiment Score"},}
        },{ "$sort":{"_id":1} }])

    output['textblob'] = mongo.db.textblob.aggregate([{"$group": {"_id": {"$year" : "$date"}, "sentimentscore": {"$avg": "$sentiment Score"},}
        },{ "$sort":{"_id":1} }])

    output['sentimean'] = mongo.db.senticnet_mean.aggregate([{"$group": {"_id": {"$year" : "$date"}, "sentimentscore": {"$avg": "$sentiment Score"},}
        },{ "$sort":{"_id":1} }])

    output['sentimed'] = mongo.db.senticnet_median.aggregate([{"$group": {"_id": {"$year" : "$date"}, "sentimentscore": {"$avg": "$sentiment Score"},}
        },{ "$sort":{"_id":1} }])


    output
    return dumps(output);



if __name__ == '__main__':
    app.run(debug=True)
