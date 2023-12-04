// Name: Rami Hammoud rami_hammoud@student.uml.edu
// Date: 11/28/2023
// File: script.js
// GUI Assignment: HW4 Adding JQuery for validation

// Description: Functionality behind web page. Reads in user inputs, handles
//invalid inputs gracefully with jQUERY, and generates table.
// Uses Jquery to validate the inputs from conditions.

$(document).ready(function() {

    $.validator.addMethod('checkStartHorizontal', function(value, element, params) {  // condition for min>max
        var startHorizontal = parseInt($('#startHorizontal').val());
        var endHorizontal = parseInt($('#endHorizontal').val());
        return startHorizontal <= endHorizontal;
    }, 'Minimum Column value cannot be greater than Maximum Column value.');

    $.validator.addMethod('checkStartVertical', function(value, element, params) { // condition for min>max
        var startVertical = parseInt($('#startVertical').val());
        var endVertical = parseInt($('#endVertical').val());
        return startVertical <= endVertical;
    }, 'Minimum Row value cannot be greater than Maximum Row value.');

    $('#inputForm').validate({ // jquery validator
        rules: {
            startHorizontal: {  // conditions >>
                required: true,
                number: true,
                range: [-50, 50],
                checkStartHorizontal: true
            },
            endHorizontal: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            startVertical: {
                required: true,
                number: true,
                range: [-50, 50],
                checkStartVertical: true
            },
            endVertical: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {  //messages to appear if condition triggered
            startHorizontal: {
                required: 'Please enter a value for Minimum Column.',
                number: 'Please enter a valid number for Minimum Column.',
                range: 'Please enter a value between -50 and 50 for Minimum Column.',
                checkStartHorizontal: 'Minimum Column value cannot be greater than Maximum Column value.'
            },
            endHorizontal: {
                required: 'Please enter a value for Maximum Column.',
                number: 'Please enter a valid number for Maximum Column.',
                range: 'Please enter a value between -50 and 50 for Maximum Column.'
            },
            startVertical: {
                required: 'Please enter a value for Minimum Row.',
                number: 'Please enter a valid number for Minimum Row.',
                range: 'Please enter a value between -50 and 50 for Minimum Row.',
                checkStartVertical: 'Minimum Row value cannot be greater than Maximum Row value.'
            },
            endVertical: {
                required: 'Please enter a value for Maximum Row.',
                number: 'Please enter a valid number for Maximum Row.',
                range: 'Please enter a value between -50 and 50 for Maximum Row.'
            }
        },
        
        submitHandler: function(form) {
            if ($('#inputForm').valid()) {
                generateTable();
            }
            return false; // Prevent form submission
        }
    });
});


function generateTable() {
    // Get input values from UI
    const startHorizontal = parseInt(document.getElementById('startHorizontal').value);
    const endHorizontal = parseInt(document.getElementById('endHorizontal').value);
    const startVertical = parseInt(document.getElementById('startVertical').value);
    const endVertical = parseInt(document.getElementById('endVertical').value);

    // Clear existing error message
    // clearErrorMessage();

    // Input validation for range
    if (isNaN(startHorizontal) || isNaN(endHorizontal) || isNaN(startVertical) || isNaN(endVertical)) {
        // displayErrorMessage('Please enter valid numbers for all fields.');
        return;
    }

    if (startHorizontal < -50 || endHorizontal > 50 || startVertical < -50 || endVertical > 50) {
        // displayErrorMessage('Please enter values within the range of -50 to 50.');
        return;
    }

    if (startHorizontal >= endHorizontal || startVertical >= endVertical) {
        // displayErrorMessage('Start values cannot be greater than end values.');
        return;
    }

    // Clear existing table
    document.getElementById('tableContainer').innerHTML = '';

    // generate the table
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped');

    // Create table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th></th>';
    for (let i = startHorizontal; i <= endHorizontal; i++) {
        headerRow.innerHTML += `<th>${i}</th>`;
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows
    for (let i = startVertical; i <= endVertical; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<th>${i}</th>`;
        for (let j = startHorizontal; j <= endHorizontal; j++) {
            row.innerHTML += `<td>${i * j}</td>`;
        }
        table.appendChild(row);
    }

    // Append table to the container in HTML
    document.getElementById('tableContainer').appendChild(table);
}

// function displayErrorMessage(message) {
//     const errorMessageElement = document.getElementById('errorMessage');
//     if (errorMessageElement) {
//         errorMessageElement.innerHTML = message;
//         errorMessageElement.style.display = 'block';
//     } else {
//         const errorMessageDiv = document.createElement('div');
//         errorMessageDiv.id = 'errorMessage';
//         errorMessageDiv.className = 'alert alert-danger';
//         errorMessageDiv.textContent = message;
//         document.getElementById('tableContainer').insertBefore(errorMessageDiv, document.getElementById('tableContainer').firstChild);
//     }
// }

// function clearErrorMessage() {
//     const errorMessageElement = document.getElementById('errorMessage');
//     if (errorMessageElement) {
//         errorMessageElement.style.display = 'none';
//     }
// }
