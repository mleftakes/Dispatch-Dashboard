// Dispatch models

// The Dispatch has a name attribute of type DataTypes.String
// Checkin and Checkout are type date

module.exports = function(sequelize, DataTypes) {
  var Dispatch = sequelize.define("Dispatch", {
    driver: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    checkin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkout:{
      type: DataTypes.DATE,
      allowNull: true
    },
    is_shipper: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    bol_image:{
      type: DataTypes.STRING,
    }
  });
  return Dispatch;
};
