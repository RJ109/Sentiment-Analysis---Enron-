    function emailcountday() {


        $('#email_count').empty();
        $('#email_count').html('<canvas id="email-count-day" width="12" height="4"></canvas> <div id ="refresh_button"><button id="refresh" onclick="refresh()">Restart</button></div>');
        year = amplify.store("year")
        month = amplify.store("month")

        $.ajax({
            url: '/email_count_day',
            data: {
                'month': month.m,
                'year': year.y
            },
            success: function(data) {
                output = JSON.parse(data)

                var days = new Array()
                output.days.forEach(function(item) {
                    days.push(item._id)
                })

                var day_count = new Array()
                output.days.forEach(function(item) {
                    day_count.push(item.daycount)
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

                if (month.m == 1) {
                    var monthval = "January"
                } else if (month.m == 2) {
                    var monthval = "Febuary"
                } else if (month.m == 3) {
                    var monthval = "March"
                } else if (month.m == 4) {
                    var monthval = "April"
                } else if (month.m == 5) {
                    var monthval = "May"
                } else if (month.m == 6) {
                    var monthval = "June"
                } else if (month.m == 7) {
                    var monthval = "July"
                } else if (month.m == 8) {
                    var monthval = "August"
                } else if (month.m == 9) {
                    var monthval = "September"
                } else if (month.m == 10) {
                    var monthval = "October"
                } else if (month.m == 11) {
                    var monthval = "November"
                } else if (month.m == 12) {
                    var monthval = "December"
                }


                var ctx = document.getElementById('email-count-day').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: days,

                        datasets: [{
                            label: "Count",
                            backgroundColor: yearcol,
                            borderColor: 'rgb(255, 99, 132)',

                            data: day_count
                        }]
                    },


                    options: {
                        responsive: true,

                        legend: {
                            display: false
                        },

                        title: {
                            display: true,
                            fontSize: 20,
                            padding: 2.5,
                            text: 'Emails Per Day - ' + year.y + "/" + monthval
                        },
                        onClick: function(c, i) {
                            e = i[0];
                            var value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];

                            amplify.store("day", {
                                "d": value
                            })
                            linecharthour();
                            emailcounthour();
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



    }


    function emailcountdayuser() {

        document.getElementById('email-count-month-user').id = 'email-count-day-user'
        year = amplify.store("year")
        month = amplify.store("month")
        sender = amplify.store("sender")

        $.ajax({
            url: '/email_count_day_user',
            data: {
                'month': month.m,
                'year': year.y,
                'sender': sender.s
            },
            success: function(data) {
                output = JSON.parse(data)

                var days = new Array()
                output.days.forEach(function(item) {
                    days.push(item._id)
                })

                var day_count = new Array()
                output.days.forEach(function(item) {
                    day_count.push(item.daycount)
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

                if (month.m == 1) {
                    var monthval = "January"
                } else if (month.m == 2) {
                    var monthval = "Febuary"
                } else if (month.m == 3) {
                    var monthval = "March"
                } else if (month.m == 4) {
                    var monthval = "April"
                } else if (month.m == 5) {
                    var monthval = "May"
                } else if (month.m == 6) {
                    var monthval = "June"
                } else if (month.m == 7) {
                    var monthval = "July"
                } else if (month.m == 8) {
                    var monthval = "August"
                } else if (month.m == 9) {
                    var monthval = "September"
                } else if (month.m == 10) {
                    var monthval = "October"
                } else if (month.m == 11) {
                    var monthval = "November"
                } else if (month.m == 12) {
                    var monthval = "December"
                }


                var ctx = document.getElementById('email-count-day-user').getContext('2d');

                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: days,

                        datasets: [{
                            label: "Count",
                            backgroundColor: yearcol,
                            borderColor: 'rgb(255, 99, 132)',

                            data: day_count
                        }]
                    },


                    options: {
                        responsive: true,

                        legend: {
                            display: false
                        },

                        title: {
                            display: true,
                            fontSize: 20,
                            padding: 2.5,
                            text: 'Emails Per Day - ' + year.y + "/" + monthval + " (" + sender.s + ")"
                        },
                        onClick: function(c, i) {
                            e = i[0];
                            var value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];

                            amplify.store("day", {
                                "d": value
                            })
                            emailcounthouruser();
                            linecharthouruser();
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



    }


    function emailcountusercompareallday() {

        $('#email_count').empty();
        $('#email_count').html('<canvas id="email-count-day-user-compare-all"  width="12" height="4"></canvas> <button id="refresh" onclick="refresh()">Restart</button>');

        var dropdown_sender = document.getElementById("user_sender").value;

        year = amplify.store("year")
        month = amplify.store("month")
        sender = amplify.store("sender")

        $.ajax({
            url: '/email_count_day_user',
            data: {
                'month': month.m,
                'year': year.y,
                'sender': sender.s
            },
            success: function(data) {
                output = JSON.parse(data)

                var userday_count = new Array()
                output.days.forEach(function(item) {
                    userday_count.push(item.daycount)
                })
                amplify.store("userday_count", {
                    "x": userday_count
                })
            }
        });


        year = amplify.store("year")
        month = amplify.store("month")

        if (month.m == 1) {
            var monthval = "January"
        } else if (month.m == 2) {
            var monthval = "Febuary"
        } else if (month.m == 3) {
            var monthval = "March"
        } else if (month.m == 4) {
            var monthval = "April"
        } else if (month.m == 5) {
            var monthval = "May"
        } else if (month.m == 6) {
            var monthval = "June"
        } else if (month.m == 7) {
            var monthval = "July"
        } else if (month.m == 8) {
            var monthval = "August"
        } else if (month.m == 9) {
            var monthval = "September"
        } else if (month.m == 10) {
            var monthval = "October"
        } else if (month.m == 11) {
            var monthval = "November"
        } else if (month.m == 12) {
            var monthval = "December"
        }

        $.ajax({
            url: '/email_count_day',
            data: {
                'month': month.m,
                'year': year.y
            },
            success: function(data) {
                output = JSON.parse(data)

                var days = new Array()
                output.days.forEach(function(item) {
                    days.push(item._id)
                })

                var day_count = new Array()
                output.days.forEach(function(item) {
                    day_count.push(item.daycount)
                })

                userday_count = amplify.store("userday_count")
                sender = amplify.store("sender")

                var ctx = document.getElementById('email-count-day-user-compare-all').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: days,
                        datasets: [{
                                label: 'Count - All users',
                                data: day_count,
                                backgroundColor: "rgba(55, 160, 225, 0.7)",
                                hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
                                hoverBorderWidth: 2,
                                hoverBorderColor: 'lightgrey'
                            },
                            {
                                label: sender.s,
                                data: userday_count.x,
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
                            text: 'Emails Per Day - ' + year.y + "/" + monthval + " (" + sender.s + ")"
                        },
                        onClick: function(c, i) {
                            e = i[0];
                            var value = this.data.labels[e._index];
                            var y_value = this.data.datasets[0].data[e._index];

                            amplify.store("day", {
                                "d": value
                            })
                            emailcountusercomapreallhour();
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
                       },
                    },
               })

             }

            })

          }

