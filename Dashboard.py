from flask import Flask, render_template, request
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
import numpy as np
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

    output['years'] = mongo.db.mail.aggregate([{"$group": {"_id": {"$year": "$headers.DateStamp"},
                                                               "yearcount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])

    return dumps(output);


@app.route('/email_count_month')
def email_count_month():
    year = request.args.get('year');
    output = {}


    GT = datetime.datetime(int(year), 1, 1, 00, 00, 00)
    LT = datetime.datetime(int(year), 12, 31, 23, 59, 59)


    output['months'] = mongo.db.mail.aggregate([{ "$match": { "headers.DateStamp" : {"$gte": GT,"$lte": LT} } },
                                            {"$group": {"_id": {"$month": "$headers.DateStamp"},
                                                        "monthcount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])


    return dumps(output);


@app.route('/email_count_day')
def email_count_day():

    month = request.args.get('month');
    month = int(month)
    year = request.args.get('year');
    year = int(year)
    output = {}


    if month in (9,4,6,11):
            GT = datetime.datetime(year, month, 1, 00, 00, 00)
            LT = datetime.datetime(year, month, 30, 23, 59, 59)
    elif month in (1,3,5,7,8,10,12):
            GT = datetime.datetime(year, month, 1, 00, 00, 00)
            LT = datetime.datetime(year, month, 30, 23, 59, 59)
    else:
            GT = datetime.datetime(year, month, 1, 00, 00, 00)
            LT = datetime.datetime(year, month, 28, 23, 59, 59)


    output['days'] = mongo.db.mail.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}},
                                                {"$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"},
                                                            "daycount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])
    output['year'] = year

    return dumps(output);


@app.route('/email_count_hour')
def email_count_hour():

    day = request.args.get("day");
    day = int(day)
    month = request.args.get('month');
    month = int(month)
    year = request.args.get('year');
    year = int(year)
    output = {}


    GT = datetime.datetime(year, month, day, 00, 00, 00)
    LT = datetime.datetime(year, month, day, 23, 59, 59)

    output['hours'] = mongo.db.mail.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}},
                                                {"$group": {"_id": {"$hour": "$headers.DateStamp"},
                                                            "hourcount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])
    output['year'] = year

    return dumps(output);


@app.route('/email_count_year_user')
def email_count_year_user():
    sender = request.args.get('sender');
    output = {}

    output['years'] = mongo.db.mail.aggregate([{"$match": {"headers.From": sender}},
                                                {"$group": {"_id": {"$year": "$headers.DateStamp"},
                                                               "yearcount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])
    output['sender'] = sender

    return dumps(output);


@app.route('/email_count_month_user')
def email_count_month_user():
    year = request.args.get('year');
    sender = request.args.get('sender');
    output = {}


    GT = datetime.datetime(int(year), 1, 1, 00, 00, 00)
    LT = datetime.datetime(int(year), 12, 31, 23, 59, 59)


    output['months'] = mongo.db.mail.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}},
                                                 {"$group": {"_id": {"$month": "$headers.DateStamp"},
                                                  "monthcount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])


    return dumps(output);


@app.route('/email_count_day_user')
def email_count_day_user():

    month = request.args.get('month');
    month = int(month)
    year = request.args.get('year');
    year = int(year)
    sender = request.args.get('sender');
    output = {}


    if month in (9,4,6,11):
            GT = datetime.datetime(year, month, 1, 00, 00, 00)
            LT = datetime.datetime(year, month, 30, 23, 59, 59)
    elif month in (1,3,5,7,8,10,12):
            GT = datetime.datetime(year, month, 1, 00, 00, 00)
            LT = datetime.datetime(year, month, 30, 23, 59, 59)
    else:
            GT = datetime.datetime(year, month, 1, 00, 00, 00)
            LT = datetime.datetime(year, month, 28, 23, 59, 59)


    output['days'] = mongo.db.mail.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}},
                                                 {"$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"},
                                                  "daycount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])
    output['year'] = year

    return dumps(output);


@app.route('/email_count_hour_user')
def email_count_hour_user():

    day = request.args.get("day");
    day = int(day)
    month = request.args.get('month');
    month = int(month)
    year = request.args.get('year');
    year = int(year)
    sender = request.args.get('sender');
    output = {}


    GT = datetime.datetime(year, month, day, 00, 00, 00)
    LT = datetime.datetime(year, month, day, 23, 59, 59)

    output['hours'] = mongo.db.mail.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}},
                                                 {"$group": {"_id": {"$hour": "$headers.DateStamp"},
                                                  "hourcount": {"$sum": 1}}}, {"$sort": {"_id": 1}}])
    output['year'] = year

    return dumps(output);


@app.route('/message_search')
def message_search():

    output = {}

    input = request.args.get('test');

    output['email'] = mongo.db.vadar.find_one({'_id': ObjectId(str(input))}, {"_id": 0, "body": 1, "headers":1,
                                                                             "sentiment Score":1, "message_id":1})


    return dumps(output);


@app.route('/messageid_search')
def messageid_search():

    output = {}

    input = request.args.get('test');

    output['email'] = mongo.db.vadar.find_one({'_id': ObjectId(str(input))}, {"_id": 0, "body": 1, "headers":1,
                                                                             "sentiment Score":1, "message_id":1})
    emails = output['email']
    messageid = emails['message_id']

    output['textblob'] = mongo.db.textblob.find_one({'message_id': ObjectId(str(messageid))}, {"sentiment Score": 1})
    output['sentimean'] = mongo.db.senticnet_mean.find_one({'message_id': ObjectId(str(messageid))}, {"sentiment Score": 1})
    output['sentimed'] = mongo.db.senticnet_median.find_one({'message_id': ObjectId(str(messageid))}, {"sentiment Score": 1})


    return dumps(output);


@app.route('/keyword_search')
def keyword_search():

    output = {}

    word = request.args.get('test');

    output['email'] = mongo.db.vadar.find({"body": {"$regex": str(word)}}, {"_id": 1, "body": 1, "headers":1,
                                                                             "sentiment Score":1, "message_id":1})

    return dumps(output);




@app.route('/sentiment_comparison_year')
def sentiment_comparison_year():

    output = {}
    #Mean value for sentiment score per year
    output['vadar'] = mongo.db.vadar.aggregate([{"$group": {"_id": {"$year" : "$date"}, "sentimentscore": {"$avg": "$sentiment Score"},}
            },{ "$sort":{"_id":1} }])

    output['textblob'] = mongo.db.textblob.aggregate([{"$group": {"_id": {"$year" : "$date"}, "sentimentscore": {"$avg": "$sentiment Score"},}
            },{ "$sort":{"_id":1} }])

    output['sentimean'] = mongo.db.senticnet_mean.aggregate([{"$group": {"_id": {"$year" : "$date"}, "sentimentscore": {"$avg": "$sentiment Score"},}
            },{ "$sort":{"_id":1} }])

    output['sentimed'] = mongo.db.senticnet_median.aggregate([{"$group": {"_id": {"$year" : "$date"}, "sentimentscore": {"$avg": "$sentiment Score"},}
            },{ "$sort":{"_id":1} }])

    #standard deviation for sentiment scores per year
    output['vadarstd'] = mongo.db.vadar.aggregate(
        [{"$group": {"_id": {"$year": "$date"}, "sentimentscore": {"$stdDevPop": "$sentiment Score"}, }
          }, {"$sort": {"_id": 1}}])

    output['textblobstd'] = mongo.db.textblob.aggregate(
        [{"$group": {"_id": {"$year": "$date"}, "sentimentscore": {"$stdDevPop": "$sentiment Score"}, }
          }, {"$sort": {"_id": 1}}])

    output['sentimeanstd'] = mongo.db.senticnet_mean.aggregate(
        [{"$group": {"_id": {"$year": "$date"}, "sentimentscore": {"$stdDevPop": "$sentiment Score"}, }
          }, {"$sort": {"_id": 1}}])

    output['sentimedstd'] = mongo.db.senticnet_median.aggregate(
        [{"$group": {"_id": {"$year": "$date"}, "sentimentscore": {"$stdDevPop": "$sentiment Score"}, }
          }, {"$sort": {"_id": 1}}])




    return dumps(output);


@app.route('/sentiment_comparison_month')
def sentiment_comparison_month():

    year = request.args.get('year');
    output = {}

    GT = datetime.datetime(int(year), 1, 1, 00, 00, 00)
    LT = datetime.datetime(int(year), 12, 31, 23, 59, 59)

    output['vadar'] = mongo.db.vadar.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}}, {
                                                 "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['textblob'] = mongo.db.textblob.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}}, {
                                                 "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['sentimean'] = mongo.db.senticnet_mean.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}}, {
                                                   "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore": {
                                                   "$avg": "$sentiment Score"}, }}, {
                                                   "$sort": {"_id": 1}}])

    output['sentimed'] = mongo.db.senticnet_median.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}}, {
                                                   "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore": {
                                                   "$avg": "$sentiment Score"}, }}, {
                                                    "$sort": {"_id": 1}}])



    return dumps(output);


