  $.ajax({
            url: '/top_senders',
            success: function(data) {
                output = JSON.parse(data)

                var sender = new Array()
                output.sender.forEach(function(item){
                                                      sender.push(item._id)
                                                   })
                var sender_count = new Array()
                output.sender.forEach(function(item){
                                                      sender_count.push(item.sendercount)
                                                   })


  var ctx = document.getElementById('top-senders').getContext('2d');
                            var doughnut = new Chart(ctx, {

                         // The type of chart we want to create
                                    type: 'doughnut',

                         // The data for our dataset
                                 data: {
                                    labels : sender,

                                datasets: [{
                                labels: "sender",
                                    backgroundColor: ["#FF8C00",
                                                      "#FFFF00",
                                                      "#5F9EA0",
                                                      "#FF0000",
                                                      "#3CB371",
                                                      "#87CEFA",
                                                      "#0000FF",
                                                      "#FF1493",
                                                      "#483D8B",
                                                      "#D8BFD8"],

                                    data : sender_count
                            }]
                        },

                        options:{
                                responsive: true,

                                legend: {
                                            display:true,
                                            position: 'right',
                                            labels:{
                                                    fontSize : 9,
                                                    boxWidth : 9,

                                            }
                                         },

                                 title: {
                                            display: false,
                                            text: 'Most Frequent Senders',
                                            fontSize: 20,

                                        },



                                    onClick: function(evt) {
                                         var activePoints = doughnut.getElementsAtEvent(evt);
                                          var clicker = activePoints[0]._model.label;
                                           alert(clicker)
                                           },


                                }

                    });

                }

            });