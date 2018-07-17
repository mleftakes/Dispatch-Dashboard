/* eslint-env browser, jquery */
/* global moment, startVideo, stopVideo, takePicture */

let dispatchID;

function formatMoment(m) {
  return m.format('D. MMMM H:mm:ss');
}

function update() {
  $('.clock').html(formatMoment(moment()));
}

function setClockToFixed(clock, prefix, fixed) {
  clock.removeClass('clock');
  clock.text(`${prefix}${formatMoment(moment(fixed))}`);
}

setInterval(update, 1000);

$(document).ready(() => {
  const path = window.location.pathname;
  const prefix = '/checkin/';

  const driverID = path.slice(prefix.length);

  $('#checkout-div').hide();
  $('#picture-div').hide();
  $('#completed-bol-div').hide();

  // Populate driver name
  $.ajax({
    method: 'GET',
    url: `/api/get-driver/${driverID}`,
    success: (driver) => {
      if (driver && driver.name) {
        $('#driver-name').text(driver.name);
      }
    },
  });

  $('#checkIn').click((event) => {
    event.preventDefault();

    if (!path.startsWith(prefix)) {
      console.log('Invalid path'); // eslint-disable-line no-console
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/api/checkin',
      data: {
        driver_id: driverID,
        is_shipper: true,
      },
    }).then((id) => {
      dispatchID = id;

      $.ajax({
        method: 'GET',
        url: `/api/get-dispatch/${dispatchID}`,
        success: (dispatch) => {
          setClockToFixed($('#checkin-clock'), 'Check In: ', dispatch.checkin);
        },
      });

      $('#checkIn').hide();
      $('#checkout-div').show();
    }).catch((err) => {
      console.log('something went wrong: ', err); // eslint-disable-line no-console
    });
  });

  $('#checkOut').click((event) => {
    event.preventDefault();

    $.ajax({
      method: 'PUT',
      url: '/api/checkout',
      data: {
        dispatch_id: dispatchID,
      },
    }).then((dispatch) => {
      setClockToFixed($('#checkout-clock'), 'Check Out: ', dispatch.checkout);
    });

    $('#checkOut').hide();
    $('#picture-div').show();
  });

  $('.modal-trigger').leanModal({
    ready: () => {
      startVideo($('#camera')[0], false, (err) => {
        if (err) {
          console.error(err); // eslint-disable-line no-console
        }
      });
    },
    complete: () => {
      stopVideo($('#camera')[0]);
    },
  });

  $('#takePictureBtn').on('click', (event) => {
    event.preventDefault();

    takePicture($('#camera')[0], 'add-bol', (filename, err) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
        return;
      }

      $.ajax({
        method: 'PUT',
        url: '/api/set-bol',
        data: {
          dispatch_id: dispatchID,
          filename,
        },
        success: () => {
          $('#takePicture').hide();
          $('#picture-div').hide();
          $('#completed-bol-div').show();
          $('#completed-bol').attr('src', `/bol/${filename}`);
        },
      });
    });
  });
});