@app.route('/sentiment_comparison_day')
def sentiment_comparison_day():

    year = request.args.get('year');
    year = int(year)
    month = request.args.get('month');
    month = int(month)
    output = {}

    if month in (9, 4, 6, 11):
        GT = datetime.datetime(year, month, 1, 00, 00, 00)
        LT = datetime.datetime(year, month, 30, 23, 59, 59)
    elif month in (1, 3, 5, 7, 8, 10, 12):
        GT = datetime.datetime(year, month, 1, 00, 00, 00)
        LT = datetime.datetime(year, month, 30, 23, 59, 59)
    else:
        GT = datetime.datetime(year, month, 1, 00, 00, 00)
        LT = datetime.datetime(year, month, 28, 23, 59, 59)


    output['vadar'] = mongo.db.vadar.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}}, {
        "$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"}, "sentimentscore": {
            "$avg": "$sentiment Score"}, }}, {
                                                    "$sort": {"_id": 1}}])

    output['textblob'] = mongo.db.textblob.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}}, {
        "$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"}, "sentimentscore": {
            "$avg": "$sentiment Score"}, }}, {
                                                          "$sort": {"_id": 1}}])

    output['sentimean'] = mongo.db.senticnet_mean.aggregate(
        [{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}}, {
            "$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"}, "sentimentscore": {
                "$avg": "$sentiment Score"}, }}, {
             "$sort": {"_id": 1}}])

    output['sentimed'] = mongo.db.senticnet_median.aggregate(
        [{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}}, {
            "$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"}, "sentimentscore": {
                "$avg": "$sentiment Score"}, }}, {
             "$sort": {"_id": 1}}])

    return dumps(output);


