function linecharthour(){

year =  amplify.store("year")
month = amplify.store("month")
day = amplify.store("day")

if (month.m == 1){
    var monthval = "January"
}else if (month.m == 2){
    var monthval = "Febuary"
}else if (month.m == 3){
    var monthval = "March"
}else if (month.m == 4){
    var monthval = "April"
}else if (month.m == 5){
    var monthval = "May"
}else if (month.m == 6){
    var monthval = "June"
}else if (month.m == 7){
    var monthval = "July"
}else if (month.m == 8){
    var monthval = "August"
}else if (month.m == 9){
    var monthval = "September"
}else if (month.m == 10){
    var monthval = "October"
}else if (month.m == 11){
    var monthval = "November"
}else if (month.m == 12){
    var monthval = "December"
}


$.ajax({
    url: '/sentiment_comparison_hour',
     data: {
                'year': year.y,
                'month': month.m,
                'day': day.d

            },
    success: function(data) {
        output = JSON.parse(data)

        var date = new Array()
        output.vadar.forEach(function(item) {
            date.push(item.datestamp['$date'])
        })

        var id = new Array ()
        output.vadar.forEach(function(item){
            id.push(item._id['$oid'])
        })

        var vadar = new Array()
        output.vadar.forEach(function(item) {
            vadar.push(item.sentimentscore)
        })

        var textblob = new Array()
        output.textblob.forEach(function(item) {
            textblob.push(item.sentimentscore)
        })

        var sentimean = new Array()
        output.sentimean.forEach(function(item) {
            sentimean.push(item.sentimentscore)
        })
        var sentimed = new Array()
        output.sentimed.forEach(function(item) {
            sentimed.push(item.sentimentscore)
        })


        $('#chart').empty();
        $('#chart').html('<canvas id="sentiment-comparison-hour"  width="18" height="4"></canvas> <button onclick="linecharthour()">Reset Zoom</button>');
        var ctx = document.getElementById('sentiment-comparison-hour').getContext('2d');
        var linetest = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                        data: vadar,
                        lineTension: 0,
                        label: "Vadar",
                        borderColor: " #ff4da6",
                        fill: false,
                    },
                    {

                        data: textblob,
                        lineTension: 0,
                        label: "Textblob",
                        borderColor: "#00cc99",
                        fill: false
                    },
                    {

                        data: sentimean,
                        lineTension: 0,
                        label: "Senticnet - Mean",
                        borderColor: "#6633CC",
                        fill: false
                    },
                    {

                        data: sentimed,
                        lineTension: 0,
                        label: "Senticnet - Median",
                        borderColor: "#ffad33",
                        fill: false
                    },
                ]
            },
            options: {

                title: {
                    display: true,
                    text: 'Sentiment Analysis per Day - '+ day.d +"/"+month.m +"/"+ year.y,
                    fontSize: 20,
                },

                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontSize: 12,
                        boxWidth: 10,
                        padding: 20
                    },
                    onClick: function(event, legendItem) {
                        var index = legendItem.datasetIndex;
                        var meta = linetest.getDatasetMeta(index);
                        // See controller.isDatasetVisible comment
                        meta.hidden = meta.hidden === null? !linetest.data.datasets[index].hidden : null;
                        // We hid a dataset ... rerender the chart
                        linetest.update();
                    }

                },


                onClick: function(c, i) {
                            e = i[0];
                            var value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];
                            emailpopup()
                 },

                scales: {

                    display: true,

                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                second: 'h:mm:ss a',
                            }
                        }
                    }],

                    yAxes: [{
                        ticks: {
                            fontSize: 11,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Sentiment Score',
                            padding: 10,
                            fontSize: 15,
                        }
                    }],

                },

                zoom: {

                    enabled: true,
                    mode: 'x'
                },

                pan: {
                    enabled: true,
                    mode: 'x',
                },

                layout: {

                    padding: {

                        left: 0,
                        right: 60,
                        top: 0,
                        bottom: 0,
                    }
                },

                tooltips: {
                    bodySpacing: 6,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        },

                        afterBody: function(t, d) {

                            var messageid = id[t[0].index];
                            var vadarscore = vadar[t[0].index];
                            var textblobscore = textblob[t[0].index];
                            var sentimeanscore = sentimean[t[0].index];
                            var sentimedscore = sentimed[t[0].index];

                            amplify.store("vadarscore", {"s": vadarscore})
                            amplify.store("textblobscore", {"s": textblobscore})
                            amplify.store("sentimeanscore", {"s": sentimeanscore})
                            amplify.store("sentimedscore", {"s": sentimedscore})
                            amplify.store("messageid", {"m": messageid})

                            return 'message id: ' + messageid;

                        }
                    }
                }

                },
            })
        }

    });

}


