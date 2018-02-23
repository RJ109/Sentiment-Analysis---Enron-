            $.ajax({
            url: '/email_count_month',
            success: function(data) {
            output = JSON.parse(data)
                var months = new Array()
                output.months.forEach(function(item){
                                                      months.push(item._id)
                                                   })

                var month_count = new Array()
                output.months.forEach(function(item){
                                                      month_count.push(item.monthcount)
                                                   })

                var year = output['year']

              var ctx = document.getElementById('email-count-month').getContext('2d');
                            var barchart = new Chart(ctx, {

                                type: 'bar',

                                data: {
                                        labels : months,

                                datasets: [{
                                        label: "Years",
                                        backgroundColor: ["#3e95cd",
                                                          "#ffdb4d",
                                                          "#33cc33",
                                                          "#ff1a1a"],

                                        borderColor: 'rgb(255, 99, 132)',

                                             data : month_count

                                          }]
                                        },


                            options:{
                                     responsive: true,

                                     legend: {
                                                display: false
                                             },

                                     title: {
                                                display: true,
                                                text: 'Emails Per Month:' +  year,
                                                fontSize: 20,
                                                padding: 1,
                                            },


                                     onClick: function(evt) {
                                                         var activePoints = barchart.getElementsAtEvent(evt);
                                                         var click = activePoints[0]._model.label;
                                                         alert(click)
                                                            },

                                       scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        weight: 100,
                                                        padding: 10,
                                                            },

                                                    gridLines: {
                                                              display: false,
                                                                },
                                                        }],

                                                xAxes: [{
                                                    gridLines: {
                                                              display: false,
                                                                },
                                                       }]
                                                }
                                        }
                             });


                 }
        });

