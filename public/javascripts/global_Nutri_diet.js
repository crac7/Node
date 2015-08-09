var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

   

    NutriTable();


    $('#usernuti table tbody').on('click', 'td a.linkshowuser', showUserInfo);

});
///user nutri
// Fill table with data
function NutriTable() {

    // Empty content string
    var tableContent = '';


    $.getJSON( '/users/userlist', function( data ) {
$('#usernuti table tbody').on('click', 'td a.linkshowuser', showUserInfo);
        // Stick our user data array into a userlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser"  rel="' + this.email + '" title="Show Details">' + this.email + '</a></td>';
            tableContent += '<td>' + this.nombre + '</td>';
          tableContent += '<td>' + this.apellido + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#usernuti table tbody').html(tableContent);
    });
};