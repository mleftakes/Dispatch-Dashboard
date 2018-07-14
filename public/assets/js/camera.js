/* eslint-env browser, es6, jquery, navigator */
/* global navigator */

// Pass <video> element to start video
// Callback has one parameter "err" which is null if successful
function startVideo(video, callback) {
  navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 9999, height: 9999, facingMode: 'environment' } })
    .then((stream) => {
      video.srcObject = stream;

      $(video).attr('autoplay', true);
      $(video).attr('muted', true);
      $(video).attr('playsinline', true);

      video.play();

      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
}

// Pass <video> element which should be currently running,
// as well as the name of the POST route we should send to.
// (add-bol or add-user-image)
// Callback takes two parameters; first is filename, second is error
function takePicture(video, routeName, callback) {
  const canvas = $("<canvas>")[0];
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  const data = canvas.toDataURL('image/png');
  video.pause();

  $.ajax({
    method: 'POST',
    url: `/${routeName}`,
    data: { uri: data },
    success: (response) => {
      if (response.error) {
        callback(null, response.error);
        return;
      }

      if (response.fileName) {
        callback(response.fileName);
      } else {
        callback(null, Error('Unknown error'));
      }
    },
    error: (error) => {
      callback(null, error);
    }
  });
}