function linecharthouruser(){


    year =  amplify.store("year")
    month = amplify.store("month")
    day = amplify.store("day")
    sender = amplify.store("sender")


    if (month.m == 1){
        var monthval = "January"
    }else if (month.m == 2){
        var monthval = "Febuary"
    }else if (month.m == 3){
        var monthval = "March"
    }else if (month.m == 4){
        var monthval = "April"
    }else if (month.m == 5){
        var monthval = "May"
    }else if (month.m == 6){
        var monthval = "June"
    }else if (month.m == 7){
        var monthval = "July"
    }else if (month.m == 8){
        var monthval = "August"
    }else if (month.m == 9){
        var monthval = "September"
    }else if (month.m == 10){
        var monthval = "October"
    }else if (month.m == 11){
        var monthval = "November"
    }else if (month.m == 12){
        var monthval = "December"
}

$.ajax({
    url: '/sentiment_comparison_hour_user',
     data: {
                'year': year.y,
                'month': month.m,
                'day': day.d,
                'sender': sender.s

            },
    success: function(data) {
        output = JSON.parse(data)

        var date = new Array()
        output.vadar.forEach(function(item) {
            date.push(item.datestamp['$date'])
        })

        var id = new Array ()
        output.vadar.forEach(function(item){
            id.push(item._id['$oid'])
        })

        var vadar = new Array()
        output.vadar.forEach(function(item) {
            vadar.push(item.sentimentscore)
        })

        var textblob = new Array()
        output.textblob.forEach(function(item) {
            textblob.push(item.sentimentscore)
        })

        var sentimean = new Array()
        output.sentimean.forEach(function(item) {
            sentimean.push(item.sentimentscore)
        })
        var sentimed = new Array()
        output.sentimed.forEach(function(item) {
            sentimed.push(item.sentimentscore)
        })


        $('#chart').empty();
        $('#chart').html('<canvas id="sentiment-comparison-hour-user"  width="17" height="4"></canvas> <button onclick="linecharthouruser()">Reset Zoom</button>');
        var ctx = document.getElementById('sentiment-comparison-hour-user').getContext('2d');
        var line = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                        data: vadar,
                        lineTension: 0,
                        label: "Vadar",
                        borderColor: " #ff4da6",
                        fill: false,
                    },
                    {

                        data: textblob,
                        lineTension: 0,
                        label: "Textblob",
                        borderColor: "#00cc99",
                        fill: false
                    },
                    {

                        data: sentimean,
                        lineTension: 0,
                        label: "Senticnet - Mean",
                        borderColor: "#6633CC",
                        fill: false
                    },
                    {

                        data: sentimed,
                        lineTension: 0,
                        label: "Senticnet - Median",
                        borderColor: "#ffad33",
                        fill: false
                    },
                ]
            },
            options: {

                responsive: true,

                title: {
                    display: true,
                    text: 'Sentiment Analysis per Day - '+monthval+ "/"+ year.y+ ' ('+sender.s+')',
                    fontSize: 20,
                },

                legend: {
                    display: true,
                    position: 'right',

                    labels: {
                        fontSize: 12,
                        boxWidth: 10,
                        padding: 20
                    },
                    onClick: function (event, legendItem) {
                        var index = legendItem.datasetIndex;
                        var meta = linetest.getDatasetMeta(index);
                        // See controller.isDatasetVisible comment
                        meta.hidden = meta.hidden === null? !linetest.data.datasets[index].hidden : null;
                        // We hid a dataset ... rerender the chart
                        linetest.update();
                    }
                 },
                 onClick: function(c, i) {
                            e = i[0];
                            var value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];
                            emailpopup()

                },
                scales: {
                    display: true,
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                second: 'h:mm:ss a',
                            }
                        }
                    }],

                    yAxes: [{

                        ticks: {

                            fontSize: 11,
                        },

                        scaleLabel: {

                            display: true,
                            labelString: 'Sentiment Score',
                            padding: 10,
                            fontSize: 15,
                        }
                    }],

                },

                zoom: {

                    enabled: true,
                    mode: 'x'
                },

                pan: {
                    enabled: true,
                    mode: 'x',
                },

                layout: {

                    padding: {

                        left: 0,
                        right: 60,
                        top: 0,
                        bottom: 0,
                    }
                },

                 tooltips: {
                    bodySpacing: 6,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        },

                         afterBody: function(t, d) {

                            var messageid = id[t[0].index];
                            var vadarscore = vadar[t[0].index];
                            var textblobscore = textblob[t[0].index];
                            var sentimeanscore = sentimean[t[0].index];
                            var sentimedscore = sentimed[t[0].index];

                            amplify.store("vadarscore", {"s": vadarscore})
                            amplify.store("textblobscore", {"s": textblobscore})
                            amplify.store("sentimeanscore", {"s": sentimeanscore})
                            amplify.store("sentimedscore", {"s": sentimedscore})
                            amplify.store("messageid", {"m": messageid})

                            return 'message id: ' + messageid;

                        }
                    }
                }

            }

        });

    }

});




}