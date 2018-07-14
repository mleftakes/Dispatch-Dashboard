$(document).ready(function() {
  $("#checkIn").click(function(event) {
    event.preventDefault();
    
    var path = window.location.pathname;
    var prefix = "/checkin/";

    if (!path.startsWith(prefix)) {
      console.log("Invalid path");
      return;
    }

    var id = path.slice(prefix.length);
    
    $.ajax({
      method: "POST",
      url: "/api/checkin",
      data: {
        driver_id: id,
        is_shipper: true
      }
    }).then(function(data) {
      console.log(data);
    }).catch(function(err) {
      console.log('something went wrong: ', err);
    });

  });

  
$("#checkOut").on("submit", function(event) {
    event.preventDefault();

    $.ajax({
      method: "PUT",
      url: "/api/checkout",
      data: {
        driver_id: (window.location.href).split("/")[3],
      }
    }).then(function(data) {
      // reload page to display devoured burger in proper column
      location.reload();
    });

  });


});



