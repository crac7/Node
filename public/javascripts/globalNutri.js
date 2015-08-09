// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#NutriList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnNutriUser').on('click', addUser);
      //limpiar
    $('#btnlimpiar').on('click', formReset);

    // Delete User link click
    $('#NutriList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

    $('#NutriList table tbody').on('click', 'td a.linkupdateuser', ModificaUser);

    $('#NutriList table tbody').on('click', 'td a.linkupuser', UpdateUser);
    
    //$('#btnUpdateStudent (rel="' + this._id + '")').on('click',updateStudent);
    //$('#btnUpdateUser').on('click', UpdateUser);
});
//validacion
$(function(){
                //Para escribir solo letras
                

    $('#inputUserNombres').validCampoFranz("abcdefghijklmnñopqrstuvwxyzáéiou");
    $('#inputUserApellidos').validCampoFranz("abcdefghijklmnñopqrstuvwxyzáéiou");
    $('#inputUserCelular').validCampoFranz("0123456789");


            });
//limpiar
function formReset()
{
  //$('#inputUserEmail').this.value='';
    $('#inputUserEmail').val("");
    $('#inputUserNombres').val("");
    $('#inputUserApellidos').val("");
    $('#inputUserCelular').val("");
}
//buador
(function(document) {
  'use strict';

  var LightTableFilter = (function(Arr) {

    var _input;

    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
      Arr.forEach.call(tables, function(table) {
        Arr.forEach.call(table.tBodies, function(tbody) {
          Arr.forEach.call(tbody.rows, _filter);
        });
      });
    }

    function _filter(row) {
      var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
      row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
    }

    return {
      init: function() {
        var inputs = document.getElementsByClassName('light-table-filter');
        Arr.forEach.call(inputs, function(input) {
          input.oninput = _onInputEvent;
        });
      }
    };
  })(Array.prototype);

  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
      LightTableFilter.init();
    }
  });

})(document);
// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';


    $.getJSON( '/users/NutriList', function( data ) {
$('#NutriList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
        // Stick our user data array into a userlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser"  rel="' + this.email + '" title="Show Details">' + this.email + '</a></td>';
            tableContent += '<td>' + this.nombre + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">Eliminar</a></td>';
            tableContent += '<td><a href="#" class="linkupdateuser" rel="' + this.email + '" title="Update User">Selecionar</a></td>';
            tableContent += '<td><a href="#" class="linkupuser" rel="' + this._id + '">Modificar</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#NutriList table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.email; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.email);
    $('#userInfoAge').text(thisUserObject.nombre);
    $('#userInfoGender').text(thisUserObject.apellido);
    $('#userInfoLocation').text(thisUserObject.celular);

    /*$('#inputUserEmail').text(thisUserObject.email);
    $('#inputUserNombres').text(thisUserObject.nombre);
    $('#inputUserApellidos').text(thisUserObject.apellido);
    $('#inputUserCelular').text(thisUserObject.celular);*/

};

// Add User
function addUser(event) {

      event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addNutri input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'email': $('#addNutri fieldset input#inputUserEmail').val(),
            'nombre': $('#addNutri fieldset input#inputUserNombres').val(),
            'apellido': $('#addNutri fieldset input#inputUserApellidos').val(),
            'celular': $('#addNutri fieldset input#inputUserCelular').val()
        
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/addNutri',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addNutri fieldset input').val('');
                alert('Nutricionista Guardado');
                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteNutri/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
function ModificaUser(event) {
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.email; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];


    //Populate Info Box
    $('#inputUserEmail').val(thisUserObject.email);
    $('#inputUserNombres').val(thisUserObject.nombre);
    $('#inputUserApellidos').val(thisUserObject.apellido);
    $('#inputUserCelular').val(thisUserObject.celular);


};

//ModificaUser.prototype.UpdateUser = function  (){
function UpdateUser(event) {
      event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addNutri input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var updateUser = {
            'email': $('#addNutri  fieldset input#inputUserEmail').val(),
            'nombre': $('#addNutri fieldset input#inputUserNombres').val(),
            'apellido': $('#addNutri  fieldset input#inputUserApellidos').val(),
            'celular': $('#addNutri  fieldset input#inputUserCelular').val()
            


        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: updateUser,
            url: '/users/updateNutri/'+$(this).attr('rel'),

           // url: '/users/updateuser/' + $(this._id),
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addNutri fieldset input').val('');
                alert('Nutricionista Actulizado');
                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