@app.route('/sentiment_comparison_hour')
def sentiment_comparison_hour():

    year = request.args.get('year');
    year = int(year)
    month = request.args.get('month');
    month = int(month)
    day = request.args.get('day');
    day = int(day)

    output = {}

    GT = datetime.datetime(year, month, day, 00, 00, 00)
    LT = datetime.datetime(year, month, day, 23, 59, 59)

    output['vadar'] = mongo.db.vadar.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}},
                            {"$project": {"sentimentscore": "$sentiment Score", "datestamp": "$headers.DateStamp", "_id": 1}},
                            {"$sort": {"headers.DateStamp": 1}}])

    output['textblob'] = mongo.db.textblob.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}},
                                  {"$project": {"sentimentscore": "$sentiment Score","_id": 1}},
                                  {"$sort": {"headers.DateStamp": 1}}])

    output['sentimean'] = mongo.db.senticnet_mean.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}},
                                     {"$project": {"sentimentscore": "$sentiment Score","_id": 1}},
                                     {"$sort": {"headers.DateStamp": 1}}])

    output['sentimed'] = mongo.db.senticnet_median.aggregate([{"$match": {"headers.DateStamp": {"$gte": GT, "$lte": LT}}},
                                           {"$project": {"sentimentscore": "$sentiment Score","_id": 1}},
                                           {"$sort": {"headers.DateStamp": 1}}])

    return dumps(output);


@app.route('/sentiment_comparison_year_user')
def sentiment_comparison_year_user():

    sender = request.args.get('sender');

    output = {}

    output['vadar'] = mongo.db.vadar.aggregate(
            [{"$match": {"headers.From": sender}},
             {"$group": {"_id": {"$year": "$date"}, "sentimentscore": {"$avg": "$sentiment Score"}, }},
             {"$sort": {"_id": 1}}])

    output['textblob'] = mongo.db.textblob.aggregate(
            [{"$match": {"headers.From": sender}},
             {"$group": {"_id": {"$year": "$date"}, "sentimentscore": {"$avg": "$sentiment Score"}, }},
             {"$sort": {"_id": 1}}])

    output['sentimean'] = mongo.db.senticnet_mean.aggregate(
            [{"$match": {"headers.From": sender}},
             {"$group": {"_id": {"$year": "$date"}, "sentimentscore": {"$avg": "$sentiment Score"}, }},
             {"$sort": {"_id": 1}}])

    output['sentimed'] = mongo.db.senticnet_median.aggregate(
            [{"$match": {"headers.From": sender}},
             {"$group": {"_id": {"$year": "$date"}, "sentimentscore": {"$avg": "$sentiment Score"}, }},
             {"$sort": {"_id": 1}}])

    return dumps(output);


