
    function emailcountmonth() {

        $('#email_count').empty();
        $('#email_count').html('<canvas id="email-count-month" width="12" height="4"></canvas> <div id ="refresh_button"><button id="refresh" onclick="refresh()">Restart</button></div>');
        year = amplify.store("year")

        $.ajax({
            url: '/email_count_month',
            data: {
                'year': year.y
            },
            success: function(data) {
                output = JSON.parse(data)

                var months = new Array()
                output.months.forEach(function(item) {
                    months.push(item._id)
                })

                var month_count = new Array()
                output.months.forEach(function(item) {
                    month_count.push(item.monthcount)
                })

                if (year.y == 1999) {
                    yearcol = "#3e95cd"
                } else if (year.y == 2000) {
                    yearcol = "#ffdb4d"
                } else if (year.y == 2001) {
                    yearcol = "#33cc33"
                } else if (year.y == 2002) {
                    yearcol = "#ff1a1a"
                }

                var ctx = document.getElementById('email-count-month').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: months,

                        datasets: [{
                            label: "Count",
                            backgroundColor: yearcol,
                            borderColor: 'rgb(255, 99, 132)',

                            data: month_count
                        }]
                    },


                    options: {
                        responsive: true,

                        tooltips: {
                            enabled: true
                        },

                        legend: {
                            display: false
                        },

                        title: {
                            display: true,
                            fontSize: 20,
                            padding: 2.5,
                            text: 'Emails Per Month - ' + year.y
                        },


                        onClick: function(c, i) {
                            e = i[0];
                            var value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];

                            amplify.store("month", {
                                "m": value
                            })
                            linechartday();
                            emailcountday();



                        }
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

                });



            }


        });

    }


    function emailcountmonthuser() {
        document.getElementById('email-count-user').id = 'email-count-month-user'
        year = amplify.store("year")
        sender = amplify.store("sender")

        $.ajax({
            url: '/email_count_month_user',
            data: {
                'year': year.y,
                'sender': sender.s
            },
            success: function(data) {
                output = JSON.parse(data)

                var months = new Array()
                output.months.forEach(function(item) {
                    months.push(item._id)
                })

                var month_count = new Array()
                output.months.forEach(function(item) {
                    month_count.push(item.monthcount)
                })

                if (year.y == 1999) {
                    yearcol = "#3e95cd"
                } else if (year.y == 2000) {
                    yearcol = "#ffdb4d"
                } else if (year.y == 2001) {
                    yearcol = "#33cc33"
                } else if (year.y == 2002) {
                    yearcol = "#ff1a1a"
                }

                var ctx = document.getElementById('email-count-month-user').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: months,

                        datasets: [{
                            label: "Count",
                            backgroundColor: yearcol,
                            borderColor: 'rgb(255, 99, 132)',

                            data: month_count
                        }]
                    },


                    options: {
                        responsive: true,

                        tooltips: {
                            enabled: true
                        },

                        legend: {
                            display: false
                        },

                        title: {
                            display: true,
                            fontSize: 20,
                            padding: 2.5,
                            text: 'Emails Per Month - ' + year.y + " (" + sender.s + ")"
                        },


                        onClick: function(c, i) {
                            e = i[0];
                            var value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];

                            amplify.store("month", {
                                "m": value
                            })
                            barchart.destroy();
                            linechartdayuser();
                            emailcountdayuser();

                        }
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

                });



            }


        });

    }


    function emailcountusercompareallmonth(){

         $('#email_count').empty();
         $('#email_count').html('<canvas id="email-count-month-user-compare-all"  width="12" height="4"></canvas> <button id="refresh" onclick="refresh()">Restart</button>');

         var dropdown_sender = document.getElementById("user_sender").value;

        year = amplify.store("year")
        sender = amplify.store("sender")

        $.ajax({
            url: '/email_count_month_user',
            data: {
                'year': year.y,
                'sender': sender.s
            },
            success: function(data) {
                output = JSON.parse(data)


                var usermonth_count = new Array()
                output.months.forEach(function(item) {
                    usermonth_count.push(item.monthcount)
                })
                amplify.store("usermonth_count", {"x": usermonth_count})
                }
                });


          $.ajax({
            url: '/email_count_month',
            data: {
                'year': year.y
            },
            success: function(data) {
                output = JSON.parse(data)

                var months = new Array()
                output.months.forEach(function(item) {
                    months.push(item._id)
                })

                var month_count = new Array()
                output.months.forEach(function(item) {
                    month_count.push(item.monthcount)
                })

                usermonth_count = amplify.store("usermonth_count")
                sender = amplify.store("sender")

                var ctx = document.getElementById('email-count-month-user-compare-all').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                     data: {
                        labels: months,
                        datasets: [
                        {
                            label: 'Count - All users',
                            data: month_count,
                                        backgroundColor: "rgba(55, 160, 225, 0.7)",
                                        hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
                                        hoverBorderWidth: 2,
                                        hoverBorderColor: 'lightgrey'
                        },
                        {
                            label: sender.s,
                            data: usermonth_count.x,
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
                            fontSize: 20,
                            padding: 2.5,
                            text: 'Emails Per Month - ' + year.y + " (" + sender.s + ")"
                        },


                        onClick: function(c, i) {
                            e = i[0];
                            var value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];

                            amplify.store("month", {
                                "m": value
                            })
                            barchart.destroy();
                            linechartusercompareallday()
                            emailcountusercompareallday();

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

