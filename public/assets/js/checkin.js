/* eslint-env browser, jquery */
/* global startVideo, stopVideo, takePicture */

$(document).ready(() => {
  $('#checkIn').click((event) => {
    event.preventDefault();

    const path = window.location.pathname;
    const prefix = '/checkin/';

    if (!path.startsWith(prefix)) {
      console.log('Invalid path'); // eslint-disable-line no-console
      return;
    }

    const id = path.slice(prefix.length);

    $.ajax({
      method: 'POST',
      url: '/api/checkin',
      data: {
        driver_id: id,
        is_shipper: true,
      },
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log('something went wrong: ', err); // eslint-disable-line no-console
    });
  });

  $('#checkOut').on('submit', (event) => {
    event.preventDefault();

    $.ajax({
      method: 'PUT',
      url: '/api/checkout',
      data: {
        driver_id: (window.location.href).split('/')[3],
      },
    }).then((data) => {
      window.location.reload();
    });
  });

  $('.modal-trigger').leanModal({
    dismissable: true,
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

      console.log(filename);
    });
  });
});