@app.route('/sentiment_comparison_month_user')
def sentiment_comparison_month_user():

    year = request.args.get('year');
    sender = request.args.get('sender');
    output = {}

    GT = datetime.datetime(int(year), 1, 1, 00, 00, 00)
    LT = datetime.datetime(int(year), 12, 31, 23, 59, 59)

    output['vadar'] = mongo.db.vadar.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}}, {
                                                 "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['textblob'] = mongo.db.textblob.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}}, {
                                                 "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['sentimean'] = mongo.db.senticnet_mean.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}}, {
                                                 "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['sentimed'] = mongo.db.senticnet_median.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}}, {
                                                 "$group": {"_id": {"$month": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])



    return dumps(output);


@app.route('/sentiment_comparison_day_user')
def sentiment_comparison_day_user():

    sender = request.args.get('sender');
    year = request.args.get('year');
    year = int(year)
    month = request.args.get('month');
    month = int(month)
    output = {}

    if month in (9, 4, 6, 11):
        GT = datetime.datetime(year, month, 1, 00, 00, 00)
        LT = datetime.datetime(year, month, 30, 23, 59, 59)
    elif month in (1, 3, 5, 7, 8, 10, 12):
        GT = datetime.datetime(year, month, 1, 00, 00, 00)
        LT = datetime.datetime(year, month, 30, 23, 59, 59)
    else:
        GT = datetime.datetime(year, month, 1, 00, 00, 00)
        LT = datetime.datetime(year, month, 28, 23, 59, 59)


    output['vadar'] = mongo.db.vadar.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}}, {
                                                 "$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['textblob'] = mongo.db.textblob.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}}, {
                                                 "$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])

    output['sentimean'] = mongo.db.senticnet_mean.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}}, {
                                                 "$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])


    output['sentimed'] = mongo.db.senticnet_median.aggregate([{"$match": {"$and" : [{
                                                 "headers.DateStamp": {"$gte": GT, "$lte": LT}},
                                                 {"headers.From": sender}]}}, {
                                                 "$group": {"_id": {"$dayOfMonth": "$headers.DateStamp"}, "sentimentscore":{
                                                 "$avg": "$sentiment Score"}, }}, {
                                                 "$sort": {"_id": 1}}])


    return dumps(output);


@app.route('/sentiment_comparison_hour_user')
def sentiment_comparison_hour_user():

    sender = request.args.get('sender');
    year = request.args.get('year');
    year = int(year)
    month = request.args.get('month');
    month = int(month)
    day = request.args.get('day');
    day = int(day)

    output = {}

    GT = datetime.datetime(year, month, day, 00, 00, 00)
    LT = datetime.datetime(year, month, day, 23, 59, 59)


    output['vadar'] = mongo.db.vadar.aggregate([{"$match": {"$and" : [
                               {"headers.DateStamp": {"$gte": GT, "$lte": LT}},
                               {"headers.From": sender}]}},
                               {"$project": {"sentimentscore": "$sentiment Score", "datestamp": "$headers.DateStamp", "_id": 1}},
                               {"$sort": {"headers.DateStamp": 1}}]);
#

    output['textblob'] = mongo.db.textblob.aggregate([{"$match": {"$and" : [
                               {"headers.DateStamp": {"$gte": GT, "$lte": LT}},
                               {"headers.From": sender}]}},
                               {"$project": {"sentimentscore": "$sentiment Score", "datestamp": "$headers.DateStamp", "_id": 1}},
                               {"$sort": {"headers.DateStamp": 1}}]);
#

    output['sentimean'] = mongo.db.senticnet_mean.aggregate([{"$match": {"$and" : [
                               {"headers.DateStamp": {"$gte": GT, "$lte": LT}},
                               {"headers.From": sender}]}},
                               {"$project": {"sentimentscore": "$sentiment Score", "datestamp": "$headers.DateStamp", "_id": 1}},
                               {"$sort": {"headers.DateStamp": 1}}]);
#


    output['sentimed'] = mongo.db.senticnet_median.aggregate([{"$match": {"$and" : [
                               {"headers.DateStamp": {"$gte": GT, "$lte": LT}},
                               {"headers.From": sender}]}},
                               {"$project": {"sentimentscore": "$sentiment Score", "datestamp": "$headers.DateStamp", "_id": 1}},
                               {"$sort": {"headers.DateStamp": 1}}]);
#


    return dumps(output);


@app.route('/users')
def users():
    output = {}
    output['sender'] = mongo.db.mail.aggregate([{"$group": {"_id": "$headers.From",

                                                          "sendercount": {"$sum": 1}, }},
                                              {"$sort": {"sendercount": -1}}, {"$limit": 50}]);

    return dumps(output);


if __name__ == '__main__':
    app.run(debug=True)
