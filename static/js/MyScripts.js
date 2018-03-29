
    function refresh(){
     linechartuserall()
     emailcountall()

    }


    $.ajax({
                url: '/users',
                success: function(data) {
                    output = JSON.parse(data)

                    var senders = new Array()
                    output.sender.forEach(function(item) {
                        senders.push(item._id)
                    }),

                    select = document.getElementById( 'user_sender' );
                    for( item in senders ) {
                    select.add( new Option( senders[item] ) );

                                            };
                                           }
             })


    function usercharts(){

     var dropdown_sender = document.getElementById("user_sender").value;

     if (dropdown_sender == 'All'){
          linechartuserall()
          emailcountall()

    }else{
    linechartuser()
    emailcountuser()
    }

        }


    function compare(){

    linechartusercompareall()
    emailcountusercompareall()

    }


    function emailpopup(){

        var modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal
        modal.style.display = "block";


        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
            $('#vadarscore').empty();
            $('#textblobscore').empty();
            $('#sentimeanscore').empty();
            $('#sentimedscore').empty();
            $('#mailBody').empty();
            $('#mailSubject').empty();
            $('#mailTo').empty();
            $('#mailFrom').empty();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                $('#vadarscore').empty();
                $('#textblobscore').empty();
                $('#sentimeanscore').empty();
                $('#sentimedscore').empty();
                $('#mailBody').empty();
                $('#mailSubject').empty();
                $('#mailTo').empty();
                $('#mailFrom').empty();

            }
        }

         var messageid = amplify.store("messageid");

         $.ajax({
            url: '/message_search',
            data: {
                'test': messageid.m
            },
            success: function(data) {
                output = JSON.parse(data)


                 var vadarscore = amplify.store("vadarscore");
                 var textblobscore = amplify.store("textblobscore");
                 var sentimeanscore = amplify.store("sentimeanscore");
                 var sentimedscore = amplify.store("sentimedscore");


                document.getElementById("mailBody").innerHTML = output.email['body'];
                document.getElementById('mailSubject').innerHTML = output.email.headers.Subject
                document.getElementById('mailFrom').innerHTML = output.email.headers.From
                document.getElementById('mailTo').innerHTML = output.email.headers.To

                if (vadarscore.s < 0){
                    document.getElementById('vadarscore').innerHTML = vadarscore.s + " NEGATIVE"
                }else if ( vadarscore.s > 0){
                    document.getElementById('vadarscore').innerHTML = vadarscore.s + " POSITIVE"
                }else if (vadarscore.s == 0){
                    document.getElementById('vadarscore').innerHTML = vadarscore.s + " NEUTRAL"
                }

                if (textblobscore.s < 0){
                    document.getElementById('textblobscore').innerHTML = textblobscore.s + " NEGATIVE"
                }else if (textblobscore.s > 0){
                    document.getElementById('textblobscore').innerHTML = textblobscore.s + " POSITIVE"
                }else if (textblobscore.s == 0){
                    document.getElementById('textblobscore').innerHTML = textblobscore.s + " NEUTRAL"
                }

                if (sentimeanscore.s < 0){
                    document.getElementById('sentimeanscore').innerHTML = sentimeanscore.s + " NEGATIVE"
                }else if (sentimeanscore.s > 0){
                    document.getElementById('sentimeanscore').innerHTML = sentimeanscore.s + " POSITIVE"
                }else if (sentimeanscore.s == 0){
                    document.getElementById('sentimeanscore').innerHTML = sentimeanscore.s + " NEUTRAL"
                }

                if (sentimedscore.s < 0){
                    document.getElementById('sentimedscore').innerHTML = sentimedscore.s + " NEGATIVE"
                }else if (sentimedscore.s > 0){
                   document.getElementById('sentimedscore').innerHTML = sentimedscore.s + " POSITIVE"
                }else if (sentimedscore.s == 0){
                    document.getElementById('sentimedscore').innerHTML = sentimedscore.s + " NEUTRAL"
                 }

                 var t = document.getElementById("myTable");
                  t.style.display = "block";

                // Find a <table> element with id="myTable":
                var table = document.getElementById("myTable");

                // Create an empty <tr> element and add it to the 1st position of the table:
                var row = table.insertRow(1);

                // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);


                // Add some text to the new cells:
                cell1.innerHTML = messageid.m;
                cell2.innerHTML = output.email.headers.To;
                cell3.innerHTML = output.email.headers.From;

                date = output.email.headers.DateStamp['$date'];
                cell4.innerHTML = new Date(date);
                cell5.innerHTML = "<button onclick='deleteRow(this)'>Del</button>"
                     }
        });


     }


    function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(i);
}


    function downloadCSV(csv, filename) {

        var csvFile;
        var downloadLink;

        // CSV file
        csvFile = new Blob([csv], {type: "text/csv"});

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }


    function exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");

        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        // Download CSV file
        downloadCSV(csv.join("\n"), filename);
    }


    function message_id_search(){

       var b = document.getElementById("keyword_search");
                   b.style.display = "none";

        var formdata = document.getElementsByName("messageid_search")[0].value;

        $.ajax({
            url: '/messageid_search',
            data: {
                'test': formdata
            },
            success: function(data) {
                output = JSON.parse(data);


               document.getElementById('To').innerHTML = output.email.headers.To
               document.getElementById('From').innerHTML = output.email.headers.From
               document.getElementById('Subject').innerHTML = output.email.headers.Subject
               date = output.email.headers.DateStamp['$date'];
               document.getElementById('Date').innerHTML = new Date(date)
               document.getElementById('Vadar').innerHTML = output.email['sentiment Score']
               document.getElementById('Vadar').innerHTML = output.email['body']
               document.getElementById('Textblob').innerHTML = output.textblob['sentiment Score']
               document.getElementById('Sentimean').innerHTML = output.sentimean['sentiment Score']
               document.getElementById('Sentimed').innerHTML = output.sentimed['sentiment Score']


               var a = document.getElementById("messages_id");
                   a.style.display = "block";
            }
        });


    }


    function keyword_searches(){


        var a = document.getElementById("messagesid");
        a.style.display = "none";

        var formdata = document.getElementsByName("keyword_search")[0].value;

        $.ajax({
            url: '/keyword_search',
            data: {
                'test': formdata
            },
            success: function(data) {
                output = JSON.parse(data);

                var MessageID = new Array()
                output.email.forEach(function(item) {
                    MessageID.push(item._id["$oid"])
                })

                var To = new Array()
                output.email.forEach(function(item) {
                    To.push(item.headers['To'])
                })

                var From = new Array()
                output.email.forEach(function(item) {
                    From.push(item.headers['From'])
                })

                var Subject = new Array()
                output.email.forEach(function(item) {
                    Subject.push(item.headers['Subject'])
                })

                var Date = new Array()
                output.email.forEach(function(item) {
                    Date.push(item.headers['Date'])
                })

                var Body = new Array()
                output.email.forEach(function(item) {
                    Body.push(item.body)
                })

                 var b = document.getElementById("keyword_search");
                    b.style.display = "block";

                var i = 0

                while (i <= 15) {

                    var table = document.getElementById("keyword");
                    var row = table.insertRow(1);


                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);


                    cell1.innerHTML = MessageID[i];
                    cell2.innerHTML = Date[i];
                    cell3.innerHTML = To[i];
                    cell4.innerHTML = From[i];
                    cell5.innerHTML = Subject[i];
                    cell6.innerHTML = Body[i]
                    cell6.innerHTML = From[i];

                }
        }

        })
    }


    function analyseDataset(){

        var x = document.getElementById("email_count");
        var y = document.getElementById("emails_of_interest");
        var z = document.getElementById("sentiment_compare");
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";

        var a = document.getElementById("view_dataset");
        a.style.display = "none";
    }


    function viewDataset(){

        var x = document.getElementById("email_count");
        var y = document.getElementById("emails_of_interest");
        var z = document.getElementById("sentiment_compare");

        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";

        var a = document.getElementById("view_dataset");
        a.style.display = "block";


    }





