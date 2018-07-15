/* eslint-env browser, jquery */

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
      // reload page to display devoured burger in proper column
      location.reload();
    });
  });
});
