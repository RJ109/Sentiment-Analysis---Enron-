  $.ajax({
            url: '/sentiment_comparison_year',
            success: function(data) {
                output = JSON.parse(data)

                var date = new Array()
                output.vadar.forEach(function(item){
                                                      date.push(item._id)
                                                   })
                var vadar = new Array()
                output.vadar.forEach(function(item){
                                                      vadar.push(item.sentimentscore)
                                                   })

                var textblob = new Array()
                output.textblob.forEach(function(item){
                                                      textblob.push(item.sentimentscore)
                                                   })

                var sentimean = new Array()
                output.sentimean.forEach(function(item){
                                                      sentimean.push(item.sentimentscore)
                                                   })
                var sentimed = new Array()
                output.sentimed.forEach(function(item){
                                                      sentimed.push(item.sentimentscore)
                                                   })

            var ctx = document.getElementById('sentiment-comparison').getContext('2d');
            var line = new Chart(ctx, {
                  type: 'line',
                  data: {
                                    labels : date,
                    datasets: [{
                                data : vadar,
                                lineTension: 0,
                                label: "Vadar",
                                borderColor: "#1E90FF",
                                fill: false,
                                },
                                {

                                data : textblob,
                                lineTension: 0,
                                label: "Textblob",
                                borderColor: "#FF0000",
                                fill: false
                                },
                                {

                                data : sentimean,
                                lineTension: 0,
                                label: "Senticnet - Mean",
                                borderColor: "#3CB371",
                                fill: false
                                },
                                {

                                data : sentimed,
                                lineTension: 0,
                                label: "Senticnet - Median",
                                borderColor: "#FFD700",
                                fill: false
                              },
                            ]
                  },
                  options: {

                            responsive: true,

                            title: {
                                      display: false,
                                      text: 'Sentiment Analysis'
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

                            pan: {
                                    enabled: true,
                                    mode: 'x',
                                 },

                            zoom: {
                                    enabled: true,
                                    mode: 'x',
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



				                    }
				         }

                });

             }

          });