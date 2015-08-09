// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);
    //limpiar
    $('#btnlimpiar').on('click', formReset);

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

    $('#userList table tbody').on('click', 'td a.linkupdateuser', ModificaUser);

    $('#userList table tbody').on('click', 'td a.linkupuser', UpdateUser);
    
    //$('#btnUpdateStudent (rel="' + this._id + '")').on('click',updateStudent);
    $('#usernuti table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    //$('#btnUpdateUser').on('click', UpdateUser);
});
//validacion
$(function(){
                //Para escribir solo letras
                

    $('#inputUserNombres').validCampoFranz("abcdefghijklmnñopqrstuvwxyzáéiou");
    $('#inputUserApellidos').validCampoFranz("abcdefghijklmnñopqrstuvwxyzáéiou");
    $('#inputUserCelular').validCampoFranz("0123456789");
    $('#inputUserPeso').validCampoFranz("0123456789");
    $('#inputUserAltura').validCampoFranz("0123456789");
    $('#inputUserGrasaCorporal').validCampoFranz("0123456789");
    $('#inputUserMasaCorporal').validCampoFranz("0123456789");
    $('#inputUserIMC').validCampoFranz("0123456789");

            });
//limipiar
function formReset()
{
  //$('#inputUserEmail').this.value='';
    $('#inputUserEmail').val("");
    $('#inputUserNombres').val("");
    $('#inputUserApellidos').val("");
    $('#inputUserCelular').val("");
    $('#inputUserDireccion').val("");
    $('#inputUserPeso').val("");
    $('#inputUserAltura').val("");
    $('#inputUserGrasaCorporal').val("");
    $('#inputUserMasaCorporal').val("");
    $('#inputUserIMC').val("");
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


    $.getJSON( '/users/userlist', function( data ) {
$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
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
        $('#userList table tbody').html(tableContent);
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
    $('#userDireccion').text(thisUserObject.direccion);
    $('#userPeso').text(thisUserObject.peso);
    $('#userAltura').text(thisUserObject.altura);
    $('#userGrasaCorporal').text(thisUserObject.grasa_coporal);
    $('#userMasaCorporal').text(thisUserObject.masa_coporal);
    $('#userIMC').text(thisUserObject.imc);

};

// Add User
function addUser(event) {

      event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'nombre': $('#addUser fieldset input#inputUserNombres').val(),
            'apellido': $('#addUser fieldset input#inputUserApellidos').val(),
            'celular': $('#addUser fieldset input#inputUserCelular').val(),
            'direccion': $('#addUser fieldset input#inputUserDireccion').val(),
            'peso': $('#addUser fieldset input#inputUserPeso').val(),
            'altura': $('#addUser fieldset input#inputUserAltura').val(),
            'grasa_coporal': $('#addUser fieldset input#inputUserGrasaCorporal').val(),
            'masa_coporal': $('#addUser fieldset input#inputUserMasaCorporal').val(),
            'imc': $('#addUser fieldset input#inputUserIMC').val(),


        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');
                alert('Cliente Guardado');
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
            url: '/users/deleteuser/' + $(this).attr('rel')
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
    $('#inputUserDireccion').val(thisUserObject.direccion);
    $('#inputUserPeso').val(thisUserObject.peso);
    $('#inputUserAltura').val(thisUserObject.altura);
    $('#inputUserGrasaCorporal').val(thisUserObject.grasa_coporal);
    $('#inputUserMasaCorporal').val(thisUserObject.masa_coporal);
    $('#inputUserIMC').val(thisUserObject.imc);

};

//ModificaUser.prototype.UpdateUser = function  (){
function UpdateUser(event) {
      event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var updateUser = {
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'nombre': $('#addUser fieldset input#inputUserNombres').val(),
            'apellido': $('#addUser fieldset input#inputUserApellidos').val(),
            'celular': $('#addUser fieldset input#inputUserCelular').val(),
            'direccion': $('#addUser fieldset input#inputUserDireccion').val(),
            'peso': $('#addUser fieldset input#inputUserPeso').val(),
            'altura': $('#addUser fieldset input#inputUserAltura').val(),
            'grasa_coporal': $('#addUser fieldset input#inputUserGrasaCorporal').val(),
            'masa_coporal': $('#addUser fieldset input#inputUserMasaCorporal').val(),
            'imc': $('#addUser fieldset input#inputUserIMC').val(),


        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: updateUser,
            url: '/users/updateuser/'+$(this).attr('rel'),

           // url: '/users/updateuser/' + $(this._id),
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');
                alert('Cliente Actulizado');
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
