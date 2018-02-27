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

YEARS = []

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
    year = request.args.get('year');
    output = {}


    GT = datetime.datetime(int(year), 1, 1, 00, 00, 00)
    LT = datetime.datetime(int(year), 12, 31, 23, 59, 59)


    output['months'] = mongo.db.mail.aggregate([{ "$match": { "headers.DateStamp" : {"$gte": GT,"$lt": LT} } },
                                            {"$group": {"_id": {"$month": "$headers.DateStamp"},
                                                        "monthcount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])
    YEARS.append(year)

    return dumps(output);


@app.route('/email_count_day')
def email_count_day():

    month = request.args.get('month');
    output = {}

    for y in YEARS:
        if month ==  '4' or '6' or '9' or '11':
            GT = datetime.datetime(int(y), int(month), 1, 00, 00, 00)
            LT = datetime.datetime(int(y), int(month), 30, 23, 59, 59)
        elif month == '2':
            GT = datetime.datetime(int(y), int(month), 1, 00, 00, 00)
            LT = datetime.datetime(int(y), int(month), 28, 23, 59, 59)
        else:
            GT = datetime.datetime(int(y), int(month), 1, 00, 00, 00)
            LT = datetime.datetime(int(y), int(month), 31, 23, 59, 59)

        output['days'] = mongo.db.mail.aggregate([{ "$match": { "headers.DateStamp" : {"$gte": GT,"$lt": LT} } },
                                                {"$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"},
                                                            "daycount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])

        output['year'] = y

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


@app.route('/sentiment_comparison_month')
def sentiment_comparison_month():

    year = request.args.get('year');
    output = {}

    GT = datetime.datetime(int(year), 1, 1, 00, 00, 00)
    LT = datetime.datetime(int(year), 12, 31, 23, 59, 59)

    output['vadar'] = mongo.db.vadar.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lt": LT}}}, {
                                                 "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['textblob'] = mongo.db.textblob.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lt": LT}}}, {
                                                 "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscoret":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['sentime'] = mongo.db.senticnet_mean.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lt": LT}}}, {
                                                   "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore": {
                                                   "$avg": "$sentiment Score"}, }}, {
                                                   "$sort": {"_id": 1}}])

    output['sentimed'] = mongo.db.senticnet_median.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lt": LT}}}, {
                                                   "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore": {
                                                   "$avg": "$sentiment Score"}, }}, {
                                                    "$sort": {"_id": 1}}])



    return dumps(output);


@app.route('/users')
def users():
    output = {}
    output['sender'] = mongo.db.mail.aggregate([{"$group": {"_id": "$headers.From",

                                                          "sendercount": {"$sum": 1}, }},
                                              {"$sort": {"sendercount": -1}}, {"$limit": 20}]);



    output['reciever'] = mongo.db.mail.aggregate([{"$group": {"_id": "$headers.To",
                                                          "recievercount": {"$sum": 1}, }},
                                              {"$sort": {"recievercount": -1}}, {"$limit": 20}]);


    return dumps(output);



if __name__ == '__main__':
    app.run(debug=True)
