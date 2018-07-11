// Dispatch models

// The Dispatch has a name attribute of type DataTypes.String
// Checkin and Checkout are type date

module.exports = function(sequelize, DataTypes) {
  var Dispatch = sequelize.define("Dispatch", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Checkin: {
      type: Date,
      allowNull: false
    },
    Checkout:{
      type: Date,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
    }
  });
  return Dispatch;
};
