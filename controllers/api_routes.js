const db = require('../models');
const socketIO = require('socket.io');

let io;

function notifyDispatchChanged(id) {
  io.emit('dispatchChanged', id);
}

module.exports = (app, http) => {
  io = socketIO(http);

  // get route, edited to match sequelize
  app.get('/api/dispatch', (req, res) => {
    // replace old function with sequelize function
    db.Dispatch.findAll({
      order: [
        ['checkin', 'DESC'],
      ],
      include: [
        db.Driver,
      ],
    }).then((dispatches) => {
      res.json(dispatches);
    });
  });

  app.get('/api/get-dispatch/:id', (req, res) => {
    db.Dispatch.findById(req.params.id).then(dispatch => res.json(dispatch));
  });

  app.get('/api/truckers', (req, res) => {
    // replace old function with sequelize function
    db.Driver.findAll({
      attributes: ['id', 'name', 'image'],
      order: [
        ['name', 'ASC'],
      ],
    }).then((truckers) => {
      res.json(truckers);
    });
  });

  app.post('/api/checkin', (req, res) => {
    db.Dispatch.create({
      driver: req.body.driver_id,
      is_shipper: req.body.is_shipper,
      checkin: db.sequelize.fn('NOW'),
    }).then((data) => {
      res.json(data.id);
      notifyDispatchChanged(data.id);
    });
  });

  app.put('/api/checkout', (req, res) => {
    const id = req.body.dispatch_id;

    db.Dispatch.update({
      checkout: db.sequelize.fn('NOW'),
    }, {
      where: {
        id,
      },
    }).then(() => {
      db.Dispatch.findById(id).then((dispatch) => {
        res.json(dispatch);
        notifyDispatchChanged(id);
      });
    });
  });

  app.put('/api/set-bol', (req, res) => {
    const id = req.body.dispatch_id;
    const filename = req.body.filename;

    db.Dispatch.update({
      bol_image: filename,
    }, {
      where: {
        id,
      },
    }).then(() => {
      res.json('Updated');
      notifyDispatchChanged(id);
    });
  });

  app.get('/api/get-driver/:id', (req, res) => {
    db.Driver.findById(req.params.id).then(driver => res.json(driver));
  });

  app.post('/api/create-driver', (req, res) => {
    db.Driver.create({
      driver: req.body.name,
      image: req.body.image,
    }).then((data) => {
      // redirect
      res.json(data.id);
    });
  });
};
