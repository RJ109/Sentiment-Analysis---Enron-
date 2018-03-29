    function emailcounthour() {

        $('#email_count').empty();
        $('#email_count').html('<canvas id="email-count-hour" width="12" height="4"></canvas> <div id ="refresh_button"><button id="refresh" onclick="refresh()">Restart</button></div>');

        year = amplify.store("year")
        month = amplify.store("month")
        day = amplify.store("day")

        $.ajax({
            url: '/email_count_hour',
            data: {
                'day': day.d,
                'month': month.m,
                'year': year.y
            },
            success: function(data) {
                output = JSON.parse(data)

                var hours = new Array()
                output.hours.forEach(function(item) {
                    hours.push(item._id)
                })

                var hour_count = new Array()
                output.hours.forEach(function(item) {
                    hour_count.push(item.hourcount)
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


                var ctx = document.getElementById('email-count-hour').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: hours,

                        datasets: [{
                            label: "Count",
                            backgroundColor: yearcol,
                            borderColor: 'rgb(255, 99, 132)',

                            data: hour_count
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
                            text: 'Emails Per Hour - '+ day.d + "/" + month.m + "/" + year.y
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



    function emailcounthouruser(){

        document.getElementById('email-count-day-user').id = 'email-count-hour-user'
        year = amplify.store("year")
        month = amplify.store("month")
        day = amplify.store("day")
        sender = amplify.store("sender")

        $.ajax({
            url: '/email_count_hour_user',
            data: {
                'day' : day.d,
                'month': month.m,
                'year': year.y,
                'sender': sender.s
            },
            success: function(data) {
                output = JSON.parse(data)

                var hours = new Array()
                output.hours.forEach(function(item) {
                    hours.push(item._id)
                })

                var hour_count = new Array()
                output.hours.forEach(function(item) {
                    hour_count.push(item.hourcount)
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


                var ctx = document.getElementById('email-count-hour-user').getContext('2d');

                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: hours,

                        datasets: [{
                            label: "Count",
                            backgroundColor: yearcol,
                            borderColor: 'rgb(255, 99, 132)',

                            data: hour_count
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
                            text: 'Emails Per Hour - '+ day.d + "/" + month.m + "/" + year.y + '(' + sender.s + ")"
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



    function emailcountusercomapreallhour(){

        $('#email_count').empty();
        $('#email_count').html('<canvas id="email-count-hour-user-compare-all"  width="12" height="4"></canvas> <button id="refresh" onclick="refresh()">Restart</button>');

        var dropdown_sender = document.getElementById("user_sender").value;

        year = amplify.store("year")
        month = amplify.store("month")
        day = amplify.store("day")
        sender = amplify.store("sender")

        $.ajax({
            url: '/email_count_hour_user',
            data: {
                'day' : day.d,
                'month': month.m,
                'year': year.y,
                'sender': sender.s
            },
            success: function(data) {
                output = JSON.parse(data)

                var userhour_count = new Array()
                output.hours.forEach(function(item) {
                    userhour_count.push(item.hourcount)
                })
                amplify.store("userhour_count", {
                    "x": userhour_count
                })
            }
        });


        year = amplify.store("year")
        month = amplify.store("month")
        day = amplify.store("day")

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
            url: '/email_count_hour',
            data: {
                'day': day.d,
                'month': month.m,
                'year': year.y
            },
            success: function(data) {
                output = JSON.parse(data)

                var hours = new Array()
                output.hours.forEach(function(item) {
                    hours.push(item._id)
                })

                var hour_count = new Array()
                output.hours.forEach(function(item) {
                    hour_count.push(item.hourcount)
                })

                userhour_count = amplify.store("userhour_count")
                sender = amplify.store("sender")

                var ctx = document.getElementById('email-count-hour-user-compare-all').getContext('2d');
                var barchart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: hours,
                        datasets: [{
                                label: 'Count- All users',
                                data: hour_count,
                                backgroundColor: "rgba(55, 160, 225, 0.7)",
                                hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
                                hoverBorderWidth: 2,
                                hoverBorderColor: 'lightgrey'
                            },
                            {
                                label: sender.s,
                                data: userhour_count.x,
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
                            text: 'Emails Per Hour - ' + year.y + "/" + monthval + "/" + day.d + " (" + sender.s + ")"
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