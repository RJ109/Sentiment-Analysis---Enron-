    $.ajax({
        url: '/email_count_year',
        success: function(data) {
            output = JSON.parse(data)


            var years = new Array()
            output.years.forEach(function(item) {
                years.push(item._id)
            })

            var year_count = new Array()
            output.years.forEach(function(item) {
                year_count.push(item.yearcount)
            })

            var ctx = document.getElementById('email-count-year').getContext('2d');
            var barchart = new Chart(ctx, {

                type: 'bar',

                data: {
                    labels: years,

                    datasets: [{
                        label: "Count",
                        backgroundColor: ["#3e95cd",
                            "#ffdb4d",
                            "#33cc33",
                            "#ff1a1a"
                        ],

                        borderColor: 'rgb(255, 99, 132)',

                        data: year_count
                    }]
                },


                options: {

                    tooltips: {
                        enabled: true
                    },

                    responsive: true,

                    legend: {
                        display: false
                    },

                    title: {
                        display: true,
                        text: 'Emails Per Year',
                        fontSize: 20,
                        padding: 2.5,
                    },

                    onClick: function(c, i) {
                        e = i[0];
                        var x_value = this.data.labels[e._index];
                        var y_value = this.data.datasets[0].data[e._index];

                        amplify.store("year", {
                            "y": x_value
                        })
                        linechartmonth();
                        emailcountmonth();
                        barchart.destroy();


                    },

                    scales: {
                        yAxes: [{
                            ticks: {
                                //weight: 100,
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


    function emailcountuser() {

        var dropdown_sender = document.getElementById("user_sender").value;

        $.ajax({
            url: '/email_count_year_user',
            data: {
                'sender': dropdown_sender
            },
            success: function(data) {
                output = JSON.parse(data)

                amplify.store("sender", {
                    "s": dropdown_sender
                })

                var years = new Array()
                output.years.forEach(function(item) {
                    years.push(item._id)
                })

                var year_count = new Array()
                output.years.forEach(function(item) {
                    year_count.push(item.yearcount)
                })

                $('#email_count').empty();
                $('#email_count').html('<canvas id="email-count-user"  width="12" height="4"></canvas> <button id="refresh">Restart</button>');

                var ctx = document.getElementById('email-count-user').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: years,

                        datasets: [{
                            label: "Count",
                            backgroundColor: ["#3e95cd",
                                "#ffdb4d",
                                "#33cc33",
                                "#ff1a1a"
                            ],
                            borderColor: 'rgb(255, 99, 132)',

                            data: year_count
                        }]
                    },


                    options: {
                        responsive: true,

                        tooltips: {
                            enabled: false
                        },


                        legend: {
                            display: false
                        },

                        title: {
                            display: true,
                            text: 'Emails Per Year (' + dropdown_sender + ")",
                            fontSize: 20,
                            padding: 2.5,
                        },


                        onClick: function(c, i) {
                            e = i[0];
                            var x_value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];

                            amplify.store("year", {
                                "y": x_value
                            })
                            amplify.store("sender", {
                                "s": dropdown_sender
                            })

                            barchart.destroy();
                            linechartmonthuser();
                            emailcountmonthuser();

                        },


                        scales: {
                            yAxes: [{
                                ticks: {
                                    //weight: 100,
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
    }


    function emailcountall(){

     $('#email_count').empty();
     $('#email_count').html(' <canvas id="email-count-year" width="12" height="4"></canvas> <script src="static/js/email-count.js" type="text/javascript"></script> <button id="refresh" onclick="refresh()">Restart</button>');

      $.ajax({
        url: '/email_count_year',
        success: function(data) {
            output = JSON.parse(data)


            var years = new Array()
            output.years.forEach(function(item) {
                years.push(item._id)
            })

            var year_count = new Array()
            output.years.forEach(function(item) {
                year_count.push(item.yearcount)
            })

            var ctx = document.getElementById('email-count-year').getContext('2d');
            var barchart = new Chart(ctx, {

                type: 'bar',

                data: {
                    labels: years,

                    datasets: [{
                        label: "Count",
                        backgroundColor: ["#3e95cd",
                            "#ffdb4d",
                            "#33cc33",
                            "#ff1a1a"
                        ],

                        borderColor: 'rgb(255, 99, 132)',

                        data: year_count
                    }]
                },


                options: {

                    tooltips: {
                        enabled: true
                    },

                    responsive: true,

                    legend: {
                        display: false
                    },

                    title: {
                        display: true,
                        text: 'Emails Per Year',
                        fontSize: 20,
                        padding: 2.5,
                    },

                    onClick: function(c, i) {
                        e = i[0];
                        var x_value = this.data.labels[e._index];
                        var y_value = this.data.datasets[0].data[e._index];

                        amplify.store("year", {
                            "y": x_value
                        })
                        barchart.destroy();
                        linechartmonth();
                        emailcountmonth();



                    },

                    scales: {
                        yAxes: [{
                            ticks: {
                                //weight: 100,
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







    }


    function emailcountusercompareall(){

         $('#email_count').empty();
         $('#email_count').html('<canvas id="email-count-year-user-compare-all"  width="12" height="4"></canvas> <button id="refresh" onclick="refresh()">Restart</button>');

         var dropdown_sender = document.getElementById("user_sender").value;

            $.ajax({
                url: '/email_count_year_user',
                data: {
                    'sender': dropdown_sender
                },
                success: function(data) {
                    output = JSON.parse(data)

                    amplify.store("sender", {
                        "s": dropdown_sender
                    })

                    var useryears_count = new Array()
                    output.years.forEach(function(item) {
                        useryears_count.push(item.yearcount)
                    })

                    amplify.store("useryears_count", {"x": useryears_count})

                    }
                 });


          $.ajax({

            url: '/email_count_year',
            success: function(data) {
                output = JSON.parse(data)


                var years = new Array()
                output.years.forEach(function(item) {
                    years.push(item._id)
                })

                var year_count = new Array()
                output.years.forEach(function(item) {
                    year_count.push(item.yearcount)
                })

                useryears_count = amplify.store("useryears_count")
                sender = amplify.store("sender")

                var ctx = document.getElementById('email-count-year-user-compare-all').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                     data: {
                        labels: Years,
                        datasets: [
                        {
                            label: 'Count',
                            data: year_count,
                                        backgroundColor: "rgba(55, 160, 225, 0.7)",
                                        hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
                                        hoverBorderWidth: 2,
                                        hoverBorderColor: 'lightgrey'
                        },
                        {
                            label: sender.s,
                            data: useryears_count.x,
                                        backgroundColor: "rgba(225, 58, 55, 0.7)",
                                        hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
                                        hoverBorderWidth: 2,
                                        hoverBorderColor: 'lightgrey'
                        },
                        ],

                    },


                    options: {

                        tooltips: {
                            enabled: true
                        },

                        responsive: true,

                        legend: {
                            display: false
                        },

                        title: {
                            display: true,
                            text: 'Emails Per Year',
                            fontSize: 20,
                            padding: 2.5,
                        },

                        onClick: function(c, i) {
                            e = i[0];
                            var x_value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];

                            amplify.store("year", {
                                "y": x_value
                            })
                            linechartusercompareallmonth();
                            emailcountusercompareallmonth();
                            barchart.destroy();


                        },

                        scales: {
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    //weight: 100,
                                    padding: 10,
                                },

                                gridLines: {
                                    display: false,
                                },
                            }],

                            xAxes: [{
                                stacked: true,
                                gridLines: {
                                    display: false,

                                },
                            }]
                        }
                    }


                });

            }


        });

        }


