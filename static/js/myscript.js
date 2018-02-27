    function message_search() {
        var formdata = document.getElementsByName("message_id")[0].value;

        $.ajax({
            url: '/message_search',
            data: {
                'test': formdata
            },
            success: function(data) {

                var x = document.getElementById("message_id_div");
                x.style.display = "none";

                var y = document.getElementById("search_div");
                y.style.display = "block";

                var test = JSON.parse(data);
                document.getElementById("message_body").innerHTML = test;
            }
        });


    }

    function search() {
        var x = document.getElementById("message_id_div");
        x.style.display = "block";

        var y = document.getElementById("search_div");
        y.style.display = "none";
    }

    function w3_open() {
        document.getElementById("main").style.marginLeft = "15%";
        document.getElementById("mySidebar").style.width = "15%";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("openNav").style.display = 'none';
    }


    function w3_close() {
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("openNav").style.display = "inline-block";
    }

    $(function() {
      async: true,
      $( '#refresh').on( 'click', function() {
            $( '#email_count' ).load( '#email_count' );
      })})



    $.ajax({
                url: '/users',
                success: function(data) {
                    output = JSON.parse(data)

                    var senders = new Array()
                    output.sender.forEach(function(item) {
                        senders.push(item._id)
                    }),
                    console.log(senders)

                    select = document.getElementById( 'user_sender' );
                    for( item in senders ) {
                    select.add( new Option( senders[item] ) );

                                            };
                                           }
             })




    $.ajax({
                url: '/users',
                success: function(data) {
                    output = JSON.parse(data)

                    var rec = new Array()
                    output.reciever.forEach(function(item) {
                        rec.push(item._id)
                    }),
                    console.log(rec)

                    select = document.getElementById( 'user_reciever' );
                    for( item in rec ) {
                    select.add( new Option( rec[item] ) );

                                            };
                                           }
             })
