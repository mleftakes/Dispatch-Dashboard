/* eslint-env browser, jquery */
/* global moment, io */

function reloadTable() {
  $.ajax({
    url: '/api/dispatch',
    method: 'GET',
    success: (data) => {
      const tbody = $('#dashboard > tbody');

      tbody.empty();

      $.each(data, (_, eachDispatch) => {
        const id = eachDispatch.id;
        const dispatchDriverName = eachDispatch.Driver.name;
        const driverImage = eachDispatch.Driver.image;
        const imageURL = `/user-image/${driverImage}`;

        const checkin = eachDispatch.checkin;
        const checkout = eachDispatch.checkout;
        const idTD = $('<td>').text(id);
        const nameTD = $('<td>').text(dispatchDriverName).addClass('nameTD');
        const chkinTD = $('<td>').text(checkin);
        const chkoutTD = $('<td>').text(checkout);
        const row = $('<tr>').attr('trucker-id', eachDispatch);

        nameTD.prepend($('<img>').attr('alt', dispatchDriverName).attr('src', imageURL).addClass('userImage'));

        // Time calculated==================
        const checkinConverted = moment(checkin);
        const timeSinceCI = moment().diff(moment(checkinConverted, 'x'), 'minutes');// added 7/16/18 at 3:54 pm
        const timeTD = $('<td>').text(timeSinceCI).attr('trucker-timeSpent', eachDispatch); // added 7/16/18 at 3:54 pm
        //= =================================
        row.append([nameTD, idTD, chkinTD, chkoutTD, timeTD]);

        const bol = eachDispatch.bol_image;
        if (bol) {
          const bolURL = `/bol/${bol}`;
          const buttonClasses = 'center-align waves-effect waves-light btn-small';
          const bolButton = $('<a>').attr('class', buttonClasses).attr('href', bolURL).text('View');
          bolButton.attr('target', '_blank');

          row.append($('<td>').append(bolButton));
        }

        tbody.append(row);
      });
    },
  });
}

const socket = io();

socket.on('dispatchChanged', () => {
  reloadTable();
});

$(document).ready(() => {
  reloadTable();
});
