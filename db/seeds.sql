USE dispatch_dashboard;

INSERT INTO Drivers (name) VALUES
  ("Joe Blow"),
  ("Jane Doe")
;

INSERT INTO Dispatches (driver, checkin, checkout, bol_image) VALUES
  (1, NOW(), NULL, NULL),
  (2, NOW(), NOW(), "2_bol.png")
;
