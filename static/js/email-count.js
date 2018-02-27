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
                        label: "Years",
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
                        console.log(e._index)
                        var x_value = this.data.labels[e._index];
                        var y_value = this.data.datasets[0].data[e._index];

                        if (x_value > 1990) {

                            $.ajax({
                                url: '/email_count_month',
                                data: {
                                    'year': x_value
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

                                    barchart.data.labels = months;
                                    barchart.data.datasets[0].data = month_count;
                                    barchart.options.title.text = "Emails for " + x_value
                                    if (x_value == 1999) {
                                        barchart.data.datasets[0].backgroundColor = "#3e95cd";
                                    } else if (x_value == 2000) {
                                        barchart.data.datasets[0].backgroundColor = "#ffdb4d";
                                    } else if (x_value == 2001) {
                                        barchart.data.datasets[0].backgroundColor = "#33cc33";
                                    } else if (x_value == 2002) {
                                        barchart.data.datasets[0].backgroundColor = "#ff1a1a";
                                    }
                                    barchart.update();

                                }


                            });

                        } else {


                            $.ajax({
                                url: '/email_count_day',
                                data: {
                                    'month': x_value
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
                                    var year = output['year']


                                    barchart.data.labels = days;
                                    barchart.data.datasets[0].data = day_count;
                                    if (year == '1999') {
                                        barchart.data.datasets[0].backgroundColor = "#3e95cd";
                                    } else if (year == '2000') {
                                        barchart.data.datasets[0].backgroundColor = "#ffdb4d";
                                    } else if (year == '2001') {
                                        barchart.data.datasets[0].backgroundColor = "#33cc33";
                                    } else if (year == '2002') {
                                        barchart.data.datasets[0].backgroundColor = "#ff1a1a";
                                    }
                                    barchart.options.title.text = "Emails per Day: " + x_value + "/" + year
                                    barchart.update();

                                }

                            });

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
                }


            });

        }


    });