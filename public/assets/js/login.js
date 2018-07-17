/* eslint-env browser, jquery, es6 */
/* global startVideo, stopVideo, takePicture */

function setUpModal() {
  $('.modal-trigger').leanModal({
    ready: () => {
      $('#image_title').val('');

      startVideo($('#create-video')[0], true, (err) => {
        if (err) {
          console.error(err); // eslint-disable-line no-console
        }
      });
    },
    complete: () => {
      stopVideo($('#create-video')[0]);
    },
  });

  $('#image_title').on('change paste keyup', () => {
    if ($('#image_title').val().length === 0) {
      $('#create-finish').addClass('disabled');
    } else {
      $('#create-finish').removeClass('disabled');
    }
  });

  $('#create-finish').click(() => {
    takePicture($('#create-video')[0], 'add-user-image', (filename, err) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
        return;
      }

      $.ajax({
        method: 'POST',
        url: '/api/create-driver',
        data: {
          name: $('#image_title').val(),
          image: filename,
        },
        success: (id) => {
          checkIn(id);
        },
        error: (createErr) => {
          console.error(createErr); // eslint-disable-line no-console
        },
      });
    });
  });
}

$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/api/truckers',
    success: (data) => {
      const tbody = $('#truckers-tbody');

      $.each(data, (_, eachTrucker) => {
        const name = eachTrucker.name;

        const td = $('<td>').text(name).attr('trucker-id', eachTrucker.id);
        tbody.append($('<tr>').append(td));

        td.click(chooseTrucker);
      });

      setUpModal();
    },
    error: (err) => {
      console.log('something went wrong: ', err); // eslint-disable-line no-console
    },
  });
});

function chooseTrucker(event) {
  event.preventDefault();

  const id = $(this).attr('trucker-id');

  checkIn(id);
}

function checkIn(id) {
  window.location.replace(`/checkin/${id}`);
}
