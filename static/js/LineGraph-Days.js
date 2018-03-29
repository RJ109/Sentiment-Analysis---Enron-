function linechartday(){

document.getElementById('sentiment-comparison-month').id = 'sentiment-comparison-day'
year =  amplify.store("year")
month = amplify.store("month")

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
    url: '/sentiment_comparison_day',
     data: {
                'year': year.y,
                'month': month.m

            },
    success: function(data) {
        output = JSON.parse(data)

        var date = new Array()
        output.vadar.forEach(function(item) {
            date.push(item._id)
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
        $('#chart').html('<canvas id="sentiment-comparison-day"  width="17" height="4"></canvas>');
        var ctx = document.getElementById('sentiment-comparison-day').getContext('2d');
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
                    text: 'Sentiment Analysis per Day - '+ monthval +"/"+ year.y,
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
                },

                scales: {

                    display: true,


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
                        }
                    }
                }

            }

        });

    }

});

}


function linechartdayuser(){
    document.getElementById('sentiment-comparison-month-user').id = 'sentiment-comparison-day-user'


    year =  amplify.store("year")
    month = amplify.store("month")
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
    url: '/sentiment_comparison_day_user',
     data: {
                'year': year.y,
                'month': month.m,
                'sender': sender.s

            },
    success: function(data) {
        output = JSON.parse(data)

        var date = new Array()
        output.vadar.forEach(function(item) {
            date.push(item._id)
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
        $('#chart').html('<canvas id="sentiment-comparison-day-user"  width="17" height="4"></canvas>');
        var ctx = document.getElementById('sentiment-comparison-day-user').getContext('2d');
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
                },

                scales: {

                    display: true,


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
                        }
                    }
                }

            }

        });

    }

});

}


function linechartusercompareallday(){

     $('#chart').empty();
     $('#chart').html('<canvas id="sentiment-comparison-day-all"  width="17" height="4"></canvas>');

    year =  amplify.store("year")
    month = amplify.store("month")
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
        url: '/sentiment_comparison_day_user',
         data: {
                    'year': year.y,
                    'month': month.m,
                    'sender': sender.s

                },
        success: function(data) {
            output = JSON.parse(data)

            var vadaruser = new Array()
            output.vadar.forEach(function(item) {
                vadaruser.push(item.sentimentscore)
            })

            var textblobuser = new Array()
            output.textblob.forEach(function(item) {
                textblobuser.push(item.sentimentscore)
            })

            var sentimeanuser = new Array()
            output.sentimean.forEach(function(item) {
                sentimeanuser.push(item.sentimentscore)
            })
            var sentimeduser = new Array()
            output.sentimed.forEach(function(item) {
                sentimeduser.push(item.sentimentscore)
            })

                amplify.store("textblobuser", {"x": textblobuser})
                amplify.store("vadaruser", {"x": vadaruser})
                amplify.store("sentimeanuser", {"x": sentimeanuser})
                amplify.store("sentimeduser", {"x": sentimeduser})


                }
            });

    year = amplify.store("year")
    month = amplify.store("month")


    $.ajax({
        url: '/sentiment_comparison_day',
         data: {
                    'year': year.y,
                    'month': month.m

                },
        success: function(data) {
            output = JSON.parse(data)

            var date = new Array()
            output.vadar.forEach(function(item) {
                date.push(item._id)
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


         sender = amplify.store("sender")
         vadaruser = amplify.store("vadaruser")
         textblobuser = amplify.store("textblobuser")
         sentimeanuser = amplify.store("sentimeanuser")
         sentimeduser = amplify.store("sentimeduser")


        var ctx = document.getElementById('sentiment-comparison-day-all').getContext('2d');
        var line = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                        data: vadar,
                        lineTension: 0,
                        label: "Vadar (All users)",
                        borderColor: " #ff4da6",
                        fill: false,
                    },
                      {

                        data: vadaruser.x,
                        lineTension: 0,
                        borderDash: [10,5],
                        label: "Vadar "+"("+sender.s+")",
                        borderColor: " #ff4da6",
                        fill: false
                    },
                    {

                        data: textblob,
                        lineTension: 0,
                        label: "Textblob (All users)",
                        borderColor: "#00cc99",
                        fill: false,
                        hidden: true,
                    },
                    {

                        data: textblobuser.x,
                        lineTension: 0,
                        borderDash: [10,5],
                        label: "Textblob "+"("+sender.s+")",
                        borderColor: "#00cc99",
                        fill: false,
                        hidden: true,
                    },
                    {

                        data: sentimean,
                        lineTension: 0,
                        label: "Senticnet - Mean (All users)",
                        borderColor: "#6633CC",
                        fill: false,
                        hidden: true,
                    },

                     {

                        data: sentimeanuser.x,
                        lineTension: 0,
                        borderDash: [10,5],
                        label: "Senticnet - Mean "+"("+sender.s+")",
                        borderColor: "#6633CC",
                        fill: false,
                        hidden: true,
                    },
                      {

                        data: sentimed,
                        lineTension: 0,
                        label: "Senticnet - Median (All users)",
                        borderColor: "#ffad33",
                        fill: false,
                        hidden: true,
                    },
                     {

                        data: sentimeduser.x,
                        lineTension: 0,
                        borderDash: [10,5],
                        label: "Senticnet - Median "+"("+sender.s+")",
                        borderColor: "#ffad33",
                        fill: false,
                        hidden: true,
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
                    position: 'top',

                    labels: {
                        fontSize: 9.5,
                        boxWidth: 6,
                        padding: 5
                    },
                },


                scales: {

                    display: true,


                    yAxes: [{

                        ticks: {
                            beginAtZero:true,
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
                        }
                    }
                }

            }

        });

    }


});

}