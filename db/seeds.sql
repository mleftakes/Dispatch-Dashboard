USE dispatch_dashboard;

INSERT INTO Drivers (name) VALUES
  ("Joe Blow"),
  ("Jane Doe")
;

INSERT INTO dispatches (driver,is_shipper, checkin, checkout) 
VALUES
 (1, true, NOW(), NOW()),
 (2, false, NOW(), NOW());
