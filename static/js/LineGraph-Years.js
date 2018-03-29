$.ajax({
    url: '/sentiment_comparison_year',
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
        var vadarstd = new Array()
        output.vadarstd.forEach(function(item) {
            vadarstd.push(item.sentimentscore)
        })
        var textblobstd = new Array()
        output.textblobstd.forEach(function(item) {
            textblobstd.push(item.sentimentscore)
        })

        var sentimeanstd = new Array()
        output.sentimeanstd.forEach(function(item) {
            sentimeanstd.push(item.sentimentscore)
        })
        var sentimedstd = new Array()
        output.sentimedstd.forEach(function(item) {
            sentimedstd.push(item.sentimentscore)
        })

        var vadarplusstd = new Array()
        var textblobplusstd = new Array()
        var sentimeanplusstd = new Array()
        var sentimedplusstd = new Array ()

        var i = 0;

        while (i <= 3) {

            var vadarscore = vadar[i] + vadarstd[i];
            vadarplusstd.push(vadarscore)

            var textblobscore = textblob[i] + textblobstd[i];
            textblobplusstd.push(textblobscore)

            var sentimeanscore = sentimean[i] + sentimeanstd[i];
            sentimeanplusstd.push(sentimeanscore)

            var sentimedscore = sentimed[i] + sentimedstd[i];
            sentimedplusstd.push(sentimedscore)

            i++
        }



        var vadarminusstd = new Array()
        var textblobminusstd = new Array()
        var sentimeanminusstd = new Array()
        var sentimedminusstd = new Array ()

        var i = 0;

        while (i <= 3) {

            var vadarscore = vadar[i] - vadarstd[i];
            vadarminusstd.push(vadarscore)

            var textblobscore = textblob[i] - textblobstd[i];
            textblobminusstd.push(textblobscore)

            var sentimeanscore = sentimean[i] - sentimeanstd[i];
            sentimeanminusstd.push(sentimeanscore)

            var sentimedscore = sentimed[i] - sentimedstd[i];
            sentimedminusstd.push(sentimedscore)

            i++
        }



        var ctx = document.getElementById('sentiment-comparison').getContext('2d');
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
                    text: 'Sentiment Analysis per Year',
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



                },
            }

        });
    }

    });


function linechartuser(){

        var chartname = document.getElementById("sentiment-comparison");
        if(chartname != null) {
            document.getElementById('sentiment-comparison').id = 'sentiment-comparison-year-user'
        }
        var chartname2 = document.getElementById("sentiment-comparison-month");
        if(chartname2 != null) {
            document.getElementById('sentiment-comparison-month').id = 'sentiment-comparison-year-user'
        }
        var chartname3 = document.getElementById("sentiment-comparison-day");
        if(chartname3 != null) {
            document.getElementById('sentiment-comparison-day').id = 'sentiment-comparison-year-user'
        }
        var chartname4 = document.getElementById("sentiment-comparison-day-user");
        if(chartname4 != null) {
            document.getElementById('sentiment-comparison-day-user').id = 'sentiment-comparison-year-user'
        }

         var dropdown_sender = document.getElementById("user_sender").value;
         console.log(dropdown_sender)

         $.ajax({
             url: '/sentiment_comparison_year_user',
             data: {
                      'sender': dropdown_sender
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

        $('#chart').empty();
        $('#chart').html('<canvas id="sentiment-comparison-year-user"  width="17" height="4"></canvas>');
        var ctx = document.getElementById('sentiment-comparison-year-user').getContext('2d');
        window.myLine = new Chart(ctx, {
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
                    text: 'Sentiment Analysis per Year ('+dropdown_sender+')',
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


function linechartuserall(){

     $('#chart').empty();
     $('#chart').html('<canvas id="sentiment-comparison"  width="17" height="4"></canvas>');

$.ajax({
    url: '/sentiment_comparison_year',
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


        var ctx = document.getElementById('sentiment-comparison').getContext('2d');
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
                    text: 'Sentiment Analysis per Year',
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


function linechartusercompareall(){
    sender = amplify.store("sender")
       $.ajax({
             url: '/sentiment_comparison_year_user',
             data: {
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

     $('#chart').empty();
     $('#chart').html('<canvas id="sentiment-comparison-all"  width="17" height="4"></canvas>');

    $.ajax({
        url: '/sentiment_comparison_year',
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


        var ctx = document.getElementById('sentiment-comparison-all').getContext('2d');
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
                    text: 'Sentiment Analysis per Year ('+sender.s+')',
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


})

}
