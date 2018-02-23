    $.ajax({
            url: '/email_count_year',
            success: function(data) {
            output = JSON.parse(data)

                var years = new Array()
                output.years.forEach(function(item){
                                                      years.push(item._id)
                                                   })

                var year_count = new Array()
                output.years.forEach(function(item){
                                                      year_count.push(item.yearcount)
                                                   })


                var ctx = document.getElementById('email-count-year').getContext('2d');
                            var barchart = new Chart(ctx, {

                                type: 'bar',

                                data: {
                                        labels : years,

                                datasets: [{
                                        label: "Years",
                                        backgroundColor: ["#3e95cd",
                                                          "#ffdb4d",
                                                          "#33cc33",
                                                          "#ff1a1a"],

                                        borderColor: 'rgb(255, 99, 132)',

                                             data : year_count
                                          }]
                                        },


                            options:{
                                     responsive: true,

                                     legend: {
                                                display: false
                                             },

                                     title: {
                                                display: false,
                                                text: 'Emails Per Year',
                                                fontSize: 20,
                                                padding: 2.5,
                                            },


                                     onClick: function(evt) {

                                                         var activePoints = barchart.getElementsAtEvent(evt);
                                                          var clicker = activePoints[0]._model.label;

                                                         $.ajax({

                                                            url: '/email_count_month',
                                                            data: {
                                                                'year': clicker
                                                            },
                                                            success: function(data) {

                                                                var y = document.getElementById("email_count_month");
                                                                y.style.display = "block";

                                                                var x = document.getElementById("email_count_year");
                                                                x.style.display = "none";


                                                                                    },
                                                               })

                                                            },

                                     scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        stepSize: 50000,
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

