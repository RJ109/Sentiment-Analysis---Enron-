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

