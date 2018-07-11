$(document).ready(function() {

  $(".driver-form").on("submit", function(event) {
    event.preventDefault();

    var driverInfo = {
      driver: $(this).children(".driver").val(),
      checkIn: $(this).children(".check-in").val(),
      checkOut: $(this).children(".check-out").val()
    };

    $.ajax({
      method: "PUT",
      url: "/driver/inputdata",
      data: driverInfo
    }).then(function(data) {
      // reload page to display devoured burger in proper column
      location.reload();
    });

  });
});
