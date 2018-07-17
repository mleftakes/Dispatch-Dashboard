/* eslint-env browser, jquery */
/* global io */

function reloadTable() {
  $.ajax({
    url: '/api/dispatch',
    method: 'GET',
    success: (data) => {
      const tbody = $('#dashboard > tbody');

      tbody.empty();

      $.each(data, (_, eachDispatch) => {
        const id = eachDispatch.id;
        const dispatch = eachDispatch.driver;
        const dispatchDriverName = eachDispatch.Driver.name;
        console.log(dispatchDriverName);
        console.log(eachDispatch.Driver.name);
        console.log('dispatch is ', dispatch);
        console.log('typeof dispatch is ', typeof (dispatch));
        const checkin = eachDispatch.checkin;
        console.log(checkin);
        const checkout = eachDispatch.checkout;
        console.log(checkout);
        const td0 = $('<td>').text(id).attr('trucker-id', eachDispatch);
        const td1 = $('<td>').text(dispatchDriverName).attr('trucker-dis', eachDispatch);
        console.log(td1);
        const td2 = $('<td>').text(checkin).attr('trucker-chkin', eachDispatch);
        const td3 = $('<td>').text(checkout).attr('trucker-chkout', eachDispatch);
        const row = $('<tr>');
        // Time calculated==================
        const checkinConverted = moment(checkin);
        console.log(checkinConverted);
        const timeSinceCI = moment().diff(moment(checkinConverted, 'x'), 'minutes');// added 7/16/18 at 3:54 pm
        console.log('Checkin time stored in const checkin: ', checkin);
        const td4 = $('<td>').text(timeSinceCI).attr('trucker-timeSpent', eachDispatch); // added 7/16/18 at 3:54 pm
        console.log('Time timeSinceCI ', timeSinceCI);
        //= =================================
        row.append([td1, td0, td2, td3, td4]);
        tbody.append(row);
      });
    },
  });
}

const socket = io();
console.log('we getting here?');
socket.on('dispatchChanged', (id) => {
  reloadTable();
});

$(document).ready(() => {
  reloadTable();
});
