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

// Pass <video> element which should be currently running
// Callback takes two parameters; first is filename, second is error
function takePicture(video, callback) {
  const canvas = $("<canvas>")[0];
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  const data = canvas.toDataURL('image/png');
  video.pause();

  $.ajax({
    method: 'POST',
    url: '/add-image',
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
});
